import { bench, describe } from 'vitest';
import { clearPool, createMatrix, dropMatrix, preallocatePool } from '~/matrix';

describe('clearPool()', () => {
  bench('matrix (clear-preallocated)', () => {
    preallocatePool(10);
    clearPool();
  });

  bench('matrix (clear-after-drop)', () => {
    const m1 = createMatrix();
    dropMatrix(m1);
    clearPool();
    createMatrix();
  });
});
