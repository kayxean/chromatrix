import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { matchScales } from '~/utils/contrast';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const BLUE_COLOR = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const BG_COLOR = {
  space: 'rgb',
  value: new Float32Array([0.13, 0.13, 0.13]),
  alpha: 1,
} as Color<'rgb'>;

describe('matchScales()', () => {
  bench('contrast', () => {
    matchScales([RED_COLOR, BLUE_COLOR], BG_COLOR, 60, 5);
  });
});
