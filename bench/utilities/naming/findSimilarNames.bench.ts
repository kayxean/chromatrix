import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { findSimilarNames } from '~/utils/naming';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_LAVENDER = {
  space: 'rgb',
  value: new Float32Array([0.5, 0.5, 0.8]),
  alpha: 1,
} as Color<'rgb'>;
const RGB_GREEN = { space: 'rgb', value: new Float32Array([0, 1, 0]), alpha: 1 } as Color<'rgb'>;

describe('findSimilarNames()', () => {
  bench('naming (similar-small-limit)', () => {
    findSimilarNames(RGB_RED, 3);
  });

  bench('naming (similar-limit)', () => {
    findSimilarNames(RGB_RED, 5);
  });

  bench('naming (similar-large-limit)', () => {
    findSimilarNames(RGB_GREEN, 10);
  });

  bench('naming (similar-mid-tone)', () => {
    findSimilarNames(RGB_LAVENDER, 5);
  });
});
