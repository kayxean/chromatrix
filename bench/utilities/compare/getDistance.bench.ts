import { bench, describe } from 'vitest';
import { getDistance } from '~/utils/compare';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_BLUE = createMockColor('rgb', [0, 0, 1]);
const HSL_RED = createMockColor('hsl', [0, 1, 0.5]);
const OKLAB_WHITE = createMockColor('oklab', [1, 0, 0]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);

describe('getDistance()', () => {
  bench('compare (distance-same-space)', () => {
    getDistance(RGB_RED, RGB_BLUE);
  });

  bench('compare (distance-different-space)', () => {
    getDistance(RGB_RED, HSL_RED);
  });

  bench('compare (distance-to-oklab)', () => {
    getDistance(RGB_WHITE, OKLAB_WHITE);
  });
});
