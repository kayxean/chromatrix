import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../../shared';
import {
  checkContrast,
  getContrastRating,
  matchContrast,
  checkContrastBulk,
} from '../../utils/contrast';

describe('Contrast Utilities (contrast.ts)', () => {
  describe('checkContrast', () => {
    it('should calculate contrast between white and black', () => {
      const white = createColor('rgb', [1, 1, 1]);
      const black = createColor('rgb', [0, 0, 0]);

      const result = checkContrast(white, black);

      expect(result).toBeGreaterThan(10);

      dropColor(white);
      dropColor(black);
    });

    it('should return 0 for identical colors', () => {
      const color = createColor('rgb', [0.5, 0.5, 0.5]);

      const result = checkContrast(color, color);

      expect(result).toBe(0);

      dropColor(color);
    });
  });

  describe('getContrastRating', () => {
    it('should return correct rating for contrast values', () => {
      expect(getContrastRating(95)).toBe('platinum');
      expect(getContrastRating(80)).toBe('gold');
      expect(getContrastRating(65)).toBe('silver');
      expect(getContrastRating(50)).toBe('bronze');
      expect(getContrastRating(35)).toBe('ui');
      expect(getContrastRating(10)).toBe('fail');
    });
  });

  describe('matchContrast', () => {
    it('should match contrast by adjusting lightness', () => {
      const color = createColor('rgb', [0.5, 0.5, 0.5]);
      const background = createColor('rgb', [0, 0, 0]);

      const result = matchContrast(color, background, 50);

      expect(result).toBeDefined();
      expect(result.space).toBe(color.space);

      dropColor(color);
      dropColor(background);
      dropColor(result);
    });
  });

  describe('checkContrastBulk', () => {
    it('should check contrast for multiple colors', () => {
      const bg = createColor('rgb', [1, 1, 1]);
      const colors = [
        createColor('rgb', [0, 0, 0]),
        createColor('rgb', [0.5, 0.5, 0.5]),
        createColor('rgb', [1, 1, 1]),
      ];

      const results = checkContrastBulk(bg, colors);

      expect(results).toHaveLength(3);
      expect(results[0].contrast).toBeGreaterThan(results[1].contrast);

      dropColor(bg);
      for (const c of colors) dropColor(c);
    });
  });
});
