import type { ColorArray } from '~/types';
import { describe, expect, it } from 'vitest';
import { multiplyMatrixVector } from '~/adapters/cat';

describe('multiplyMatrixVector()', () => {
  it('should multiply a 3x3 matrix by a 3-element vector', () => {
    const matrix = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const input = new Float32Array([1, 1, 1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    multiplyMatrixVector(matrix, input, output);

    expect(output[0]).toBe(6);
    expect(output[1]).toBe(15);
    expect(output[2]).toBe(24);
  });

  it('should handle zero vector', () => {
    const matrix = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    multiplyMatrixVector(matrix, input, output);

    expect(output[0]).toBe(0);
    expect(output[1]).toBe(0);
    expect(output[2]).toBe(0);
  });

  it('should support in-place operation', () => {
    const matrix = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    const input = new Float32Array([1, 2, 3]) as ColorArray;

    multiplyMatrixVector(matrix, input, input);

    expect(input[0]).toBe(1);
    expect(input[1]).toBe(2);
    expect(input[2]).toBe(3);
  });
});
