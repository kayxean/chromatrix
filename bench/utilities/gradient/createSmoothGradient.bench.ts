import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createSmoothGradient } from '~/utils/gradient';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_BLACK = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;

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
