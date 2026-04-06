import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { clampColor } from '~/utils/gamut';

const RGB_IN_GAMUT = {
  space: 'rgb',
  value: new Float32Array([0.5, 0.2, 0.8]),
  alpha: 1,
} as Color<'rgb'>;

const RGB_OUT_OF_GAMUT = {
  space: 'rgb',
  value: new Float32Array([1.5, -0.2, 0.5]),
  alpha: 1,
} as Color<'rgb'>;

const OKLCH_HUE_OVERFLOW = {
  space: 'oklch',
  value: new Float32Array([0.5, 0.2, 400]),
  alpha: 1,
} as Color<'oklch'>;

const OKLCH_HUE_UNDERFLOW = {
  space: 'oklch',
  value: new Float32Array([0.5, 0.2, -10]),
  alpha: 1,
} as Color<'oklch'>;

describe('clampColor()', () => {
  bench('gamut (clamp-in-gamut)', () => {
    clampColor(RGB_IN_GAMUT);
  });

  bench('gamut (clamp-out-gamut-rgb)', () => {
    clampColor(RGB_OUT_OF_GAMUT);
  });

  bench('gamut (clamp-hue-wrapping)', () => {
    clampColor(OKLCH_HUE_OVERFLOW);
    clampColor(OKLCH_HUE_UNDERFLOW);
  });

  bench('gamut (clamp-mutate-true)', () => {
    clampColor(RGB_OUT_OF_GAMUT, true);
  });

  bench('gamut (clamp-mutate-false)', () => {
    clampColor(RGB_OUT_OF_GAMUT, false);
  });
});
