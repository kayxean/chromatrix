import { bench, describe } from 'vitest';
import { getExactName } from '~/utils/naming';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_NEAR_RED = createMockColor('rgb', [0.9999, 0, 0]);
const RGB_UNNAMED = createMockColor('rgb', [0.123, 0.456, 0.789]);

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
