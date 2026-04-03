import { describe, expect, it } from 'vitest';
import { isValidColor } from '../../utils/validate';

describe('Validate Utilities (validate.ts)', () => {
  describe('isValidColor', () => {
    it('should validate hex colors', () => {
      expect(isValidColor('#f00')).toBe(true);
      expect(isValidColor('#ff0000')).toBe(true);
      expect(isValidColor('#f008')).toBe(true);
      expect(isValidColor('#ff000080')).toBe(true);
    });

    it('should reject invalid hex lengths', () => {
      expect(isValidColor('#ff')).toBe(false);
      expect(isValidColor('#ff00000')).toBe(false);
      expect(isValidColor('#')).toBe(false);
    });

    it('should validate rgb functional notation', () => {
      expect(isValidColor('rgb(255 0 0)')).toBe(true);
      expect(isValidColor('rgb(255 0 0 / 0.5)')).toBe(true);
      expect(isValidColor('rgb(100 50 25)')).toBe(true);
    });

    it('should validate hsl functional notation', () => {
      expect(isValidColor('hsl(180 50% 50%)')).toBe(true);
    });

    it('should validate lab and oklab', () => {
      expect(isValidColor('lab(50% 10 20)')).toBe(true);
      expect(isValidColor('oklab(50% 0.1 -0.1)')).toBe(true);
    });

    it('should validate lch and oklch', () => {
      expect(isValidColor('lch(50% 30 150)')).toBe(true);
      expect(isValidColor('oklch(0.5 0.1 180)')).toBe(true);
    });

    it('should validate color() function', () => {
      expect(isValidColor('color(srgb-linear 1 0 0)')).toBe(true);
      expect(isValidColor('color(xyz-d65 0.95 1 1.08)')).toBe(true);
      expect(isValidColor('color(xyz-d50 0.96 1 0.82)')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidColor('')).toBe(false);
      expect(isValidColor('not-a-color')).toBe(false);
      expect(isValidColor('rgb()')).toBe(false);
      expect(isValidColor('rgb(100)')).toBe(false);
      expect(isValidColor('rgb(100 50)')).toBe(false);
    });

    it('should reject unknown color spaces', () => {
      expect(isValidColor('unknown(1 2 3)')).toBe(false);
    });

    it('should handle whitespace', () => {
      expect(isValidColor('  rgb(255 0 0)')).toBe(true);
    });
  });
});
