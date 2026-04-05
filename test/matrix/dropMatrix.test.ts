import type { ColorArray } from '~/types';
import { beforeEach, describe, expect, it } from 'vitest';
import { clearPool, createMatrix, dropMatrix } from '~/matrix';

describe('dropMatrix()', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should return the matrix to the pool', () => {
    const m1 = createMatrix('rgb');
    dropMatrix(m1);

    const m2 = createMatrix('rgb');
    expect(m2).toBe(m1);
  });

  it('should not exceed MAX_POOL_SIZE', () => {
    const matrices: ColorArray[] = [];
    for (let i = 0; i < 300; i++) {
      matrices.push(createMatrix('rgb'));
    }
    matrices.forEach(dropMatrix);

    const m1 = createMatrix('rgb');
    const m2 = createMatrix('rgb');
    expect(m1).not.toBe(m2);
  });
});
