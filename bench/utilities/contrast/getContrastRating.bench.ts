import { bench, describe } from 'vitest';
import { getContrastRating } from '~/utils/contrast';

describe('getContrastRating()', () => {
  bench('contrast', () => {
    getContrastRating(75.2);
  });
});
