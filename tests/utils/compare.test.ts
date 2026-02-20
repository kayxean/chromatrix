import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createMatrix, dropMatrix } from '~/shared';
import { getDistance, isEqual } from '~/utils/compare';

describe('Color Comparison Utilities (compare.ts)', () => {
  describe('isEqual', () => {
    it('should return true for identical color references', () => {
      const val = createMatrix('rgb');
      val.set([1, 0, 0]);
      const color: Color = { space: 'rgb', value: val };

      expect(isEqual(color, color)).toBe(true);
      dropMatrix(val);
    });

    it('should compare colors in the same space within tolerance', () => {
      const v1 = createMatrix('rgb');
      const v2 = createMatrix('rgb');
      v1.set([0.5, 0.5, 0.5]);
      v2.set([0.50001, 0.5, 0.5]);

      const a: Color = { space: 'rgb', value: v1 };
      const b: Color = { space: 'rgb', value: v2 };

      // Should be equal with default tolerance (0.0001)
      expect(isEqual(a, b)).toBe(true);
      // Should be unequal with strict tolerance
      expect(isEqual(a, b, 0.000001)).toBe(false);

      dropMatrix(v1);
      dropMatrix(v2);
    });

    it('should compare colors across different spaces', () => {
      const vRgb = createMatrix('rgb');
      const vHsl = createMatrix('hsl');

      // White in RGB
      vRgb.set([1, 1, 1]);
      // White in HSL (any hue, 0% saturation, 100% lightness)
      vHsl.set([0, 0, 1]);

      const a: Color = { space: 'rgb', value: vRgb };
      const b: Color = { space: 'hsl', value: vHsl };

      expect(isEqual(a, b)).toBe(true);

      dropMatrix(vRgb);
      dropMatrix(vHsl);
    });

    it('should respect alpha differences', () => {
      const v = createMatrix('rgb');
      v.set([0, 0, 0]);

      const a: Color = { space: 'rgb', value: v, alpha: 1 };
      const b: Color = { space: 'rgb', value: v, alpha: 0.99 };

      expect(isEqual(a, b)).toBe(false);
      expect(isEqual(a, b, 0.1)).toBe(true);

      dropMatrix(v);
    });
  });

  describe('getDistance', () => {
    it('should return 0 for the same color', () => {
      const v = createMatrix('rgb');
      v.set([0.2, 0.4, 0.6]);
      const color: Color = { space: 'rgb', value: v };

      expect(getDistance(color, color)).toBe(0);
      dropMatrix(v);
    });

    it('should calculate Euclidean distance in Oklab space', () => {
      const v1 = createMatrix('oklab');
      const v2 = createMatrix('oklab');

      // Distance of 0.1 along the L axis
      v1.set([0.5, 0, 0]);
      v2.set([0.6, 0, 0]);

      const a: Color = { space: 'oklab', value: v1 };
      const b: Color = { space: 'oklab', value: v2 };

      expect(getDistance(a, b)).toBeCloseTo(0.1);

      dropMatrix(v1);
      dropMatrix(v2);
    });

    it('should handle cross-space distance calculations (Oklab bypass)', () => {
      const vRgb = createMatrix('rgb');
      const vOklab = createMatrix('oklab');

      // Black in RGB
      vRgb.set([0, 0, 0]);
      // White in Oklab (L=1)
      vOklab.set([1, 0, 0]);

      const a: Color = { space: 'rgb', value: vRgb };
      const b: Color = { space: 'oklab', value: vOklab };

      // The distance between pure black and pure white in Oklab is exactly 1.0
      expect(getDistance(a, b)).toBeCloseTo(1.0);

      dropMatrix(vRgb);
      dropMatrix(vOklab);
    });

    it('should be perceptually consistent (Red vs Pink)', () => {
      const redVal = createMatrix('rgb');
      const pinkVal = createMatrix('rgb');
      const blueVal = createMatrix('rgb');

      redVal.set([1, 0, 0]);
      pinkVal.set([1, 0.5, 0.5]);
      blueVal.set([0, 0, 1]);

      const red: Color = { space: 'rgb', value: redVal };
      const pink: Color = { space: 'pink' as any, value: pinkVal };
      const blue: Color = { space: 'blue' as any, value: blueVal };

      const distRedPink = getDistance(red, pink);
      const distRedBlue = getDistance(red, blue);

      // Red is perceptually closer to Pink than to Blue
      expect(distRedPink).toBeLessThan(distRedBlue);

      dropMatrix(redVal);
      dropMatrix(pinkVal);
      dropMatrix(blueVal);
    });
  });
});
