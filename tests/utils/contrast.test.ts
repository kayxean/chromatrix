import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createMatrix, dropMatrix } from '~/shared';
import {
  checkContrast,
  checkContrastBulk,
  getContrastRating,
  getLuminanceD65,
  matchContrast,
  matchScales,
} from '~/utils/contrast';

describe('Contrast Utilities (contrast.ts)', () => {
  describe('getLuminanceD65', () => {
    it('should extract correct Y (luminance) from RGB space', () => {
      const v = createMatrix('rgb');

      v.set([1, 1, 1]); // White
      expect(getLuminanceD65({ space: 'rgb', value: v })).toBeCloseTo(1.0);

      v.set([0, 0, 0]); // Black
      expect(getLuminanceD65({ space: 'rgb', value: v })).toBe(0);

      dropMatrix(v);
    });
  });

  describe('checkContrast (APCA)', () => {
    it('should return 0 when contrast is below the threshold', () => {
      // White is used here to avoid the precision drift found in mid-tones
      // when converting through non-linear spaces.
      const v = createMatrix('rgb');
      v.set([1, 1, 1]);
      const col: Color = { space: 'rgb', value: v };

      expect(checkContrast(col, col)).toBe(0);

      dropMatrix(v);
    });

    it('should return positive Lc for dark text on light backgrounds', () => {
      const vText = createMatrix('rgb');
      const vBg = createMatrix('rgb');
      vText.set([0, 0, 0]);
      vBg.set([1, 1, 1]);

      const res = checkContrast(
        { space: 'rgb', value: vText },
        { space: 'rgb', value: vBg },
      );
      expect(res).toBeGreaterThan(100);

      dropMatrix(vText);
      dropMatrix(vBg);
    });

    it('should return negative Lc for light text on dark backgrounds', () => {
      const vText = createMatrix('rgb');
      const vBg = createMatrix('rgb');
      vText.set([1, 1, 1]);
      vBg.set([0, 0, 0]);

      const res = checkContrast(
        { space: 'rgb', value: vText },
        { space: 'rgb', value: vBg },
      );
      expect(res).toBeLessThan(-100);

      dropMatrix(vText);
      dropMatrix(vBg);
    });
  });

  describe('getContrastRating', () => {
    it('should map Lc values to readability tiers', () => {
      expect(getContrastRating(95)).toBe('platinum');
      expect(getContrastRating(80)).toBe('gold');
      expect(getContrastRating(65)).toBe('silver');
      expect(getContrastRating(50)).toBe('bronze');
      expect(getContrastRating(35)).toBe('ui');
      expect(getContrastRating(10)).toBe('fail');
    });
  });

  describe('matchContrast', () => {
    it('should increase lightness for dark backgrounds', () => {
      const vText = createMatrix('rgb');
      const vBg = createMatrix('rgb');
      vText.set([0.2, 0.2, 0.2]);
      vBg.set([0.05, 0.05, 0.05]);

      const text: Color = { space: 'rgb', value: vText };
      const bg: Color = { space: 'rgb', value: vBg };

      const adjusted = matchContrast(text, bg, 60);
      expect(adjusted.value[0]).toBeGreaterThan(0.2);

      dropMatrix(vText);
      dropMatrix(vBg);
      dropMatrix(adjusted.value);
    });

    it('should adjust mid-tones for light backgrounds', () => {
      const vText = createMatrix('rgb');
      const vBg = createMatrix('rgb');
      vText.set([0.5, 0.5, 0.5]);
      vBg.set([1, 1, 1]);

      const text: Color = { space: 'rgb', value: vText };
      const bg: Color = { space: 'rgb', value: vBg };

      const target = 75;
      const adjusted = matchContrast(text, bg, target);

      const finalContrast = Math.abs(checkContrast(adjusted, bg));
      // Target -1 accounts for binary search precision limits
      expect(finalContrast).toBeGreaterThanOrEqual(target - 1);

      dropMatrix(vText);
      dropMatrix(vBg);
      dropMatrix(adjusted.value);
    });
  });

  describe('checkContrastBulk', () => {
    it('should handle multiple colors and identify zero-contrast branches', () => {
      const bg = { space: 'rgb' as const, value: createMatrix('rgb') };
      bg.value.set([1, 1, 1]);

      const c1 = { space: 'rgb' as const, value: createMatrix('rgb') };
      const c2 = { space: 'rgb' as const, value: createMatrix('rgb') };
      c1.value.set([1, 1, 1]); // Force zero branch
      c2.value.set([0, 0, 0]);

      const results = checkContrastBulk(bg, [c1, c2]);

      expect(results[0].contrast).toBe(0);
      expect(results[1].contrast).toBeGreaterThan(100);

      dropMatrix(bg.value);
      dropMatrix(c1.value);
      dropMatrix(c2.value);
    });
  });

  describe('matchScales', () => {
    it('should generate an adjusted scale meeting target contrast at every step', () => {
      const bg = { space: 'rgb' as const, value: createMatrix('rgb') };
      bg.value.set([0, 0, 0]);

      const s1 = { space: 'rgb' as const, value: createMatrix('rgb') };
      const s2 = { space: 'rgb' as const, value: createMatrix('rgb') };
      s1.value.set([0.1, 0, 0]);
      s2.value.set([0, 0.1, 0]);

      const target = 60;
      const steps = 3;
      const scale = matchScales([s1, s2], bg, target, steps);

      expect(scale).toHaveLength(steps);
      for (const color of scale) {
        expect(Math.abs(checkContrast(color, bg))).toBeGreaterThanOrEqual(
          target - 1,
        );
      }

      dropMatrix(bg.value);
      dropMatrix(s1.value);
      dropMatrix(s2.value);
      for (const s of scale) dropMatrix(s.value);
    });
  });
});
