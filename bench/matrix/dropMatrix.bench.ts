import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { createMatrix, dropMatrix } from '~/matrix';

const POOL_FILL: ColorArray[] = Array.from(
  { length: 300 },
  () => new Float32Array(3) as ColorArray,
);

describe('dropMatrix()', () => {
  bench('matrix (drop-to-pool)', () => {
    const m = createMatrix('rgb');
    dropMatrix(m);
  });

  bench('matrix (drop-max-pool-limit)', () => {
    POOL_FILL.forEach(dropMatrix);
  });
});
