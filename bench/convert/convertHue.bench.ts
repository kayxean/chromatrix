import { bench, describe } from 'vitest';
import { convertHue } from '~/convert';
import { createColor, createMatrix, dropColor, dropMatrix } from '~/matrix';

const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const HSL_COLOR = createColor('hsl', [180, 0.5, 0.5]);
const HWB_COLOR = createColor('hwb', [180, 0.5, 0.5]);
const LAB_COLOR = createColor('lab', [50, 20, 30]);
const LCH_COLOR = createColor('lch', [50, 30, 120]);
const OKLAB_COLOR = createColor('oklab', [0.5, 0.15, 0.1]);
const OKLCH_COLOR = createColor('oklch', [0.6, 0.2, 120]);
const RGB_OUTPUT = createMatrix('rgb');
const HSL_OUTPUT = createMatrix('hsl');
const HWB_OUTPUT = createMatrix('hwb');
const LAB_OUTPUT = createMatrix('lab');
const LCH_OUTPUT = createMatrix('lch');
const OKLAB_OUTPUT = createMatrix('oklab');
const OKLCH_OUTPUT = createMatrix('oklch');

describe('convertHue()', () => {
  bench('hue (rgb)', () => {
    convertHue(RGB_COLOR.value, RGB_OUTPUT, 'rgb');
  });

  bench('hue (hsl)', () => {
    convertHue(HSL_COLOR.value, HSL_OUTPUT, 'hsl');
  });

  bench('hue (hwb)', () => {
    convertHue(HWB_COLOR.value, HWB_OUTPUT, 'hwb');
  });

  bench('hue (lab)', () => {
    convertHue(LAB_COLOR.value, LAB_OUTPUT, 'lab');
  });

  bench('hue (lch)', () => {
    convertHue(LCH_COLOR.value, LCH_OUTPUT, 'lch');
  });

  bench('hue (oklab)', () => {
    convertHue(OKLAB_COLOR.value, OKLAB_OUTPUT, 'oklab');
  });

  bench('hue (oklch)', () => {
    convertHue(OKLCH_COLOR.value, OKLCH_OUTPUT, 'oklch');
  });
});

dropColor(RGB_COLOR);
dropColor(HSL_COLOR);
dropColor(HWB_COLOR);
dropColor(LAB_COLOR);
dropColor(LCH_COLOR);
dropColor(OKLAB_COLOR);
dropColor(OKLCH_COLOR);
dropMatrix(RGB_OUTPUT);
dropMatrix(HSL_OUTPUT);
dropMatrix(HWB_OUTPUT);
dropMatrix(LAB_OUTPUT);
dropMatrix(LCH_OUTPUT);
dropMatrix(OKLAB_OUTPUT);
dropMatrix(OKLCH_OUTPUT);
