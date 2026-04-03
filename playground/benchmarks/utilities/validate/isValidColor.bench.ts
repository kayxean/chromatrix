import { bench, describe } from 'vitest';
import { isValidColor } from '../../../utils/validate';

const HEX = '#ff5500';
const RGB = 'rgb(255 128 0)';
const HSL = 'hsl(180 50% 50%)';
const HWB = 'hwb(180 50% 50%)';
const LAB = 'lab(50% 20 30)';
const LCH = 'lch(50% 30 120)';
const OKLAB = 'oklab(50% 0.15 0.1)';
const OKLCH = 'oklch(60% 0.15 30 / 0.5)';

describe('isValidColor', () => {
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
