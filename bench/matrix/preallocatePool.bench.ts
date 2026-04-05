import { bench, describe } from 'vitest';
import { clearPool, preallocatePool } from '~/matrix';

describe('preallocatePool()', () => {
  bench('matrix (preallocate)', () => {
    clearPool();
    preallocatePool(50);
  });
});
