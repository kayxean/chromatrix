import { describe, expect, it } from 'vitest';
import { multiplyMatrixVector } from '~/adapters/cat';
import { createMockArray, createMockOutput } from '../../factory';

describe('multiplyMatrixVector()', () => {
  it('should multiply a 3x3 matrix by a 3-element vector', () => {
    const matrix = createMockArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const input = createMockArray([1, 1, 1]);
    const output = createMockOutput();

    multiplyMatrixVector(matrix, input, output);

    expect(output[0]).toBe(6);
    expect(output[1]).toBe(15);
    expect(output[2]).toBe(24);
  });

  it('should handle zero vector', () => {
    const matrix = createMockArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    multiplyMatrixVector(matrix, input, output);

    expect(output[0]).toBe(0);
    expect(output[1]).toBe(0);
    expect(output[2]).toBe(0);
  });

  it('should support in-place operation', () => {
    const matrix = createMockArray([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    const input = createMockArray([1, 2, 3]);

    multiplyMatrixVector(matrix, input, input);

    expect(input[0]).toBe(1);
    expect(input[1]).toBe(2);
    expect(input[2]).toBe(3);
  });
});
