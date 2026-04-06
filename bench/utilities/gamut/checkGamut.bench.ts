import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { checkGamut } from '~/utils/gamut';

const RGB_GRAY = {
  space: 'rgb',
  value: new Float32Array([0.5, 0.5, 0.5]),
  alpha: 1,
} as Color<'rgb'>;

const RGB_OUT_OF_GAMUT = {
  space: 'rgb',
  value: new Float32Array([1.1, 0.5, 0.5]),
  alpha: 1,
} as Color<'rgb'>;

const OKLCH_OUT_OF_GAMUT = {
  space: 'oklch',
  value: new Float32Array([0.5, 0.5, 120]),
  alpha: 1,
} as Color<'oklch'>;

const OKLCH_WIDE_HUE = {
  space: 'oklch',
  value: new Float32Array([0.5, 0.2, 400]),
  alpha: 1,
} as Color<'oklch'>;

describe('checkGamut()', () => {
  bench('gamut (check-in-gamut-rgb)', () => {
    checkGamut(RGB_GRAY);
  });

  bench('gamut (check-out-gamut-rgb)', () => {
    checkGamut(RGB_OUT_OF_GAMUT);
  });

  bench('gamut (check-out-gamut-oklch)', () => {
    checkGamut(OKLCH_OUT_OF_GAMUT);
  });

  bench('gamut (check-high-tolerance)', () => {
    checkGamut(RGB_OUT_OF_GAMUT, 0.2);
  });

  bench('gamut (check-hue-rotation)', () => {
    checkGamut(OKLCH_WIDE_HUE);
  });
});
