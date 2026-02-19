import { describe, expect, it } from 'vitest';
import {
  multiplyMatrixVector,
  xyz50ToXyz65,
  xyz65ToXyz50,
} from '~/adapters/cat';
import { createMatrix, dropMatrix } from '~/shared';

describe('CAT Adapters (Bradford Transform)', () => {
  /**
   * Chromatic Adaptation Transform (CAT) verification.
   * Standard reference values for white points:
   * - XYZ D65: [0.95047, 1.00000, 1.08883]
   * - XYZ D50: [0.96422, 1.00000, 0.82521]
   */

  it('should round-trip XYZ values with minimal error', () => {
    // Initialize matrices from the pool to avoid GC pressure
    const original = createMatrix('xyz65');
    original.set([0.5, 0.5, 0.5]);

    const mid = createMatrix('xyz50');
    const result = createMatrix('xyz65');

    // Perform forward and inverse transforms: D65 -> D50 -> D65
    xyz65ToXyz50(original, mid);
    xyz50ToXyz65(mid, result);

    // Ensure precision remains stable within 5 decimal places after the round-trip
    expect(result[0]).toBeCloseTo(original[0], 5);
    expect(result[1]).toBeCloseTo(original[1], 5);
    expect(result[2]).toBeCloseTo(original[2], 5);

    // Return buffers to the pool for reuse
    dropMatrix(original);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should transform D65 white point to D50 white point', () => {
    const d65White = createMatrix('xyz65');
    d65White.set([0.95047, 1.0, 1.08883]);

    const output = createMatrix('xyz50');

    // Transform the actual D65 illuminant to D50
    xyz65ToXyz50(d65White, output);

    // Validate against standard D50 constants to confirm Bradford matrix accuracy
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

    // Calculate reference values in a separate buffer
    xyz65ToXyz50(data, expected);

    // Execute transform where input and output buffers are identical.
    // This verifies internal logic doesn't corrupt values during intermediate calculations.
    xyz65ToXyz50(data, data);

    expect(data[0]).toBe(expected[0]);
    expect(data[1]).toBe(expected[1]);
    expect(data[2]).toBe(expected[2]);

    dropMatrix(data);
    dropMatrix(expected);
  });

  it('multiplyMatrixVector should calculate correctly', () => {
    // Raw matrix utility test using a simple sequential 3x3 matrix
    const matrix = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const vector = createMatrix('xyz65');
    vector.set([1, 1, 1]);

    const output = createMatrix('xyz65');

    multiplyMatrixVector(matrix, vector, output);

    // Row-by-vector verification:
    // [1*1 + 2*1 + 3*1] = 6
    // [4*1 + 5*1 + 6*1] = 15
    // [7*1 + 8*1 + 9*1] = 24
    expect(output[0]).toBe(6);
    expect(output[1]).toBe(15);
    expect(output[2]).toBe(24);

    dropMatrix(vector);
    dropMatrix(output);
  });
});
