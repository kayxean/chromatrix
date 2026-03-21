import { describe, expect, it } from 'vitest';
import { lrgbToXyz65, oklabToXyz65, xyz65ToLrgb, xyz65ToOklab } from '~/adapters/d65';
import { createMatrix, dropMatrix } from '~/shared';

describe('D65 Adapters (LRGB & Oklab)', () => {
  describe('Linear RGB transforms', () => {
    it('should round-trip Linear RGB via XYZ D65', () => {
      const original = createMatrix('lrgb');
      original.set([0.2, 0.5, 0.9]);

      const mid = createMatrix('xyz65');
      const result = createMatrix('lrgb');

      lrgbToXyz65(original, mid);
      xyz65ToLrgb(mid, result);

      expect(result[0]).toBeCloseTo(original[0], 5);
      expect(result[1]).toBeCloseTo(original[1], 5);
      expect(result[2]).toBeCloseTo(original[2], 5);

      dropMatrix(original);
      dropMatrix(mid);
      dropMatrix(result);
    });

    it('should transform D65 white point to LRGB [1, 1, 1]', () => {
      const d65White = createMatrix('xyz65');
      d65White.set([0.95047, 1.0, 1.08883]);

      const lrgb = createMatrix('lrgb');
      xyz65ToLrgb(d65White, lrgb);

      expect(lrgb[0]).toBeCloseTo(1.0, 4);
      expect(lrgb[1]).toBeCloseTo(1.0, 4);
      expect(lrgb[2]).toBeCloseTo(1.0, 4);

      dropMatrix(d65White);
      dropMatrix(lrgb);
    });
  });

  describe('Oklab transforms', () => {
    it('should round-trip standard colors through Oklab', () => {
      const original = createMatrix('xyz65');
      original.set([0.3, 0.4, 0.5]);

      const mid = createMatrix('oklab');
      const result = createMatrix('xyz65');

      xyz65ToOklab(original, mid);
      oklabToXyz65(mid, result);

      expect(result[0]).toBeCloseTo(original[0], 5);
      expect(result[1]).toBeCloseTo(original[1], 5);
      expect(result[2]).toBeCloseTo(original[2], 5);

      dropMatrix(original);
      dropMatrix(mid);
      dropMatrix(result);
    });

    it('should handle the neutral axis (gray) correctly in Oklab', () => {
      const grayXYZ = createMatrix('xyz65');
      grayXYZ.set([0.95047 * 0.5, 1.0 * 0.5, 1.08883 * 0.5]);

      const oklab = createMatrix('oklab');
      xyz65ToOklab(grayXYZ, oklab);

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

      xyz65ToOklab(copy, expected);

      xyz65ToOklab(data, data);

      expect(data[0]).toBe(expected[0]);
      expect(data[1]).toBe(expected[1]);
      expect(data[2]).toBe(expected[2]);

      dropMatrix(data);
      dropMatrix(copy);
      dropMatrix(expected);
    });
  });
});
