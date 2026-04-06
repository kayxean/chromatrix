import { bench, describe } from 'vitest';
import { getContrastRating } from '~/utils/contrast';

describe('getContrastRating()', () => {
  bench('contrast (rating-platinum)', () => {
    getContrastRating(114);
  });

  bench('contrast (rating-gold)', () => {
    getContrastRating(75.2);
  });

  bench('contrast (rating-bronze)', () => {
    getContrastRating(45);
  });

  bench('contrast (rating-fail)', () => {
    getContrastRating(15);
  });
});
