import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createMultiColorGradient } from '~/utils/gradient';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_GREEN = { space: 'rgb', value: new Float32Array([0, 1, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;

describe('createMultiColorGradient()', () => {
  bench('gradient (multi-linear-default)', () => {
    createMultiColorGradient([RGB_RED, RGB_GREEN, RGB_BLUE]);
  });

  bench('gradient (multi-single-color)', () => {
    createMultiColorGradient([RGB_WHITE]);
  });

  bench('gradient (multi-radial-custom)', () => {
    createMultiColorGradient([RGB_RED, RGB_BLUE], 'radial', {
      shape: 'circle',
      position: 'top left',
    });
  });

  bench('gradient (multi-large-set)', () => {
    createMultiColorGradient([RGB_RED, RGB_GREEN, RGB_BLUE, RGB_WHITE, RGB_RED, RGB_GREEN, RGB_BLUE]);
  });
});
