import { bench, describe } from 'vitest';
import { parseColor } from '~/parse';

const HEX = '#ff5500';
const RGB = 'rgb(255 128 0)';
const HSL = 'hsl(180 50% 50%)';
const HWB = 'hwb(180 50% 50%)';
const LAB = 'lab(50% 20 30)';
const LCH = 'lch(50% 30 120)';
const OKLAB = 'oklab(50% 0.15 0.1)';
const OKLCH = 'oklch(60% 0.15 30 / 0.5)';

describe('parseColor()', () => {
  bench('parse (hex)', () => {
    parseColor(HEX);
  });

  bench('parse (rgb)', () => {
    parseColor(RGB);
  });

  bench('parse (hsl)', () => {
    parseColor(HSL);
  });

  bench('parse (hwb)', () => {
    parseColor(HWB);
  });

  bench('parse (lab)', () => {
    parseColor(LAB);
  });

  bench('parse (lch)', () => {
    parseColor(LCH);
  });

  bench('parse (oklab)', () => {
    parseColor(OKLAB);
  });

  bench('parse (oklch)', () => {
    parseColor(OKLCH);
  });
});
