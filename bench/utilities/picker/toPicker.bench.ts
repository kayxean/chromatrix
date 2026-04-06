import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { toPicker } from '~/utils/picker';

const RGB_RED = {
  space: 'rgb',
  value: new Float32Array([1, 0, 0]),
  alpha: 1,
} as Color<'rgb'>;

const RGB_GREEN_ALPHA = {
  space: 'rgb',
  value: new Float32Array([0, 1, 0]),
  alpha: 0.5,
} as Color<'rgb'>;

const OKLCH_BLACK = {
  space: 'oklch',
  value: new Float32Array([0, 0, 0]),
  alpha: 1,
} as Color<'oklch'>;

const HSL_WHITE = {
  space: 'hsl',
  value: new Float32Array([0, 0, 100]),
  alpha: 1,
} as Color<'hsl'>;

describe('toPicker()', () => {
  bench('picker (to-rgb)', () => {
    toPicker(RGB_RED);
  });

  bench('picker (to-rgb-transparent)', () => {
    toPicker(RGB_GREEN_ALPHA);
  });

  bench('picker (to-from-oklch)', () => {
    toPicker(OKLCH_BLACK);
  });

  bench('picker (to-from-hsl)', () => {
    toPicker(HSL_WHITE);
  });
});
