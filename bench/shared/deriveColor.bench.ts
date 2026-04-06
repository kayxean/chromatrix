import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { deriveColor } from '~/shared';

const RGB_RED_OPAQUE = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_RED_ALPHA = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 0.5 } as Color<'rgb'>;
const RGB_GRAY = {
  space: 'rgb',
  value: new Float32Array([0.5, 0.5, 0.5]),
  alpha: 1,
} as Color<'rgb'>;

describe('deriveColor()', () => {
  bench('derive (rgb-to-oklab)', () => {
    deriveColor(RGB_RED_OPAQUE, 'oklab');
  });

  bench('derive (preserve-alpha)', () => {
    deriveColor(RGB_RED_ALPHA, 'hsl');
  });

  bench('derive (rgb-to-rgb)', () => {
    deriveColor(RGB_GRAY, 'rgb');
  });
});
