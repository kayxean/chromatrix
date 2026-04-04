import { bench, describe } from 'vitest';
import { clearPool, preallocatePool } from '~/shared';

describe('preallocatePool()', () => {
  bench('matrix', () => {
    clearPool();
    preallocatePool(50);
  });
});
