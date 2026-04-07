import { bench, describe } from 'vitest';
import { createSmoothGradient } from '~/utils/gradient';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_BLUE = createMockColor('rgb', [0, 0, 1]);
const RGB_BLACK = createMockColor('rgb', [0, 0, 0]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);

describe('createSmoothGradient()', () => {
  bench('gradient (smooth-linear)', () => {
    createSmoothGradient(RGB_RED, RGB_BLUE, 5);
  });

  bench('gradient (smooth-linear-high-fidelity)', () => {
    createSmoothGradient(RGB_RED, RGB_BLUE, 15);
  });

  bench('gradient (smooth-radial-custom)', () => {
    createSmoothGradient(RGB_BLACK, RGB_WHITE, 3, 'radial', {
      shape: 'circle',
      position: 'center',
    });
  });

  bench('gradient (smooth-edge-case-steps)', () => {
    createSmoothGradient(RGB_RED, RGB_BLUE, 1);
    createSmoothGradient(RGB_RED, RGB_BLUE, 0);
  });
});
