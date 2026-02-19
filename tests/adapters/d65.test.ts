import { describe, expect, it } from 'vitest';
import {
  lrgbToXyz65,
  oklabToXyz65,
  xyz65ToLrgb,
  xyz65ToOklab,
} from '~/adapters/d65';
import { createMatrix, dropMatrix } from '~/shared';

describe('D65 Adapters (LRGB & Oklab)', () => {
  /**
   * Linear RGB <-> XYZ D65
   * These transforms use the standard sRGB/Rec.709 color primaries
   * referenced against the D65 daylight illuminant.
   */
  describe('Linear RGB transforms', () => {
    it('should round-trip Linear RGB via XYZ D65', () => {
      const original = createMatrix('lrgb');
      original.set([0.2, 0.5, 0.9]);

      const mid = createMatrix('xyz65');
      const result = createMatrix('lrgb');

      // Convert from LRGB to the D65 XYZ hub and back
      lrgbToXyz65(original, mid);
      xyz65ToLrgb(mid, result);

      // Verify that the forward and inverse matrices are mathematically sound
      expect(result[0]).toBeCloseTo(original[0], 5);
      expect(result[1]).toBeCloseTo(original[1], 5);
      expect(result[2]).toBeCloseTo(original[2], 5);

      dropMatrix(original);
      dropMatrix(mid);
      dropMatrix(result);
    });

    it('should transform D65 white point to LRGB [1, 1, 1]', () => {
      const d65White = createMatrix('xyz65');
      // Standard CIE D65 coordinates
      d65White.set([0.95047, 1.0, 1.08883]);

      const lrgb = createMatrix('lrgb');
      xyz65ToLrgb(d65White, lrgb);

      // In sRGB, the white point must map to unity across all channels
      expect(lrgb[0]).toBeCloseTo(1.0, 4);
      expect(lrgb[1]).toBeCloseTo(1.0, 4);
      expect(lrgb[2]).toBeCloseTo(1.0, 4);

      dropMatrix(d65White);
      dropMatrix(lrgb);
    });
  });

  /**
   * Oklab <-> XYZ D65
   * Oklab is a perceptually uniform color space designed by Björn Ottosson.
   * It operates on a D65 white point and uses a non-linear LMS cone response model.
   */
  describe('Oklab transforms', () => {
    it('should round-trip standard colors through Oklab', () => {
      const original = createMatrix('xyz65');
      original.set([0.3, 0.4, 0.5]);

      const mid = createMatrix('oklab');
      const result = createMatrix('xyz65');

      // XYZ -> LMS -> Cube Root -> Oklab (and reverse)
      xyz65ToOklab(original, mid);
      oklabToXyz65(mid, result);

      // Verify cubic round-trip accuracy remains stable
      expect(result[0]).toBeCloseTo(original[0], 5);
      expect(result[1]).toBeCloseTo(original[1], 5);
      expect(result[2]).toBeCloseTo(original[2], 5);

      dropMatrix(original);
      dropMatrix(mid);
      dropMatrix(result);
    });

    it('should handle the neutral axis (gray) correctly in Oklab', () => {
      const grayXYZ = createMatrix('xyz65');
      // Create a 50% gray based on D65 reference white
      grayXYZ.set([0.95047 * 0.5, 1.0 * 0.5, 1.08883 * 0.5]);

      const oklab = createMatrix('oklab');
      xyz65ToOklab(grayXYZ, oklab);

      /**
       * Oklab is perceptually accurate but can be numerically sensitive for neutral grays.
       * 'a' and 'b' (chromaticity) should be zero for any color on the neutral axis.
       */
      expect(oklab[1]).toBeCloseTo(0, 3);
      expect(oklab[2]).toBeCloseTo(0, 3);

      dropMatrix(grayXYZ);
      dropMatrix(oklab);
    });

    it('should handle absolute black correctly in Oklab', () => {
      const black = createMatrix('xyz65');
      black.set([0, 0, 0]);

      const oklab = createMatrix('oklab');
      xyz65ToOklab(black, oklab);

      // Perceptual lightness and chromaticity should all be zero for black
      expect(oklab[0]).toBe(0);
      expect(oklab[1]).toBe(0);
      expect(oklab[2]).toBe(0);

      dropMatrix(black);
      dropMatrix(oklab);
    });

    it('should support in-place mutation for Oklab transforms', () => {
      const data = createMatrix('xyz65');
      data.set([0.5, 0.5, 0.5]);

      const copy = createMatrix('xyz65');
      copy.set(data);

      const expected = createMatrix('oklab');

      // Get baseline result from a separate buffer
      xyz65ToOklab(copy, expected);

      // Perform mutation on the same buffer
      xyz65ToOklab(data, data);

      // Validate that intermediate LMS transforms didn't corrupt the data
      expect(data[0]).toBe(expected[0]);
      expect(data[1]).toBe(expected[1]);
      expect(data[2]).toBe(expected[2]);

      dropMatrix(data);
      dropMatrix(copy);
      dropMatrix(expected);
    });
  });
});
