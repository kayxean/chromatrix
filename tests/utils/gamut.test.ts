import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createMatrix, dropMatrix } from '~/shared';
import { checkGamut, clampColor } from '~/utils/gamut';

describe('Gamut Utilities (gamut.ts)', () => {
  describe('clampColor', () => {
    it('should clamp standard RGB values', () => {
      const v = createMatrix('rgb');
      v.set([1.5, -0.2, 0.5]);
      const color: Color = { space: 'rgb', value: v };

      clampColor(color);

      expect(v[0]).toBe(1);
      expect(v[1]).toBe(0);
      expect(v[2]).toBe(0.5);

      dropMatrix(v);
    });

    it('should normalize hue-based spaces (360 wrap-around)', () => {
      const v = createMatrix('hsl');
      v.set([-40, 0.5, 0.5]);

      const color: Color = { space: 'hsl', value: v };
      clampColor(color);

      expect(v[0]).toBe(320); // Negative wrap

      v.set([400, 0.5, 0.5]);
      clampColor(color);
      expect(v[0]).toBe(40); // Overflow wrap

      dropMatrix(v);
    });

    it('should respect the mutate flag', () => {
      const v = createMatrix('rgb');
      v.set([2, 2, 2]);
      const color: Color = { space: 'rgb', value: v };

      const result = clampColor(color, false);

      expect(v[0]).toBe(2); // Original untouched
      expect(result.value[0]).toBe(1); // New matrix clamped
      expect(result).not.toBe(color);

      dropMatrix(v);
      dropMatrix(result.value);
    });

    it('should return original reference for unknown spaces', () => {
      const v = createMatrix('rgb');
      const color = { space: 'unknown' as any, value: v };
      const result = clampColor(color);

      expect(result).toBe(color);
      dropMatrix(v);
    });

    it('should return a new object for unknown spaces when mutate is false', () => {
      // Ensures functional purity branch is covered when bounds are missing
      const v = createMatrix('rgb');
      const color = { space: 'unknown' as any, value: v, alpha: 0.8 };

      const result = clampColor(color, false);

      expect(result).not.toBe(color);
      expect(result.value).toBe(v); // Value reference remains since no clamping occurs

      dropMatrix(v);
    });
  });

  describe('checkGamut', () => {
    it('should return true for valid colors', () => {
      const v = createMatrix('rgb');
      v.set([0.5, 0.5, 0.5]);
      expect(checkGamut({ space: 'rgb', value: v })).toBe(true);
      dropMatrix(v);
    });

    it('should return false for colors outside gamut bounds', () => {
      const v = createMatrix('oklab');
      v.set([0.5, 0.8, 0]); // 'a' channel exceeds 0.4
      expect(checkGamut({ space: 'oklab', value: v })).toBe(false);
      dropMatrix(v);
    });

    it('should ignore circular dimensions (Hue)', () => {
      const v = createMatrix('oklch');
      v.set([0.5, 0.2, 720]); // Hue is effectively infinite
      expect(checkGamut({ space: 'oklch', value: v })).toBe(true);
      dropMatrix(v);
    });

    it('should respect the tolerance parameter', () => {
      const v = createMatrix('rgb');
      v.set([1.00005, 0, 0]);

      expect(checkGamut({ space: 'rgb', value: v }, 0.00001)).toBe(false);
      expect(checkGamut({ space: 'rgb', value: v }, 0.001)).toBe(true);

      dropMatrix(v);
    });

    it('should return true for unknown spaces', () => {
      // Default to true if the space has no defined clamping bounds
      const v = createMatrix('rgb');
      const color = { space: 'mystical-space' as any, value: v };

      expect(checkGamut(color)).toBe(true);

      dropMatrix(v);
    });
  });
});
