import { bench, describe } from 'vitest';
import { multiplyMatrixVector, xyz65ToXyz50, xyz50ToXyz65 } from '../adapters/cat';
import { xyz50ToLab, labToXyz50 } from '../adapters/d50';
import { xyz65ToLrgb, lrgbToXyz65, xyz65ToOklab, oklabToXyz65 } from '../adapters/d65';
import { rgbToLrgb, lrgbToRgb } from '../adapters/gamma';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from '../adapters/polar';
import { rgbToHsv, hsvToRgb, hsvToHsl, hslToHsv, hsvToHwb, hwbToHsv } from '../adapters/srgb';
import { convertColor, convertHue } from '../convert';
import { formatCss } from '../format';
import { parseColor } from '../parse';
import { createColor, dropColor, getSharedBuffer } from '../shared';
import { isEqual, getDistance } from '../utils/compare';
import {
  checkContrast,
  matchContrast,
  checkContrastBulk,
  matchScales,
  getContrastRating,
} from '../utils/contrast';
import { checkGamut, clampColor } from '../utils/gamut';
import {
  createLinearGradient,
  createRadialGradient,
  createConicGradient,
  createSmoothGradient,
  createMultiColorGradient,
} from '../utils/gradient';
import { findClosestName, getExactName, findSimilarNames, parseColorName } from '../utils/naming';
import { createHarmony, createShades, createScales, mixColor } from '../utils/palette';
import { createPicker, toPicker, fromPicker } from '../utils/picker';
import { simulateDeficiency } from '../utils/simulate';
import { isValidColor } from '../utils/validate';

const HEX = '#ff5500';
const RGB = 'rgb(255 128 0)';
const HSL = 'hsl(180 50% 50%)';
const HWB = 'hwb(180 50% 50%)';
const LAB = 'lab(50% 20 30)';
const LCH = 'lch(50% 30 120)';
const OKLAB = 'oklab(50% 0.15 0.1)';
const OKLCH = 'oklch(60% 0.15 30 / 0.5)';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const HSV_COLOR = createColor('hsv', [180, 0.5, 0.8]);
const HSL_COLOR = createColor('hsl', [180, 0.5, 0.5]);
const HWB_COLOR = createColor('hwb', [180, 0.5, 0.5]);
const LRGB_COLOR = createColor('lrgb', [0.5, 0.5, 0.5]);
const LAB_COLOR = createColor('lab', [50, 20, 30]);
const LCH_COLOR = createColor('lch', [50, 30, 120]);
const OKLAB_COLOR = createColor('oklab', [0.5, 0.15, 0.1]);
const OKLCH_COLOR = createColor('oklch', [0.6, 0.2, 120]);

const TEXT_COLOR = parseColor('#ffffff');
const BG_COLOR = parseColor('#222222');
const COLOR_OBJ = createColor('rgb', [1, 0.5, 0]);
const WIDE_COLOR = createColor('oklch', [0.9, 0.4, 120]);
const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);
const GREEN_COLOR = createColor('rgb', [0, 1, 0]);

const RGB_IDX = RGB_COLOR.index;
const HSV_IDX = HSV_COLOR.index;
const LAB_IDX = LAB_COLOR.index;
const OKLCH_IDX = OKLCH_COLOR.index;

describe('Low-Level Color', () => {
  bench('createColor', () => {
    const c = createColor('rgb', COLOR_OBJ.value, COLOR_OBJ.alpha);
    dropColor(c);
  });

  bench('dropColor', () => {
    const c = createColor('rgb', COLOR_OBJ.value, COLOR_OBJ.alpha);
    dropColor(c);
  });

  bench('convertColor', () => {
    convertColor(RGB_COLOR, 'oklch');
    convertColor(RGB_COLOR, 'rgb');
  });
});

describe('Color Objects', () => {
  bench('createColor with alpha', () => {
    const c = createColor('rgb', [1, 0, 0], 0.5);
    dropColor(c);
  });

  bench('dropColor', () => {
    const c = createColor('hsl', [240, 0.8, 0.6]);
    dropColor(c);
  });
});

describe('Validation', () => {
  bench('isValidColor hex', () => {
    isValidColor(HEX);
  });

  bench('isValidColor rgb', () => {
    isValidColor(RGB);
  });

  bench('isValidColor hsl', () => {
    isValidColor(HSL);
  });

  bench('isValidColor hwb', () => {
    isValidColor(HWB);
  });

  bench('isValidColor lab', () => {
    isValidColor(LAB);
  });

  bench('isValidColor lch', () => {
    isValidColor(LCH);
  });

  bench('isValidColor oklab', () => {
    isValidColor(OKLAB);
  });

  bench('isValidColor oklch', () => {
    isValidColor(OKLCH);
  });
});

describe('CSS Integration', () => {
  bench('parseColor hex', () => {
    const c = parseColor(HEX);
    dropColor(c);
  });

  bench('parseColor rgb', () => {
    const c = parseColor(RGB);
    dropColor(c);
  });

  bench('parseColor hsl', () => {
    const c = parseColor(HSL);
    dropColor(c);
  });

  bench('parseColor hwb', () => {
    const c = parseColor(HWB);
    dropColor(c);
  });

  bench('parseColor lab', () => {
    const c = parseColor(LAB);
    dropColor(c);
  });

  bench('parseColor lch', () => {
    const c = parseColor(LCH);
    dropColor(c);
  });

  bench('parseColor oklab', () => {
    const c = parseColor(OKLAB);
    dropColor(c);
  });

  bench('parseColor oklch', () => {
    const c = parseColor(OKLCH);
    dropColor(c);
  });

  bench('formatCss rgb', () => {
    formatCss(COLOR_OBJ);
  });

  bench('formatCss hex', () => {
    formatCss(COLOR_OBJ, true);
  });

  bench('formatCss hsl', () => {
    formatCss(HSL_COLOR);
  });

  bench('formatCss hwb', () => {
    formatCss(HWB_COLOR);
  });

  bench('formatCss lab', () => {
    formatCss(LAB_COLOR);
  });

  bench('formatCss lch', () => {
    formatCss(LCH_COLOR);
  });

  bench('formatCss oklab', () => {
    formatCss(OKLAB_COLOR);
  });

  bench('formatCss oklch', () => {
    formatCss(OKLCH_COLOR);
  });
});

describe('Color Conversion', () => {
  bench('convertHue rgb', () => {
    convertHue(RGB_COLOR, 'rgb');
  });

  bench('convertHue hsl', () => {
    convertHue(HSL_COLOR, 'hsl');
  });

  bench('convertHue hwb', () => {
    convertHue(HWB_COLOR, 'hwb');
  });

  bench('convertHue lab', () => {
    convertHue(LAB_COLOR, 'lab');
  });

  bench('convertHue lch', () => {
    convertHue(LCH_COLOR, 'lch');
  });

  bench('convertHue oklab', () => {
    convertHue(OKLAB_COLOR, 'oklab');
  });

  bench('convertHue oklch', () => {
    convertHue(OKLCH_COLOR, 'oklch');
  });
});

describe('Adapters - CAT', () => {
  bench('xyz65ToXyz50', () => {
    xyz65ToXyz50(SHARED_BUFFER, RGB_IDX);
  });

  bench('xyz50ToXyz65', () => {
    xyz50ToXyz65(SHARED_BUFFER, RGB_IDX);
  });

  bench('multiplyMatrixVector', () => {
    const matrix = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    multiplyMatrixVector(matrix, SHARED_BUFFER, RGB_IDX);
  });
});

describe('Adapters - D50', () => {
  bench('xyz50ToLab', () => {
    xyz50ToLab(SHARED_BUFFER, RGB_IDX);
  });

  bench('labToXyz50', () => {
    labToXyz50(SHARED_BUFFER, RGB_IDX);
  });
});

describe('Adapters - D65', () => {
  bench('xyz65ToLrgb', () => {
    xyz65ToLrgb(SHARED_BUFFER, RGB_IDX);
  });

  bench('lrgbToXyz65', () => {
    lrgbToXyz65(SHARED_BUFFER, RGB_IDX);
  });

  bench('xyz65ToOklab', () => {
    xyz65ToOklab(SHARED_BUFFER, RGB_IDX);
  });

  bench('oklabToXyz65', () => {
    oklabToXyz65(SHARED_BUFFER, RGB_IDX);
  });
});

describe('Adapters - Gamma', () => {
  bench('rgbToLrgb', () => {
    rgbToLrgb(SHARED_BUFFER, RGB_IDX);
  });

  bench('lrgbToRgb', () => {
    lrgbToRgb(SHARED_BUFFER, RGB_IDX);
  });
});

describe('Adapters - Polar', () => {
  bench('labToLch', () => {
    labToLch(SHARED_BUFFER, LAB_IDX);
  });

  bench('lchToLab', () => {
    lchToLab(SHARED_BUFFER, OKLCH_IDX);
  });

  bench('oklabToOklch', () => {
    oklabToOklch(SHARED_BUFFER, RGB_IDX);
  });

  bench('oklchToOklab', () => {
    oklchToOklab(SHARED_BUFFER, OKLCH_IDX);
  });
});

describe('Adapters - sRGB', () => {
  bench('rgbToHsv', () => {
    rgbToHsv(SHARED_BUFFER, RGB_IDX);
  });

  bench('hsvToRgb', () => {
    hsvToRgb(SHARED_BUFFER, HSV_IDX);
  });

  bench('hsvToHsl', () => {
    hsvToHsl(SHARED_BUFFER, HSV_IDX);
  });

  bench('hslToHsv', () => {
    hslToHsv(SHARED_BUFFER, RGB_IDX);
  });

  bench('hsvToHwb', () => {
    hsvToHwb(SHARED_BUFFER, HSV_IDX);
  });

  bench('hwbToHsv', () => {
    hwbToHsv(SHARED_BUFFER, RGB_IDX);
  });
});

describe('Contrast & Accessibility', () => {
  bench('checkContrast', () => {
    checkContrast(TEXT_COLOR, BG_COLOR);
  });

  bench('matchContrast', () => {
    const c = matchContrast(RED_COLOR, BG_COLOR, 75);
    dropColor(c);
  });
});

describe('Bulk Contrast', () => {
  bench('checkContrastBulk', () => {
    checkContrastBulk(BG_COLOR, [TEXT_COLOR, RED_COLOR, BLUE_COLOR]);
  });
});

describe('Contrast Rating', () => {
  bench('getContrastRating', () => {
    getContrastRating(75.2);
  });
});

describe('Match Scales', () => {
  bench('matchScales', () => {
    const scale = matchScales([RED_COLOR, BLUE_COLOR], BG_COLOR, 60, 5);
    scale.forEach(dropColor);
  });
});

describe('Generative Tools', () => {
  bench('createHarmony', () => {
    const harmony = createHarmony(RED_COLOR, [
      { name: 'analogous', ratios: [-30, 30] },
      { name: 'complementary', ratios: [180] },
    ]);
    harmony.forEach((h) => h.colors.forEach(dropColor));
  });

  bench('createShades', () => {
    const shades = createShades(RED_COLOR, BLUE_COLOR, 5);
    shades.forEach(dropColor);
  });

  bench('createScales', () => {
    const scale = createScales([RED_COLOR, BLUE_COLOR, GREEN_COLOR], 5);
    scale.forEach(dropColor);
  });

  bench('mixColor', () => {
    const c = mixColor(RED_COLOR, BLUE_COLOR, 0.5);
    dropColor(c);
  });
});

describe('Safety & Comparison', () => {
  bench('isEqual', () => {
    isEqual(RED_COLOR, BLUE_COLOR);
  });

  bench('getDistance', () => {
    getDistance(RED_COLOR, BLUE_COLOR);
  });

  bench('checkGamut', () => {
    checkGamut(WIDE_COLOR);
  });

  bench('clampColor', () => {
    clampColor(WIDE_COLOR);
  });
});

describe('Interactive Pickers', () => {
  bench('createPicker', () => {
    const picker = createPicker(RED_COLOR);
    picker.dispose();
  });

  bench('toPicker', () => {
    toPicker(RED_COLOR);
  });

  bench('fromPicker', () => {
    const c = fromPicker({ h: 120, s: 0.8, v: 0.7, a: 1 }, 'rgb');
    dropColor(c);
  });
});

describe('Vision Simulation', () => {
  bench('simulateDeficiency deuteranopia', () => {
    const c = simulateDeficiency(RED_COLOR, 'deuteranopia');
    dropColor(c);
  });

  bench('simulateDeficiency protanopia', () => {
    const c = simulateDeficiency(RED_COLOR, 'protanopia');
    dropColor(c);
  });

  bench('simulateDeficiency tritanopia', () => {
    const c = simulateDeficiency(RED_COLOR, 'tritanopia');
    dropColor(c);
  });

  bench('simulateDeficiency achromatopsia', () => {
    const c = simulateDeficiency(RED_COLOR, 'achromatopsia');
    dropColor(c);
  });
});

describe('Color Naming', () => {
  bench('findClosestName', () => {
    findClosestName(RED_COLOR);
  });

  bench('getExactName', () => {
    getExactName(RED_COLOR);
  });

  bench('findSimilarNames', () => {
    findSimilarNames(RED_COLOR, 5);
  });

  bench('parseColorName', () => {
    const c = parseColorName('red');
    if (c) dropColor(c);
  });
});

describe('CSS Gradients', () => {
  bench('createLinearGradient', () => {
    createLinearGradient({ stops: [{ color: RED_COLOR }, { color: BLUE_COLOR }] });
  });

  bench('createRadialGradient', () => {
    createRadialGradient({ shape: 'circle', stops: [{ color: RED_COLOR }, { color: BLUE_COLOR }] });
  });

  bench('createConicGradient', () => {
    createConicGradient({ angle: 45, stops: [{ color: RED_COLOR }, { color: BLUE_COLOR }] });
  });

  bench('createSmoothGradient', () => {
    createSmoothGradient(RED_COLOR, BLUE_COLOR, 5);
  });

  bench('createMultiColorGradient', () => {
    createMultiColorGradient([RED_COLOR, BLUE_COLOR, GREEN_COLOR]);
  });
});

dropColor(RGB_COLOR);
dropColor(HSV_COLOR);
dropColor(HSL_COLOR);
dropColor(HWB_COLOR);
dropColor(LRGB_COLOR);
dropColor(LAB_COLOR);
dropColor(LCH_COLOR);
dropColor(OKLAB_COLOR);
dropColor(OKLCH_COLOR);
dropColor(COLOR_OBJ);
dropColor(WIDE_COLOR);
dropColor(TEXT_COLOR);
dropColor(BG_COLOR);
dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
dropColor(GREEN_COLOR);
