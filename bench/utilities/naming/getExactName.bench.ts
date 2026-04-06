import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { getExactName } from '~/utils/naming';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_NEAR_RED = {
  space: 'rgb',
  value: new Float32Array([0.9999, 0, 0]),
  alpha: 1,
} as Color<'rgb'>;
const RGB_UNNAMED = {
  space: 'rgb',
  value: new Float32Array([0.123, 0.456, 0.789]),
  alpha: 1,
} as Color<'rgb'>;

describe('getExactName()', () => {
  bench('naming (exact-match)', () => {
    getExactName(RGB_RED);
  });

  bench('naming (exact-near-match-default-tolerance)', () => {
    getExactName(RGB_NEAR_RED);
  });

  bench('naming (exact-near-match-strict-tolerance)', () => {
    getExactName(RGB_NEAR_RED, 0.0000001);
  });

  bench('naming (exact-no-match)', () => {
    getExactName(RGB_UNNAMED);
  });
});
