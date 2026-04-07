import { bench, describe } from 'vitest';
import { isEqual } from '~/utils/compare';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_RED_ALPHA = createMockColor('rgb', [1, 0, 0], 0.5);
const RGB_RED_NEAR = createMockColor('rgb', [1, 0.005, 0]);
const OKLAB_RED = createMockColor('oklab', [0.6279, 0.2248, 0.1258]);

describe('isEqual()', () => {
  bench('compare (equal-same-reference)', () => {
    isEqual(RGB_RED, RGB_RED);
  });

  bench('compare (equal-different-space)', () => {
    isEqual(RGB_RED, OKLAB_RED, 0.001);
  });

  bench('compare (equal-alpha-mismatch)', () => {
    isEqual(RGB_RED, RGB_RED_ALPHA);
  });

  bench('compare (equal-with-tolerance)', () => {
    isEqual(RGB_RED, RGB_RED_NEAR, 0.01);
  });
});
