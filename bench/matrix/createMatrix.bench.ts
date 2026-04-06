import { bench, describe } from 'vitest';
import { createMatrix, dropMatrix } from '~/matrix';

describe('createMatrix()', () => {
  bench('matrix (create-instance)', () => {
    createMatrix();
  });

  bench('matrix (reuse-from-pool)', () => {
    const initial = createMatrix();
    dropMatrix(initial);
    createMatrix();
  });

  bench('matrix (create-new-empty-pool)', () => {
    createMatrix();
    createMatrix();
  });
});
