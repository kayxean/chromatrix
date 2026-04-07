import { bench, describe } from 'vitest';
import { findSimilarNames } from '~/utils/naming';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_LAVENDER = createMockColor('rgb', [0.5, 0.5, 0.8]);
const RGB_GREEN = createMockColor('rgb', [0, 1, 0]);

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
