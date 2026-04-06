import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { mixColor } from '~/utils/palette';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE_ALPHA = {
  space: 'rgb',
  value: new Float32Array([0, 0, 1]),
  alpha: 0,
} as Color<'rgb'>;
const HSL_RED = { space: 'hsl', value: new Float32Array([350, 100, 50]), alpha: 1 } as Color<'hsl'>;
const HSL_ORANGE = { space: 'hsl', value: new Float32Array([10, 100, 50]), alpha: 1 } as Color<'hsl'>;

describe('mixColor()', () => {
  bench('palette (mix-rgb-linear)', () => {
    const result = mixColor(RGB_RED, RGB_BLUE_ALPHA, 0.5);
    dropColor(result);
  });

  bench('palette (mix-hsl-shortest-hue)', () => {
    const result = mixColor(HSL_RED, HSL_ORANGE, 0.5);
    dropColor(result);
  });

  bench('palette (mix-ratio-clamping)', () => {
    const under = mixColor(RGB_RED, HSL_ORANGE, -1);
    const over = mixColor(RGB_RED, HSL_ORANGE, 2);
    dropColor(under);
    dropColor(over);
  });

  bench('palette (mix-zero-ratio-copy)', () => {
    const result = mixColor(RGB_RED, RGB_BLUE_ALPHA, 0);
    dropColor(result);
  });
});
