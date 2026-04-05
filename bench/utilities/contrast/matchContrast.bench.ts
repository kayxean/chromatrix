import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { matchContrast } from '~/utils/contrast';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const BG_COLOR = {
  space: 'rgb',
  value: new Float32Array([0.13, 0.13, 0.13]),
  alpha: 1,
} as Color<'rgb'>;

describe('matchContrast()', () => {
  bench('contrast (match)', () => {
    matchContrast(RED_COLOR, BG_COLOR, 75);
  });
});
