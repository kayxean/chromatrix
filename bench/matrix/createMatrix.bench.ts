import { bench, describe } from 'vitest';
import { createMatrix, dropMatrix } from '~/matrix';

describe('createMatrix()', () => {
  const m = createMatrix('rgb');
  dropMatrix(m);

  bench('matrix (create-matrix)', () => {
    const matrix = createMatrix('rgb');
    dropMatrix(matrix);
  });
});
