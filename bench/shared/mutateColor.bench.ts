import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { mutateColor } from '~/shared';

const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_RED_ALPHA = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 0.5 } as Color<'rgb'>;

describe('mutateColor()', () => {
  bench('mutate (rgb-to-oklab)', () => {
    mutateColor(RGB_WHITE, 'oklab');
  });

  bench('mutate (identity-rgb)', () => {
    mutateColor(RGB_RED, 'rgb');
  });

  bench('mutate (preserve-alpha)', () => {
    mutateColor(RGB_RED_ALPHA, 'hsl');
  });

  bench('mutate (sequential-rgb-to-hsl-to-oklab)', () => {
    mutateColor(RGB_RED, 'hsl');
    mutateColor(RGB_RED, 'oklab');
  });
});
