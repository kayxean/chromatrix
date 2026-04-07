import { bench, describe } from 'vitest';
import { findClosestName } from '~/utils/naming';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_OFF_RED = createMockColor('rgb', [0.98, 0.01, 0.01]);
const RGB_PURPLE = createMockColor('rgb', [0.4, 0.2, 0.6]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);

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
