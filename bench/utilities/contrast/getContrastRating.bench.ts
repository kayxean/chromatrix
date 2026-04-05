import { bench, describe } from 'vitest';
import { getContrastRating } from '~/utils/contrast';

describe('getContrastRating()', () => {
  bench('contrast (rating)', () => {
    getContrastRating(75.2);
  });
});
