import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { checkContrast } from '~/utils/contrast';

const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_BLACK = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_GRAY = { space: 'rgb', value: new Float32Array([0.5, 0.5, 0.5]), alpha: 1 } as Color<'rgb'>;
const RGB_DARK_GRAY = {
  space: 'rgb',
  value: new Float32Array([0.13, 0.13, 0.13]),
  alpha: 1,
} as Color<'rgb'>;

describe('checkContrast()', () => {
  bench('contrast (white-on-black)', () => {
    checkContrast(RGB_WHITE, RGB_BLACK);
  });

  bench('contrast (black-on-white)', () => {
    checkContrast(RGB_BLACK, RGB_WHITE);
  });

  bench('contrast (identical-colors)', () => {
    checkContrast(RGB_GRAY, RGB_GRAY);
  });

  bench('contrast (text-on-dark-bg)', () => {
    checkContrast(RGB_WHITE, RGB_DARK_GRAY);
  });
});
