import { beforeEach, describe, expect, it } from 'vitest';
import { clearPool, createMatrix, dropMatrix, preallocatePool } from '~/matrix';

describe('clearPool()', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should empty the pool', () => {
    preallocatePool(10);
    clearPool();

    const m1 = createMatrix();
    const m2 = createMatrix();
    expect(m1).not.toBe(m2);
  });

  it('should allow fresh allocations after clearing', () => {
    const m1 = createMatrix();
    dropMatrix(m1);
    clearPool();

    const m2 = createMatrix();
    expect(m2).not.toBe(m1);
  });
});
