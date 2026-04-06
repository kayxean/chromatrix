import { bench, describe } from 'vitest';
import { clearPool, preallocatePool, createMatrix, dropMatrix } from '~/matrix';

describe('preallocatePool()', () => {
  bench('matrix (preallocate-matrices)', () => {
    clearPool();
    preallocatePool(5);
    createMatrix('rgb');
  });

  bench('matrix (preallocate-max-cap)', () => {
    clearPool();
    preallocatePool(300);
    const m1 = createMatrix('rgb');
    dropMatrix(m1);
  });
});
