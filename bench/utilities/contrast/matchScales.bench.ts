import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { matchScales } from '~/utils/contrast';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_DARK_GRAY = {
  space: 'rgb',
  value: new Float32Array([0.13, 0.13, 0.13]),
  alpha: 1,
} as Color<'rgb'>;

describe('matchScales()', () => {
  bench('contrast (scales-small-step)', () => {
    matchScales([RGB_RED, RGB_WHITE], RGB_DARK_GRAY, 60, 5);
  });

  bench('contrast (scales-multi-stop)', () => {
    matchScales([RGB_BLUE, RGB_RED, RGB_WHITE], RGB_DARK_GRAY, 45, 10);
  });

  bench('contrast (scales-high-resolution)', () => {
    matchScales([RGB_RED, RGB_BLUE], RGB_WHITE, 75, 50);
  });
});
