import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { clampColor } from '~/utils/gamut';

const WIDE_COLOR = {
  space: 'oklch',
  value: new Float32Array([0.9, 0.4, 120]),
  alpha: 1,
} as Color<'oklch'>;

describe('clampColor()', () => {
  bench('gamut (clamp)', () => {
    clampColor(WIDE_COLOR);
  });
});
