import { bench, describe } from 'vitest';
import { multiplyMatrixVector, xyz65ToXyz50, xyz50ToXyz65 } from '~/adapters/cat';
import { xyz50ToLab, labToXyz50 } from '~/adapters/d50';
import { xyz65ToLrgb, lrgbToXyz65, xyz65ToOklab, oklabToXyz65 } from '~/adapters/d65';
import { rgbToLrgb, lrgbToRgb } from '~/adapters/gamma';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from '~/adapters/polar';
import { rgbToHsv, hsvToRgb, hsvToHsl, hslToHsv, hsvToHwb, hwbToHsv } from '~/adapters/srgb';
import { convertColor, convertHue } from '~/convert';
import { formatCss } from '~/format';
import { parseColor } from '~/parse';
import {
  createColor,
  createMatrix,
  dropColor,
  dropMatrix,
  cloneColor,
  mutateColor,
  deriveColor,
} from '~/shared';
import { isEqual, getDistance } from '~/utils/compare';
import {
  checkContrast,
  getContrastRating,
  matchContrast,
  checkContrastBulk,
  matchScales,
} from '~/utils/contrast';
import { checkGamut, clampColor } from '~/utils/gamut';
import {
  createLinearGradient,
  createRadialGradient,
  createConicGradient,
  createSmoothGradient,
  createMultiColorGradient,
} from '~/utils/gradient';
import { findClosestName, getExactName, findSimilarNames, parseColorName } from '~/utils/naming';
import { createHarmony, mixColor, createShades, createScales } from '~/utils/palette';
import { toPicker, fromPicker, createPicker } from '~/utils/picker';
import { simulateDeficiency } from '~/utils/simulate';

const rgb = createMatrix('rgb');
const oklch = createMatrix('oklch');
const lab = createMatrix('lab');
const lrgb = createMatrix('lrgb');
const hsv = createMatrix('hsv');
const colorObj = createColor('rgb', [1, 0.5, 0]);
const red = createColor('rgb', [1, 0, 0]);
const blue = createColor('rgb', [0, 0, 1]);
const green = createColor('rgb', [0, 1, 0]);
const wideColor = createColor('oklch', [0.9, 0.4, 120]);
const text = parseColor('#ffffff');
const bg = parseColor('#222222');

describe('Matrix Management', () => {
  bench('createMatrix', () => {
    const m = createMatrix('rgb');
    dropMatrix(m);
  });

  bench('createColor', () => {
    const c = createColor('rgb', [1, 0.5, 0]);
    dropColor(c);
  });

  bench('cloneColor', () => {
    const c = cloneColor(colorObj);
    dropColor(c);
  });

  bench('mutateColor', () => {
    mutateColor(colorObj, 'oklch');
    mutateColor(colorObj, 'rgb');
  });

  bench('deriveColor', () => {
    const c = deriveColor(colorObj, 'oklch');
    dropColor(c);
  });
});

describe('Color Conversion', () => {
  bench('convertColor RGB -> OKLCH', () => {
    convertColor(rgb, oklch, 'rgb', 'oklch');
  });

  bench('convertColor RGB -> LAB', () => {
    convertColor(rgb, lab, 'rgb', 'lab');
  });

  bench('convertColor LAB -> OKLCH', () => {
    convertColor(lab, oklch, 'lab', 'oklch');
  });

  bench('convertHue', () => {
    convertHue(rgb, oklch, 'rgb');
  });
});

describe('CSS Integration', () => {
  bench('parseColor hex', () => {
    const c = parseColor('#ff5500');
    dropColor(c);
  });

  bench('parseColor oklch', () => {
    const c = parseColor('oklch(60% 0.15 30 / 0.5)');
    dropColor(c);
  });

  bench('parseColor rgb', () => {
    const c = parseColor('rgb(255 128 0)');
    dropColor(c);
  });

  bench('parseColor hsl', () => {
    const c = parseColor('hsl(180 50% 50%)');
    dropColor(c);
  });

  bench('formatCss rgb', () => {
    formatCss(colorObj);
  });

  bench('formatCss hex', () => {
    formatCss(colorObj, true);
  });
});

describe('Adapters - CAT', () => {
  bench('xyz65ToXyz50', () => {
    xyz65ToXyz50(rgb, lab);
  });

  bench('xyz50ToXyz65', () => {
    xyz50ToXyz65(rgb, lab);
  });

  bench('multiplyMatrixVector', () => {
    multiplyMatrixVector(rgb, rgb, lab);
  });
});

describe('Adapters - D50', () => {
  bench('xyz50ToLab', () => {
    xyz50ToLab(rgb, lab);
  });

  bench('labToXyz50', () => {
    labToXyz50(rgb, lab);
  });
});

describe('Adapters - D65', () => {
  bench('xyz65ToLrgb', () => {
    xyz65ToLrgb(rgb, lrgb);
  });

  bench('lrgbToXyz65', () => {
    lrgbToXyz65(rgb, lrgb);
  });

  bench('xyz65ToOklab', () => {
    xyz65ToOklab(rgb, oklch);
  });

  bench('oklabToXyz65', () => {
    oklabToXyz65(rgb, oklch);
  });
});

describe('Adapters - Gamma', () => {
  bench('rgbToLrgb', () => {
    rgbToLrgb(rgb, lrgb);
  });

  bench('lrgbToRgb', () => {
    lrgbToRgb(lrgb, rgb);
  });
});

describe('Adapters - Polar', () => {
  bench('labToLch', () => {
    labToLch(lab, oklch);
  });

  bench('lchToLab', () => {
    lchToLab(oklch, lab);
  });

  bench('oklabToOklch', () => {
    oklabToOklch(rgb, oklch);
  });

  bench('oklchToOklab', () => {
    oklchToOklab(oklch, rgb);
  });
});

describe('Adapters - sRGB', () => {
  bench('rgbToHsv', () => {
    rgbToHsv(rgb, hsv);
  });

  bench('hsvToRgb', () => {
    hsvToRgb(hsv, rgb);
  });

  bench('hsvToHsl', () => {
    hsvToHsl(hsv, oklch);
  });

  bench('hslToHsv', () => {
    hslToHsv(rgb, hsv);
  });

  bench('hsvToHwb', () => {
    hsvToHwb(hsv, oklch);
  });

  bench('hwbToHsv', () => {
    hwbToHsv(rgb, hsv);
  });
});

describe('Comparison', () => {
  bench('isEqual', () => {
    isEqual(red, blue);
  });

  bench('getDistance', () => {
    getDistance(red, blue);
  });
});

describe('Contrast', () => {
  bench('checkContrast', () => {
    checkContrast(text, bg);
  });

  bench('getContrastRating', () => {
    getContrastRating(75.2);
  });

  bench('matchContrast', () => {
    const c = matchContrast(red, bg, 75);
    dropColor(c);
  });

  bench('checkContrastBulk', () => {
    checkContrastBulk(bg, [text, red, blue]);
  });

  bench('matchScales', () => {
    const scale = matchScales([red, blue], bg, 60, 5);
    scale.forEach(dropColor);
  });
});

describe('Gamut', () => {
  bench('checkGamut', () => {
    checkGamut(wideColor);
  });

  bench('clampColor', () => {
    clampColor(wideColor);
  });
});

describe('Palette', () => {
  bench('createHarmony', () => {
    const harmony = createHarmony(red, [
      { name: 'analogous', ratios: [-30, 30] },
      { name: 'complementary', ratios: [180] },
    ]);
    harmony.forEach((h) => h.colors.forEach(dropColor));
  });

  bench('mixColor', () => {
    const c = mixColor(red, blue, 0.5);
    dropColor(c);
  });

  bench('createShades', () => {
    const shades = createShades(red, blue, 5);
    shades.forEach(dropColor);
  });

  bench('createScales', () => {
    const scale = createScales([red, blue, green], 5);
    scale.forEach(dropColor);
  });
});

describe('Picker', () => {
  bench('toPicker', () => {
    toPicker(red);
  });

  bench('fromPicker', () => {
    const c = fromPicker({ h: 120, s: 0.8, v: 0.7, a: 1 }, 'rgb');
    dropColor(c);
  });

  bench('createPicker', () => {
    const picker = createPicker(red);
    picker.dispose();
  });
});

describe('Naming', () => {
  bench('findClosestName', () => {
    findClosestName(red);
  });

  bench('getExactName', () => {
    getExactName(red);
  });

  bench('findSimilarNames', () => {
    findSimilarNames(red, 5);
  });

  bench('parseColorName', () => {
    const c = parseColorName('red');
    if (c) dropColor(c);
  });
});

describe('Gradient', () => {
  bench('createLinearGradient', () => {
    createLinearGradient({ stops: [{ color: red }, { color: blue }] });
  });

  bench('createRadialGradient', () => {
    createRadialGradient({ shape: 'circle', stops: [{ color: red }, { color: blue }] });
  });

  bench('createConicGradient', () => {
    createConicGradient({ angle: 45, stops: [{ color: red }, { color: blue }] });
  });

  bench('createSmoothGradient', () => {
    createSmoothGradient(red, blue, 5);
  });

  bench('createMultiColorGradient', () => {
    createMultiColorGradient([red, blue, green]);
  });
});

describe('Simulate', () => {
  bench('simulateDeficiency deuteranopia', () => {
    const c = simulateDeficiency(red, 'deuteranopia');
    dropColor(c);
  });

  bench('simulateDeficiency protanopia', () => {
    const c = simulateDeficiency(red, 'protanopia');
    dropColor(c);
  });

  bench('simulateDeficiency tritanopia', () => {
    const c = simulateDeficiency(red, 'tritanopia');
    dropColor(c);
  });

  bench('simulateDeficiency achromatopsia', () => {
    const c = simulateDeficiency(red, 'achromatopsia');
    dropColor(c);
  });
});

dropMatrix(rgb);
dropMatrix(oklch);
dropMatrix(lab);
dropMatrix(lrgb);
dropMatrix(hsv);
dropColor(colorObj);
dropColor(red);
dropColor(blue);
dropColor(green);
dropColor(wideColor);
dropColor(text);
dropColor(bg);
