import { describe, expect, it } from 'vitest';
import { parseColor } from '~/parse';

describe('CSS Parser (parse.ts)', () => {
  describe('Hex Parsing', () => {
    it('should parse 3-digit and 6-digit hex', () => {
      const hex3 = parseColor('#f00');
      expect(hex3.space).toBe('rgb');
      expect(hex3.value[0]).toBe(1);
      expect(hex3.alpha).toBe(1);

      const hex6 = parseColor('#00ff00');
      expect(hex6.value[1]).toBe(1);
    });

    it('should parse 4-digit and 8-digit hex (alpha support)', () => {
      const hex4 = parseColor('#f008');
      expect(hex4.alpha).toBeCloseTo(0.533, 3);

      const hex8 = parseColor('#0000ff80');
      expect(hex8.value[2]).toBe(1);
      expect(hex8.alpha).toBeCloseTo(0.502, 3);
    });

    it('should throw on invalid hex lengths', () => {
      expect(() => parseColor('#ff')).toThrow('invalid hex length: 2');
      expect(() => parseColor('#ff00000000')).toThrow('invalid hex length: 10');
    });

    it('should throw on hash-only hex', () => {
      expect(() => parseColor('#')).toThrow('empty color string');
    });
  });

  describe('Functional Parsing', () => {
    it('should parse standard rgb() and rgba()', () => {
      const rgb = parseColor('rgb(255, 128, 0)');
      expect(rgb.value[0]).toBe(1);
      expect(rgb.value[1]).toBeCloseTo(0.502, 3);

      const rgba = parseColor('rgba(255 128 0 / 0.5)');
      expect(rgba.alpha).toBe(0.5);
    });

    it('should parse hsl() and apply percentage normalization', () => {
      const hsl = parseColor('hsl(180 50% 50%)');
      expect(hsl.space).toBe('hsl');
      expect(hsl.value[0]).toBe(180);
      expect(hsl.value[1]).toBe(0.5);
      expect(hsl.value[2]).toBe(0.5);
    });

    it('should parse lab() and oklab() with L normalization', () => {
      const lab = parseColor('lab(100% 10 20)');
      expect(lab.value[0]).toBe(1);

      const oklab = parseColor('oklab(60% 0.1 -0.1)');
      expect(oklab.value[0]).toBeCloseTo(0.6);
    });

    it('should parse lch() and oklch()', () => {
      const lch = parseColor('lch(50% 30 150)');
      expect(lch.space).toBe('lch');
      expect(lch.value[0]).toBe(0.5);

      const oklch = parseColor('oklch(0.6 0.2 270)');
      expect(oklch.space).toBe('oklch');
    });

    it('should parse the color() function and its profiles', () => {
      const lrgb = parseColor('color(srgb-linear 1 0.5 0)');
      expect(lrgb.space).toBe('lrgb');

      const d65 = parseColor('color(xyz-d65 0.95 1 1.08)');
      expect(d65.space).toBe('xyz65');

      const d50 = parseColor('color(xyz-d50 0.96 1 0.82)');
      expect(d50.space).toBe('xyz50');

      const generic = parseColor('color(prophoto 0.5 0.5 0.5)');
      expect(generic.space).toBe('prophoto');
    });

    it('should handle percentage-based alpha', () => {
      const color = parseColor('rgb(255 255 255 / 100%)');
      expect(color.alpha).toBe(1);

      const colorHalf = parseColor('rgb(255 255 255 / 20%)');
      expect(colorHalf.alpha).toBe(0.2);
    });

    it('should throw on invalid formats', () => {
      expect(() => parseColor('not-a-color')).toThrow('invalid format: not-a-color');
    });

    it('should throw on empty strings and missing components', () => {
      expect(() => parseColor('')).toThrow('empty color string');
      expect(() => parseColor('   ')).toThrow('empty color string');
      expect(() => parseColor('rgb(100)')).toThrow('invalid color: missing components');
      expect(() => parseColor('rgb(100, 50)')).toThrow('invalid color: missing components');
      expect(() => parseColor('rgb(a b c)')).toThrow('invalid color: missing components');
      const color = parseColor('rgb(100 50 25)');
      expect(color.value[0]).toBeCloseTo(100 / 255);
    });

    it('should throw on invalid individual components', () => {
      expect(() => parseColor('rgb(a 50 25)')).toThrow('invalid color: missing components');
      expect(() => parseColor('rgb(100 a 25)')).toThrow('invalid color: missing components');
    });

    it('should handle color() function with offset > 0', () => {
      const lrgb = parseColor('color(srgb-linear 0.5 0.2 0.8)');
      expect(lrgb.space).toBe('lrgb');
      expect(lrgb.value[0]).toBe(0.5);
      expect(() => parseColor('color(srgb-linear 0.5)')).toThrow(
        'invalid color: missing components',
      );
      expect(() => parseColor('color(srgb-linear)')).toThrow('invalid color: missing components');
    });

    it('should clamp alpha values between 0 and 1', () => {
      const negativeAlpha = parseColor('rgb(255 255 255 / -0.5)');
      expect(negativeAlpha.alpha).toBe(0);

      const excessiveAlpha = parseColor('rgb(255 255 255 / 1.5)');
      expect(excessiveAlpha.alpha).toBe(1);

      const excessivePercent = parseColor('rgb(255 255 255 / 120%)');
      expect(excessivePercent.alpha).toBe(1);
    });
  });
});
