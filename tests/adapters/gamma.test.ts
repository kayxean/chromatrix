import { describe, expect, it } from 'vitest';
import { lrgbToRgb, rgbToLrgb } from '~/adapters/gamma';
import { createMatrix, dropMatrix } from '~/shared';

describe('Gamma Adapters (sRGB Transfer Functions)', () => {
  it('should round-trip standard colors (power-curve zone)', () => {
    const original = createMatrix('rgb');
    original.set([0.8, 0.4, 0.2]);

    const mid = createMatrix('lrgb');
    const result = createMatrix('rgb');

    rgbToLrgb(original, mid);
    lrgbToRgb(mid, result);

    expect(result[0]).toBeCloseTo(original[0], 6);
    expect(result[1]).toBeCloseTo(original[1], 6);
    expect(result[2]).toBeCloseTo(original[2], 6);

    dropMatrix(original);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should trigger linear slope for very dark colors (linear zone)', () => {
    const darkRgb = createMatrix('rgb');
    darkRgb.set([0.01, 0.02, 0.03]);

    const mid = createMatrix('lrgb');
    const result = createMatrix('rgb');

    rgbToLrgb(darkRgb, mid);
    lrgbToRgb(mid, result);

    expect(result[0]).toBeCloseTo(darkRgb[0], 6);
    expect(result[1]).toBeCloseTo(darkRgb[1], 6);
    expect(result[2]).toBeCloseTo(darkRgb[2], 6);

    dropMatrix(darkRgb);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should handle negative linear values using extended transfer function', () => {
    const negativeLrgb = createMatrix('lrgb');
    negativeLrgb.set([-0.1, -0.5, -1.0]);

    const result = createMatrix('rgb');

    lrgbToRgb(negativeLrgb, result);

    expect(result[0]).toBeCloseTo(-1.292, 2);
    expect(result[1]).toBeCloseTo(-6.46, 2);
    expect(result[2]).toBeCloseTo(-12.92, 2);

    dropMatrix(negativeLrgb);
    dropMatrix(result);
  });

  it('should handle absolute white and black points', () => {
    const input = createMatrix('rgb');
    const output = createMatrix('lrgb');

    input.set([0, 0, 0]);
    rgbToLrgb(input, output);
    expect(output[0]).toBe(0);

    input.set([1, 1, 1]);
    rgbToLrgb(input, output);
    expect(output[0]).toBe(1);

    dropMatrix(input);
    dropMatrix(output);
  });
});
