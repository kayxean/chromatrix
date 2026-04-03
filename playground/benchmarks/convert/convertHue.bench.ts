import { bench, describe } from 'vitest';
import { convertHue } from '../../convert';
import { createColor, dropColor } from '../../shared';

const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const HSL_COLOR = createColor('hsl', [180, 0.5, 0.5]);
const HWB_COLOR = createColor('hwb', [180, 0.5, 0.5]);
const LAB_COLOR = createColor('lab', [50, 20, 30]);
const LCH_COLOR = createColor('lch', [50, 30, 120]);
const OKLAB_COLOR = createColor('oklab', [0.5, 0.15, 0.1]);
const OKLCH_COLOR = createColor('oklch', [0.6, 0.2, 120]);

describe('convertHue', () => {
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

dropColor(RGB_COLOR);
dropColor(HSL_COLOR);
dropColor(HWB_COLOR);
dropColor(LAB_COLOR);
dropColor(LCH_COLOR);
dropColor(OKLAB_COLOR);
dropColor(OKLCH_COLOR);
