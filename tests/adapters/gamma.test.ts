import { describe, expect, it } from 'vitest';
import { lrgbToRgb, rgbToLrgb } from '~/adapters/gamma';
import { createMatrix, dropMatrix } from '~/shared';

describe('Gamma Adapters (sRGB Transfer Functions)', () => {
  it('should round-trip standard colors (power-curve zone)', () => {
    // Standard gamut colors typically fall into the non-linear exponential zone
    const original = createMatrix('rgb');
    original.set([0.8, 0.4, 0.2]);

    const mid = createMatrix('lrgb');
    const result = createMatrix('rgb');

    // Convert from non-linear sRGB to Linear RGB and back
    rgbToLrgb(original, mid);
    lrgbToRgb(mid, result);

    // Ensure the gamma 2.4 power-curve approximation maintains symmetry
    expect(result[0]).toBeCloseTo(original[0], 6);
    expect(result[1]).toBeCloseTo(original[1], 6);
    expect(result[2]).toBeCloseTo(original[2], 6);

    dropMatrix(original);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should trigger linear slope for very dark colors (linear zone)', () => {
    /**
     * The sRGB specification uses a linear "toe" for values <= 0.04045 (encoded).
     * This prevents the slope of the curve from becoming infinite at zero.
     */
    const darkRgb = createMatrix('rgb');
    darkRgb.set([0.01, 0.02, 0.03]);

    const mid = createMatrix('lrgb');
    const result = createMatrix('rgb');

    // Convert through the linear slope section (divided by 12.92)
    rgbToLrgb(darkRgb, mid);
    lrgbToRgb(mid, result);

    // Verify the linear-to-linear mapping is accurate
    expect(result[0]).toBeCloseTo(darkRgb[0], 6);
    expect(result[1]).toBeCloseTo(darkRgb[1], 6);
    expect(result[2]).toBeCloseTo(darkRgb[2], 6);

    dropMatrix(darkRgb);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should clamp negative linear values to zero', () => {
    /**
     * Out-of-bounds negative values in Linear RGB are physically impossible
     * in this model and must be clamped to 0 to avoid NaN results during
     * fractional exponentiation (e.g., trying to raise a negative to 1/2.4).
     */
    const negativeLrgb = createMatrix('lrgb');
    negativeLrgb.set([-0.1, -0.5, -1.0]);

    const result = createMatrix('rgb');

    // Perform inverse gamma with safety clamping
    lrgbToRgb(negativeLrgb, result);

    expect(result[0]).toBe(0);
    expect(result[1]).toBe(0);
    expect(result[2]).toBe(0);

    dropMatrix(negativeLrgb);
    dropMatrix(result);
  });

  it('should handle absolute white and black points', () => {
    const input = createMatrix('rgb');
    const output = createMatrix('lrgb');

    // sRGB and Linear RGB are both normalized so that 0 is black and 1 is white

    // Black point: 0^2.4 = 0
    input.set([0, 0, 0]);
    rgbToLrgb(input, output);
    expect(output[0]).toBe(0);

    // White point: 1^2.4 = 1
    input.set([1, 1, 1]);
    rgbToLrgb(input, output);
    expect(output[0]).toBe(1);

    dropMatrix(input);
    dropMatrix(output);
  });
});
