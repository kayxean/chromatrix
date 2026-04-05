import { bench, describe } from 'vitest';
import { clearPool, preallocatePool } from '~/matrix';

describe('clearPool()', () => {
  bench('matrix (clear)', () => {
    preallocatePool(50);
    clearPool();
  });
});
