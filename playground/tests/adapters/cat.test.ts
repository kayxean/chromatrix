import { describe, expect, it } from 'vitest';
import { multiplyMatrixVector, xyz50ToXyz65, xyz65ToXyz50 } from '../../adapters/cat';
import { createColor, dropColor, getSharedBuffer } from '../../shared';

describe('CAT Adapters (Bradford Transform)', () => {
  it('should round-trip XYZ values with minimal error', () => {
    const color = createColor('xyz65', [0.5, 0.5, 0.5]);
    const buf = getSharedBuffer();
    const idx = color.index;

    xyz65ToXyz50(buf, idx);
    xyz50ToXyz65(buf, idx);

    expect(buf[idx]).toBeCloseTo(0.5, 5);
    expect(buf[idx + 1]).toBeCloseTo(0.5, 5);
    expect(buf[idx + 2]).toBeCloseTo(0.5, 5);

    dropColor(color);
  });

  it('should transform D65 white point to D50 white point', () => {
    const color = createColor('xyz65', [0.95047, 1.0, 1.08883]);
    const buf = getSharedBuffer();
    const idx = color.index;

    xyz65ToXyz50(buf, idx);

    expect(buf[idx]).toBeCloseTo(0.96422, 4);
    expect(buf[idx + 1]).toBeCloseTo(1.0, 4);
    expect(buf[idx + 2]).toBeCloseTo(0.82521, 4);

    dropColor(color);
  });

  it('should support in-place multiplication', () => {
    const color = createColor('xyz65', [0.2, 0.4, 0.6]);
    const buf = getSharedBuffer();
    const idx = color.index;

    const expected = createColor('xyz50', [0, 0, 0]);
    const expIdx = expected.index;

    xyz65ToXyz50(buf, idx);
    xyz65ToXyz50(buf, idx);

    expect(buf[idx]).toBeCloseTo(buf[expIdx], 10);
    expect(buf[idx + 1]).toBeCloseTo(buf[expIdx + 1], 10);
    expect(buf[idx + 2]).toBeCloseTo(buf[expIdx + 2], 10);

    dropColor(color);
    dropColor(expected);
  });

  it('multiplyMatrixVector should calculate correctly', () => {
    const matrix = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const vector = createColor('xyz65', [1, 1, 1]);
    const buf = getSharedBuffer();
    const idx = vector.index;

    multiplyMatrixVector(matrix, buf, idx);

    expect(buf[idx]).toBe(6);
    expect(buf[idx + 1]).toBe(15);
    expect(buf[idx + 2]).toBe(24);

    dropColor(vector);
  });
});
