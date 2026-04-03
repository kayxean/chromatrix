import { bench, describe } from 'vitest';
import { parseColor } from '../../parse';
import { dropColor } from '../../shared';

const HEX = '#ff5500';
const RGB = 'rgb(255 128 0)';
const HSL = 'hsl(180 50% 50%)';
const HWB = 'hwb(180 50% 50%)';
const LAB = 'lab(50% 20 30)';
const LCH = 'lch(50% 30 120)';
const OKLAB = 'oklab(50% 0.15 0.1)';
const OKLCH = 'oklch(60% 0.15 30 / 0.5)';

describe('parseColor', () => {
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
});
