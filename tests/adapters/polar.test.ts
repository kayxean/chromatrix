import { describe, expect, it } from 'vitest';
import {
  labToLch,
  lchToLab,
  oklabToOklch,
  oklchToOklab,
} from '~/adapters/polar';
import { createMatrix, dropMatrix } from '~/shared';

describe('Polar Adapters (Lab/Oklab <-> LCH/Oklch)', () => {
  it('should convert Cartesian to Polar (positive hue)', () => {
    // Convert Lab (rectangular) to LCH (cylindrical)
    const input = createMatrix('lab');
    // Set a=10, b=10: This falls in Quadrant 1 (45 degrees)
    input.set([50, 10, 10]);

    const output = createMatrix('lch');
    labToLch(input, output);

    // Lightness (L) remains unchanged
    expect(output[0]).toBe(50);
    // Chroma (C) is the hypotenuse: sqrt(a^2 + b^2)
    expect(output[1]).toBeCloseTo(Math.sqrt(200), 6);
    // Hue (H) is the angle: atan2(b, a) converted to degrees
    expect(output[2]).toBeCloseTo(45, 6);

    dropMatrix(input);
    dropMatrix(output);
  });

  it('should handle negative hue branch in toPolar', () => {
    /**
     * Testing the hue normalization branch:
     * With a=10, b=-10 (Quadrant 4), atan2 returns -45 degrees.
     * The logic must add 360 to normalize the angle to the [0, 360) range.
     */
    const input = createMatrix('oklab');
    input.set([60, 10, -10]);

    const output = createMatrix('oklch');
    oklabToOklch(input, output);

    expect(output[2]).toBe(315); // -45 + 360

    dropMatrix(input);
    dropMatrix(output);
  });

  it('should round-trip Polar to Cartesian', () => {
    // Convert LCH back to Lab
    const original = createMatrix('lch');
    original.set([70, 25, 180]); // 180 degrees points directly along the negative 'a' axis

    const mid = createMatrix('lab');
    const result = createMatrix('lch');

    lchToLab(original, mid);

    // Verify intermediate Cartesian values: a = C * cos(H), b = C * sin(H)
    expect(mid[1]).toBeCloseTo(-25, 6);
    expect(mid[2]).toBeCloseTo(0, 6);

    labToLch(mid, result);

    // Ensure the round-trip preserves all polar components
    expect(result[0]).toBeCloseTo(original[0], 6);
    expect(result[1]).toBeCloseTo(original[1], 6);
    expect(result[2]).toBeCloseTo(original[2], 6);

    dropMatrix(original);
    dropMatrix(mid);
    dropMatrix(result);
  });

  it('should correctly map Oklab named aliases', () => {
    /**
     * Verifies that the Oklab-specific polar transforms function identically
     * to the CIELAB ones while maintaining their own space branding.
     */
    const input = createMatrix('oklab');
    input.set([1, 0.1, 0.1]);
    const output = createMatrix('oklch');

    oklabToOklch(input, output);

    const back = createMatrix('oklab');
    oklchToOklab(output, back);

    expect(back[0]).toBeCloseTo(input[0], 6);
    expect(back[1]).toBeCloseTo(input[1], 6);
    expect(back[2]).toBeCloseTo(input[2], 6);

    dropMatrix(input);
    dropMatrix(output);
    dropMatrix(back);
  });
});
