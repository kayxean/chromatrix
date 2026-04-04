import { bench, describe } from 'vitest';
import { clearPool, preallocatePool } from '~/shared';

describe('clearPool()', () => {
  bench('matrix', () => {
    preallocatePool(50);
    clearPool();
  });
});
