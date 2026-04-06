import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { isEqual } from '~/utils/compare';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_RED_ALPHA = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 0.5 } as Color<'rgb'>;
const RGB_RED_NEAR = {
  space: 'rgb',
  value: new Float32Array([1, 0.005, 0]),
  alpha: 1,
} as Color<'rgb'>;
const OKLAB_RED = {
  space: 'oklab',
  value: new Float32Array([0.6279, 0.2248, 0.1258]),
  alpha: 1,
} as Color<'oklab'>;

describe('isEqual()', () => {
  bench('compare (equal-same-reference)', () => {
    isEqual(RGB_RED, RGB_RED);
  });

  bench('compare (equal-different-space)', () => {
    isEqual(RGB_RED, OKLAB_RED, 0.001);
  });

  bench('compare (equal-alpha-mismatch)', () => {
    isEqual(RGB_RED, RGB_RED_ALPHA);
  });

  bench('compare (equal-with-tolerance)', () => {
    isEqual(RGB_RED, RGB_RED_NEAR, 0.01);
  });
});
