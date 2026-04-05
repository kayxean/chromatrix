import { describe, it, expect, beforeEach } from 'vitest';
import { createMatrix, dropMatrix, clearPool } from '~/matrix';

describe('createMatrix', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should return a Float32Array of length 3', () => {
    const matrix = createMatrix();
    expect(matrix).toBeInstanceOf(Float32Array);
    expect(matrix).toHaveLength(3);
  });

  it('should reuse an array from the pool if available', () => {
    const initial = createMatrix();
    dropMatrix(initial);

    const reused = createMatrix();
    expect(reused).toBe(initial);
  });

  it('should create a new array if the pool is empty', () => {
    const m1 = createMatrix();
    const m2 = createMatrix();
    expect(m1).not.toBe(m2);
  });
});
