import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { checkGamut } from '~/utils/gamut';

const WIDE_COLOR = {
  space: 'oklch',
  value: new Float32Array([0.9, 0.4, 120]),
  alpha: 1,
} as Color<'oklch'>;

describe('checkGamut()', () => {
  bench('gamut (check)', () => {
    checkGamut(WIDE_COLOR);
  });
});
