import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { dropMatrix } from '~/shared';

const INPUT = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;

describe('dropMatrix()', () => {
  bench('matrix', () => {
    dropMatrix(INPUT);
  });
});
