import { describe, expect, it } from 'vitest';
import { labToXyz50, xyz50ToLab } from '~/adapters/d50';
import { createMatrix, dropMatrix } from '~/shared';

describe('D50 Adapters (XYZ <-> Lab)', () => {
  it('should round-trip standard colors (above epsilon)', () => {
    const original = createMatrix('xyz50');
    original.set([0.4, 0.5, 0.3]);

    const mid = createMatrix('lab');
    const result = createMatrix('xyz50');

    xyz50ToLab(original, mid);
    labToXyz50(mid, result);

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

    xyz50ToLab(d50White, lab);

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

    expect(lab[0]).toBe(0);
    expect(lab[1]).toBe(0);
    expect(lab[2]).toBe(0);

    dropMatrix(black);
    dropMatrix(lab);
  });

  it('should trigger linear slopes (below epsilon) for coverage', () => {
    const darkXYZ = createMatrix('xyz50');
    darkXYZ.set([0.005, 0.005, 0.005]);

    const lab = createMatrix('lab');
    const backToXYZ = createMatrix('xyz50');

    xyz50ToLab(darkXYZ, lab);
    labToXyz50(lab, backToXYZ);

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

    labToXyz50(copy, expected);

    labToXyz50(data, data);

    expect(data[0]).toBe(expected[0]);
    expect(data[1]).toBe(expected[1]);
    expect(data[2]).toBe(expected[2]);

    dropMatrix(data);
    dropMatrix(copy);
    dropMatrix(expected);
  });
});
