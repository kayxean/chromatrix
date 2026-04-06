import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { findClosestName } from '~/utils/naming';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_OFF_RED = {
  space: 'rgb',
  value: new Float32Array([0.98, 0.01, 0.01]),
  alpha: 1,
} as Color<'rgb'>;
const RGB_PURPLE = {
  space: 'rgb',
  value: new Float32Array([0.4, 0.2, 0.6]),
  alpha: 1,
} as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;

describe('findClosestName()', () => {
  bench('naming (closest-exact-match)', () => {
    findClosestName(RGB_RED);
  });

  bench('naming (closest-approximate-match)', () => {
    findClosestName(RGB_OFF_RED);
  });

  bench('naming (closest-named-constant)', () => {
    findClosestName(RGB_PURPLE);
  });

  bench('naming (closest-boundary-case)', () => {
    findClosestName(RGB_WHITE);
  });
});
