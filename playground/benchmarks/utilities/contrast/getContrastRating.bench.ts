import { bench, describe } from 'vitest';
import { getContrastRating } from '../../../utils/contrast';

describe('getContrastRating', () => {
  bench('getContrastRating', () => {
    getContrastRating(75.2);
  });
});
