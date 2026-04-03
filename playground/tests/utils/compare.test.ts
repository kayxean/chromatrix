import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../../shared';
import { isEqual, getDistance } from '../../utils/compare';

describe('Color Comparison Utilities (compare.ts)', () => {
  describe('isEqual', () => {
    it('should return true for identical color references', () => {
      const color = createColor('rgb', [1, 0, 0]);

      expect(isEqual(color, color)).toBe(true);

      dropColor(color);
    });

    it('should compare colors in the same space within tolerance', () => {
      const a = createColor('rgb', [0.5, 0.5, 0.5]);
      const b = createColor('rgb', [0.50001, 0.5, 0.5]);

      expect(isEqual(a, b)).toBe(true);
      expect(isEqual(a, b, 0.000001)).toBe(false);

      dropColor(a);
      dropColor(b);
    });

    it('should compare colors across different spaces', () => {
      const a = createColor('rgb', [1, 1, 1]);
      const b = createColor('hsl', [0, 0, 1]);

      expect(isEqual(a, b)).toBe(true);

      dropColor(a);
      dropColor(b);
    });

    it('should respect alpha differences', () => {
      const a = createColor('rgb', [0, 0, 0], 1);
      const b = createColor('rgb', [0, 0, 0], 0.99);

      expect(isEqual(a, b)).toBe(false);
      expect(isEqual(a, b, 0.1)).toBe(true);

      dropColor(a);
      dropColor(b);
    });
  });

  describe('getDistance', () => {
    it('should return 0 for the same color', () => {
      const color = createColor('rgb', [0.2, 0.4, 0.6]);

      expect(getDistance(color, color)).toBe(0);

      dropColor(color);
    });

    it('should calculate Euclidean distance in Oklab space', () => {
      const a = createColor('oklab', [0.5, 0, 0]);
      const b = createColor('oklab', [0.6, 0, 0]);

      expect(getDistance(a, b)).toBeCloseTo(0.1);

      dropColor(a);
      dropColor(b);
    });

    it('should handle cross-space distance calculations', () => {
      const a = createColor('rgb', [0, 0, 0]);
      const b = createColor('oklab', [1, 0, 0]);

      expect(getDistance(a, b)).toBeCloseTo(1.0);

      dropColor(a);
      dropColor(b);
    });

    it('should be perceptually consistent (Red vs Pink)', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const pink = createColor('rgb', [1, 0.5, 0.5]);
      const blue = createColor('rgb', [0, 0, 1]);

      const distRedPink = getDistance(red, pink);
      const distRedBlue = getDistance(red, blue);

      expect(distRedPink).toBeLessThan(distRedBlue);

      dropColor(red);
      dropColor(pink);
      dropColor(blue);
    });
  });
});
