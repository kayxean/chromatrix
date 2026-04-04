import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { checkContrast } from '~/utils/contrast';

const TEXT_COLOR = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const BG_COLOR = {
  space: 'rgb',
  value: new Float32Array([0.13, 0.13, 0.13]),
  alpha: 1,
} as Color<'rgb'>;

describe('checkContrast()', () => {
  bench('contrast', () => {
    checkContrast(TEXT_COLOR, BG_COLOR);
  });
});
