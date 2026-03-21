import { describe, expect, it } from 'vitest';
import { multiplyMatrixVector, xyz50ToXyz65, xyz65ToXyz50 } from '~/adapters/cat';
import { createMatrix, dropMatrix } from '~/shared';

describe('CAT Adapters (Bradford Transform)', () => {
  it('should round-trip XYZ values with minimal error', () => {
    const original = createMatrix('xyz65');
    original.set([0.5, 0.5, 0.5]);

    const mid = createMatrix('xyz50');
    const result = createMatrix('xyz65');

    xyz65ToXyz50(original, mid);
    xyz50ToXyz65(mid, result);

    expect(result[0]).toBeCloseTo(original[0], 5);
    expect(result[1]).toBeCloseTo(original[1], 5);
    expect(result[2]).toBeCloseTo(original[2], 5);

    dropMatrix(original);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should transform D65 white point to D50 white point', () => {
    const d65White = createMatrix('xyz65');
    d65White.set([0.95047, 1.0, 1.08883]);

    const output = createMatrix('xyz50');

    xyz65ToXyz50(d65White, output);

    expect(output[0]).toBeCloseTo(0.96422, 4);
    expect(output[1]).toBeCloseTo(1.0, 4);
    expect(output[2]).toBeCloseTo(0.82521, 4);

    dropMatrix(d65White);
    dropMatrix(output);
  });

  it('should support in-place multiplication', () => {
    const data = createMatrix('xyz65');
    data.set([0.2, 0.4, 0.6]);

    const expected = createMatrix('xyz50');

    xyz65ToXyz50(data, expected);

    xyz65ToXyz50(data, data);

    expect(data[0]).toBe(expected[0]);
    expect(data[1]).toBe(expected[1]);
    expect(data[2]).toBe(expected[2]);

    dropMatrix(data);
    dropMatrix(expected);
  });

  it('multiplyMatrixVector should calculate correctly', () => {
    const matrix = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const vector = createMatrix('xyz65');
    vector.set([1, 1, 1]);

    const output = createMatrix('xyz65');

    multiplyMatrixVector(matrix, vector, output);

    expect(output[0]).toBe(6);
    expect(output[1]).toBe(15);
    expect(output[2]).toBe(24);

    dropMatrix(vector);
    dropMatrix(output);
  });
});
