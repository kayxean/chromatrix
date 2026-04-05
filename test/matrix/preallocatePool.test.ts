import { beforeEach, describe, expect, it } from 'vitest';
import { clearPool, createMatrix, dropMatrix, preallocatePool } from '~/matrix';

describe('preallocatePool()', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should preallocate matrices into the pool', () => {
    preallocatePool(5);

    const matrices: Float32Array[] = [];
    for (let i = 0; i < 5; i++) {
      matrices.push(createMatrix('rgb'));
    }

    matrices.forEach((m, _i) => {
      expect(m).toBeInstanceOf(Float32Array);
      expect(m.length).toBe(3);
    });
  });

  it('should cap at MAX_POOL_SIZE', () => {
    preallocatePool(300);

    const m1 = createMatrix('rgb');
    dropMatrix(m1);
    const m2 = createMatrix('rgb');
    expect(m2).toBe(m1);
  });
});
