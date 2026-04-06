import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { getDistance } from '~/utils/compare';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const HSL_RED = { space: 'hsl', value: new Float32Array([0, 1, 0.5]), alpha: 1 } as Color<'hsl'>;
const OKLAB_WHITE = {
  space: 'oklab',
  value: new Float32Array([1, 0, 0]),
  alpha: 1,
} as Color<'oklab'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;

describe('getDistance()', () => {
  bench('compare (distance-same-space)', () => {
    getDistance(RGB_RED, RGB_BLUE);
  });

  bench('compare (distance-different-space)', () => {
    getDistance(RGB_RED, HSL_RED);
  });

  bench('compare (distance-to-oklab)', () => {
    getDistance(RGB_WHITE, OKLAB_WHITE);
  });
});
