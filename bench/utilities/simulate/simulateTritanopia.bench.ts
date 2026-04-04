import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { simulateDeficiency } from '~/utils/simulate';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('simulateDeficiency() tritanopia', () => {
  bench('simulate', () => {
    simulateDeficiency(RED_COLOR, 'tritanopia');
  });
});
