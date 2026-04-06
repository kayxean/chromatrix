import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { matchContrast } from '~/utils/contrast';

const RGB_DARK_RED = { space: 'rgb', value: new Float32Array([0.5, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_LIGHT_BLUE = {
  space: 'rgb',
  value: new Float32Array([0.8, 0.8, 1]),
  alpha: 1,
} as Color<'rgb'>;
const RGB_BLACK = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_RED_ALPHA = {
  space: 'rgb',
  value: new Float32Array([1, 0, 0]),
  alpha: 0.5,
} as Color<'rgb'>;

describe('matchContrast()', () => {
  bench('contrast (match-lighten-on-black)', () => {
    matchContrast(RGB_DARK_RED, RGB_BLACK, 60);
  });

  bench('contrast (match-darken-on-white)', () => {
    matchContrast(RGB_LIGHT_BLUE, RGB_WHITE, 75);
  });

  bench('contrast (match-with-alpha)', () => {
    matchContrast(RGB_RED_ALPHA, RGB_BLACK, 60);
  });
});
