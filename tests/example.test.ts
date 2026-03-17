import { describe, it, expect } from 'vitest';

import { convertColor, convertHue } from '~/convert';
import { parseColor } from '~/parse';
import { formatCss } from '~/format';

import {
  createMatrix,
  dropMatrix,
  createColor,
  dropColor,
  cloneColor,
  mutateColor,
  deriveColor,
  preallocatePool,
  clearPool,
} from '~/shared';

import { isEqual, getDistance } from '~/utils/compare';

import {
  checkContrast,
  matchContrast,
  checkContrastBulk,
  matchScales,
  getContrastRating,
} from '~/utils/contrast';

import { checkGamut, clampColor } from '~/utils/gamut';

import { createHarmony, createShades, createScales, mixColor } from '~/utils/palette';

import { createPicker, fromPicker, toPicker } from '~/utils/picker';

import { simulateDeficiency } from '~/utils/simulate';

describe('Low-Level Matrix', () => {
  describe('createMatrix', () => {
    it('allocates and sets matrix values', () => {
      const matrix = createMatrix('rgb');
      matrix.set([0.1, 0.2, 0.3]);
      expect(matrix[0]).toBeCloseTo(0.1);
      dropMatrix(matrix);
    });
  });

  describe('dropMatrix', () => {
    it('returns buffer to pool', () => {
      const myMatrix = createMatrix('rgb');
      myMatrix.set([0.9, 0.4, 0.2]);
      dropMatrix(myMatrix);
    });
  });

  describe('convertColor', () => {
    it('converts between Float32Array buffers', () => {
      const rgbArray = createMatrix('rgb');
      const oklabArray = createMatrix('oklab');
      rgbArray.set([0.7, 0.1, 0.9]);
      convertColor(rgbArray, oklabArray, 'rgb', 'oklab');
      expect(oklabArray[0]).toBeDefined();
      dropMatrix(rgbArray);
      dropMatrix(oklabArray);
    });
  });
});

describe('Pool Management', () => {
  describe('preallocatePool', () => {
    it('warms up buffer pool', () => {
      preallocatePool(100);
    });
  });

  describe('clearPool', () => {
    it('empties the buffer pool', () => {
      clearPool();
    });
  });
});

describe('Matrix Management', () => {
  describe('createColor', () => {
    it('creates managed color with alpha', () => {
      const red = createColor('rgb', [1, 0, 0], 0.5);
      expect(red).toBeDefined();
      dropColor(red);
    });
  });

  describe('dropColor', () => {
    it('returns color buffer to pool', () => {
      const myColor = createColor('hsl', [240, 0.8, 0.6]);
      dropColor(myColor);
    });
  });

  describe('cloneColor', () => {
    it('creates deep copy of color', () => {
      const original = createColor('rgb', [1, 0, 0]);
      const copy = cloneColor(original);
      expect(copy).toBeDefined();
      dropColor(original);
      dropColor(copy);
    });
  });

  describe('mutateColor', () => {
    it('converts color in-place', () => {
      const color = createColor('rgb', [0.5, 0.2, 0.8]);
      mutateColor(color, 'oklch');
      const css = formatCss(color);
      expect(css).toMatch(/oklch/);
      dropColor(color);
    });
  });

  describe('deriveColor', () => {
    it('creates new converted color', () => {
      const original = createColor('rgb', [0.5, 0.2, 0.8]);
      const oklchColor = deriveColor(original, 'oklch');
      expect(formatCss(original)).toMatch(/rgb/);
      expect(formatCss(oklchColor)).toMatch(/oklch/);
      dropColor(original);
      dropColor(oklchColor);
    });
  });
});

describe('CSS Integration', () => {
  describe('parseColor', () => {
    it('parses hex and modern color strings', () => {
      const color = parseColor('#ff00ff');
      const oklchColor = parseColor('oklch(70% 0.2 150)');
      expect(color).toBeDefined();
      expect(oklchColor).toBeDefined();
      dropColor(color);
      dropColor(oklchColor);
    });
  });

  describe('formatCss', () => {
    it('formats color to CSS string', () => {
      const color = parseColor('rgb(255 128 0 / 0.7)');
      expect(formatCss(color)).toBe('rgb(255 128 0 / 0.7)');
      expect(formatCss(color, true)).toMatch(/^#./);
      dropColor(color);
    });
  });
});

describe('Color Conversion', () => {
  describe('convertHue', () => {
    it('extracts polar representation', () => {
      const labArray = createMatrix('lab');
      const lchArray = createMatrix('lch');
      labArray.set([50, 20, 30]);
      convertHue(labArray, lchArray, 'lab');
      expect(lchArray[0]).toBeDefined();
      dropMatrix(labArray);
      dropMatrix(lchArray);
    });
  });
});

describe('Contrast & Accessibility', () => {
  describe('checkContrast', () => {
    it('calculates APCA Lc value', () => {
      const text = parseColor('#ffffff');
      const bg = parseColor('#222222');
      const score = checkContrast(text, bg);
      expect(Math.abs(score)).toBeGreaterThan(0);
      dropColor(text);
      dropColor(bg);
    });
  });

  describe('matchContrast', () => {
    it('adjusts color to meet target contrast', () => {
      const redText = parseColor('#ff0000');
      const blackBg = parseColor('#000000');
      const safeRed = matchContrast(redText, blackBg, 75);
      expect(formatCss(safeRed)).toBeDefined();
      dropColor(redText);
      dropColor(blackBg);
      dropColor(safeRed);
    });
  });
});

describe('Bulk Contrast', () => {
  describe('checkContrastBulk', () => {
    it('checks contrast for multiple colors', () => {
      const bg = parseColor('#333333');
      const colorsToCheck = [parseColor('#ffffff'), parseColor('#cccccc'), parseColor('#666666')];
      const results = checkContrastBulk(bg, colorsToCheck);
      expect(results.length).toBe(3);
      expect(results[0].rating).toBe('platinum');
      colorsToCheck.forEach(dropColor);
      dropColor(bg);
    });
  });
});

describe('Contrast Rating', () => {
  describe('getContrastRating', () => {
    it('returns readability tier from APCA Lc score', () => {
      expect(getContrastRating(75.2)).toBe('gold');
      expect(getContrastRating(90)).toBe('platinum');
      expect(getContrastRating(60)).toBe('silver');
      expect(getContrastRating(45)).toBe('bronze');
      expect(getContrastRating(30)).toBe('ui');
      expect(getContrastRating(10)).toBe('fail');
    });
  });
});

describe('Match Scales', () => {
  describe('matchScales', () => {
    it('generates contrast-adjusted scale', () => {
      const stops = [parseColor('#007bff'), parseColor('#ffc107')];
      const whiteBg = parseColor('#ffffff');
      const adjustedScale = matchScales(stops, whiteBg, 60, 5);
      expect(adjustedScale.length).toBe(5);
      adjustedScale.forEach(dropColor);
      dropColor(whiteBg);
      stops.forEach(dropColor);
    });
  });
});

describe('Generative Tools', () => {
  describe('createHarmony', () => {
    it('generates harmonious color variations', () => {
      const baseColor = parseColor('#007bff');
      const neighbors = createHarmony(baseColor, [
        { name: 'analogous', ratios: [-30, 30] },
        { name: 'complementary', ratios: [180] },
      ]);
      expect(neighbors.length).toBe(2);
      neighbors.forEach((harmony) => {
        harmony.colors.forEach(dropColor);
      });
      dropColor(baseColor);
    });
  });

  describe('createShades', () => {
    it('creates interpolation ramp between two colors', () => {
      const startColor = parseColor('rgb(255 0 0)');
      const endColor = parseColor('rgb(0 0 255)');
      const shades = createShades(startColor, endColor, 5);
      expect(shades.length).toBe(5);
      shades.forEach(dropColor);
      dropColor(startColor);
      dropColor(endColor);
    });
  });

  describe('createScales', () => {
    it('interpolates through multiple stops', () => {
      const stops = [parseColor('#ff0000'), parseColor('#00ff00'), parseColor('#0000ff')];
      const ramp = createScales(stops, 5);
      expect(ramp.length).toBe(5);
      ramp.forEach(dropColor);
      stops.forEach(dropColor);
    });
  });

  describe('mixColor', () => {
    it('blends two colors perceptually', () => {
      const red = parseColor('rgb(255 0 0)');
      const blue = parseColor('rgb(0 0 255)');
      const purple = mixColor(red, blue, 0.5);
      expect(formatCss(purple)).toBeDefined();
      dropColor(red);
      dropColor(blue);
      dropColor(purple);
    });
  });
});

describe('Safety & Comparison', () => {
  describe('isEqual', () => {
    it('compares colors perceptually', () => {
      const redRgb = parseColor('rgb(255 0 0)');
      const redHsl = parseColor('hsl(0 100% 50%)');
      expect(isEqual(redRgb, redHsl)).toBe(true);
      dropColor(redRgb);
      dropColor(redHsl);
    });
  });

  describe('getDistance', () => {
    it('calculates DeltaE distance', () => {
      const red = parseColor('#ff0000');
      const orange = parseColor('#ffa500');
      const distance = getDistance(red, orange);
      expect(distance).toBeGreaterThan(0);
      dropColor(red);
      dropColor(orange);
    });
  });

  describe('checkGamut', () => {
    it('checks if color is in gamut', () => {
      const wideColor = parseColor('oklch(90% 0.4 120)');
      const result = checkGamut(wideColor);
      expect(typeof result).toBe('boolean');
      dropColor(wideColor);
    });
  });

  describe('clampColor', () => {
    it('clamps color to gamut bounds', () => {
      const wideColor = parseColor('oklch(90% 0.4 120)');
      const clampedColor = clampColor(wideColor);
      expect(formatCss(clampedColor)).toBeDefined();
      dropColor(wideColor);
      dropColor(clampedColor);

      const mutableColor = parseColor('oklch(90% 0.4 120)');
      clampColor(mutableColor, true);
      expect(formatCss(mutableColor)).toBeDefined();
      dropColor(mutableColor);
    });
  });
});

describe('Interactive Pickers', () => {
  describe('createPicker', () => {
    it('initializes picker state manager', () => {
      const picker = createPicker(parseColor('#32cd32'));
      picker.update(0.5, 0.8, 'sv');
      picker.update(0.75, 0, 'h');
      picker.dispose();
    });
  });

  describe('toPicker', () => {
    it('converts color to picker value', () => {
      const initialColor = parseColor('#ff00ff');
      const pickerValue = toPicker(initialColor);
      expect(pickerValue).toHaveProperty('h');
      expect(pickerValue).toHaveProperty('s');
      expect(pickerValue).toHaveProperty('v');
      dropColor(initialColor);
    });
  });

  describe('fromPicker', () => {
    it('converts picker value to color', () => {
      const pickerState = { h: 120, s: 0.8, v: 0.7, a: 1 };
      const colorFromPicker = fromPicker(pickerState, 'rgb');
      expect(formatCss(colorFromPicker)).toBeDefined();
      dropColor(colorFromPicker);
    });
  });
});

describe('Vision Simulation', () => {
  describe('simulateDeficiency', () => {
    it('simulates color vision deficiency', () => {
      const original = parseColor('#ff5500');
      const simulated = simulateDeficiency(original, 'deuteranopia');
      expect(formatCss(simulated)).toBeDefined();
      dropColor(original);
      dropColor(simulated);
    });
  });
});
