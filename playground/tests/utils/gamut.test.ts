import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../../shared';
import { clampColor, checkGamut } from '../../utils/gamut';

describe('Gamut Utilities (gamut.ts)', () => {
  describe('clampColor', () => {
    it('should clamp standard RGB values', () => {
      const color = createColor('rgb', [1.5, -0.2, 0.5]);

      clampColor(color);

      expect(color.value[0]).toBe(1);
      expect(color.value[1]).toBe(0);
      expect(color.value[2]).toBe(0.5);

      dropColor(color);
    });

    it('should normalize hue-based spaces (360 wrap-around)', () => {
      const color = createColor('hsl', [-40, 0.5, 0.5]);

      clampColor(color);

      expect(color.value[0]).toBe(320);

      color.value[0] = 400;
      clampColor(color);
      expect(color.value[0]).toBe(40);

      dropColor(color);
    });

    it('should return original reference (always in-place)', () => {
      const color = createColor('rgb', [2, 2, 2]);

      const result = clampColor(color);

      expect(result).toBe(color);

      dropColor(color);
    });
  });

  describe('checkGamut', () => {
    it('should return true for valid colors', () => {
      const color = createColor('rgb', [0.5, 0.5, 0.5]);
      expect(checkGamut(color)).toBe(true);

      dropColor(color);
    });

    it('should return false for colors outside gamut bounds', () => {
      const color = createColor('oklab', [0.5, 0.8, 0]);
      expect(checkGamut(color)).toBe(false);

      dropColor(color);
    });

    it('should ignore circular dimensions (Hue)', () => {
      const color = createColor('oklch', [0.5, 0.2, 720]);
      expect(checkGamut(color)).toBe(true);

      dropColor(color);
    });

    it('should respect the tolerance parameter', () => {
      const color = createColor('rgb', [1.00005, 0, 0]);

      expect(checkGamut(color, 0.00001)).toBe(false);
      expect(checkGamut(color, 0.001)).toBe(true);

      dropColor(color);
    });

    it('should return true for unknown spaces', () => {
      const color = createColor('rgb', [0.5, 0.5, 0.5]);
      (color as { space: string }).space = 'mystical-space';

      expect(checkGamut(color)).toBe(true);

      dropColor(color);
    });
  });
});
