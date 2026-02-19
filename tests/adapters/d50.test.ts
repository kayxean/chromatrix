import { describe, expect, it } from 'vitest';
import { labToXyz50, xyz50ToLab } from '~/adapters/d50';
import { createMatrix, dropMatrix } from '~/shared';

describe('D50 Adapters (XYZ <-> Lab)', () => {
  it('should round-trip standard colors (above epsilon)', () => {
    // Utilize pooled buffers for standard gamut coordinates
    const original = createMatrix('xyz50');
    original.set([0.4, 0.5, 0.3]);

    const mid = createMatrix('lab');
    const result = createMatrix('xyz50');

    // Convert from XYZ D50 to Lab and back
    xyz50ToLab(original, mid);
    labToXyz50(mid, result);

    // Verify that the cube root/power transforms maintain high-precision accuracy
    expect(result[0]).toBeCloseTo(original[0], 6);
    expect(result[1]).toBeCloseTo(original[1], 6);
    expect(result[2]).toBeCloseTo(original[2], 6);

    dropMatrix(original);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should handle the D50 white point correctly', () => {
    const d50White = createMatrix('xyz50');
    d50White.set([0.96422, 1.0, 0.82521]);

    const lab = createMatrix('lab');

    // Transform the reference white point for D50
    xyz50ToLab(d50White, lab);

    // In CIELAB, the reference white point must always result in L=100 and zeroed chromaticity (a=0, b=0)
    expect(lab[0]).toBeCloseTo(100, 4);
    expect(lab[1]).toBeCloseTo(0, 4);
    expect(lab[2]).toBeCloseTo(0, 4);

    dropMatrix(d50White);
    dropMatrix(lab);
  });

  it('should handle absolute black correctly', () => {
    const black = createMatrix('xyz50');
    black.set([0, 0, 0]);

    const lab = createMatrix('lab');

    xyz50ToLab(black, lab);

    // Absence of light should result in a total zero state in Lab space
    expect(lab[0]).toBe(0);
    expect(lab[1]).toBe(0);
    expect(lab[2]).toBe(0);

    dropMatrix(black);
    dropMatrix(lab);
  });

  it('should trigger linear slopes (below epsilon) for coverage', () => {
    /** * CIE 1976 constants specify a linear transition for values below EPSILON (~0.008856).
     * This test targets very dark colors to ensure the linear branch logic is fully exercised.
     */
    const darkXYZ = createMatrix('xyz50');
    darkXYZ.set([0.005, 0.005, 0.005]);

    const lab = createMatrix('lab');
    const backToXYZ = createMatrix('xyz50');

    // Convert through the linear zone
    xyz50ToLab(darkXYZ, lab);
    labToXyz50(lab, backToXYZ);

    // Ensure the linear slope coefficients match correctly in both directions
    expect(backToXYZ[0]).toBeCloseTo(darkXYZ[0], 6);
    expect(backToXYZ[1]).toBeCloseTo(darkXYZ[1], 6);
    expect(backToXYZ[2]).toBeCloseTo(darkXYZ[2], 6);

    dropMatrix(darkXYZ);
    dropMatrix(lab);
    dropMatrix(backToXYZ);
  });

  it('should support in-place mutation for Lab to XYZ', () => {
    const data = createMatrix('lab');
    data.set([50, 20, 10]);

    const copy = createMatrix('lab');
    copy.set(data);

    const expected = createMatrix('xyz50');

    // Establish a reference result using a separate buffer
    labToXyz50(copy, expected);

    // Perform the transform using the same buffer for input and output.
    // This confirms that calculations for L, a, and b don't interfere with each other during mutation.
    labToXyz50(data, data);

    expect(data[0]).toBe(expected[0]);
    expect(data[1]).toBe(expected[1]);
    expect(data[2]).toBe(expected[2]);

    dropMatrix(data);
    dropMatrix(copy);
    dropMatrix(expected);
  });
});
