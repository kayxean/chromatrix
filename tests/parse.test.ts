import { describe, expect, it } from 'vitest';
import { parseColor } from '~/parse';

describe('CSS Parser (parse.ts)', () => {
  describe('Hex Parsing', () => {
    it('should parse 3-digit and 6-digit hex', () => {
      // 3-digit hex: shorthand expansion (f -> ff) and normalization to 0-1
      const hex3 = parseColor('#f00');
      expect(hex3.space).toBe('rgb');
      expect(hex3.value[0]).toBe(1);
      expect(hex3.alpha).toBe(1);

      // 6-digit hex: standard sRGB bit-depth mapping
      const hex6 = parseColor('#00ff00');
      expect(hex6.value[1]).toBe(1);
    });

    it('should parse 4-digit and 8-digit hex (alpha support)', () => {
      // 4-digit hex: the last digit is alpha (8/15 ≈ 0.533)
      const hex4 = parseColor('#f008');
      expect(hex4.alpha).toBeCloseTo(0.533, 3);

      // 8-digit hex: alpha is 0x80 (128/255 ≈ 0.502)
      const hex8 = parseColor('#0000ff80');
      expect(hex8.value[2]).toBe(1);
      expect(hex8.alpha).toBeCloseTo(0.502, 3);
    });

    it('should throw on invalid hex lengths', () => {
      // Hex strings must be 3, 4, 6, or 8 digits (excluding the #)
      expect(() => parseColor('#ff')).toThrow('Invalid Hex length: 2');
      expect(() => parseColor('#ff00000000')).toThrow('Invalid Hex length: 10');
    });
  });

  describe('Functional Parsing', () => {
    it('should parse standard rgb() and rgba()', () => {
      // Supports legacy comma-separated syntax
      const rgb = parseColor('rgb(255, 128, 0)');
      expect(rgb.value[0]).toBe(1);
      expect(rgb.value[1]).toBeCloseTo(0.502, 3);

      // Supports modern space-separated syntax with alpha slash
      const rgba = parseColor('rgba(255 128 0 / 0.5)');
      expect(rgba.alpha).toBe(0.5);
    });

    it('should parse hsl() and apply percentage normalization', () => {
      // CSS HSL uses percentages for S and L; we normalize these to 0-1
      const hsl = parseColor('hsl(180 50% 50%)');
      expect(hsl.space).toBe('hsl');
      expect(hsl.value[0]).toBe(180); // Hue remains in degrees
      expect(hsl.value[1]).toBe(0.5); // Saturation
      expect(hsl.value[2]).toBe(0.5); // Lightness
    });

    it('should parse lab() and oklab() with L normalization', () => {
      // Lab Lightness (0-100%) is mapped to our internal 0-1 range
      const lab = parseColor('lab(100% 10 20)');
      expect(lab.value[0]).toBe(1);

      // Oklab Lightness is handled similarly for consistency
      const oklab = parseColor('oklab(60% 0.1 -0.1)');
      expect(oklab.value[0]).toBeCloseTo(0.6);
    });

    it('should parse lch() and oklch()', () => {
      // LCH (Lightness, Chroma, Hue) parsing
      const lch = parseColor('lch(50% 30 150)');
      expect(lch.space).toBe('lch');
      expect(lch.value[0]).toBe(0.5);

      // Oklch parsing using the modern functional syntax
      const oklch = parseColor('oklch(0.6 0.2 270)');
      expect(oklch.space).toBe('oklch');
    });

    it('should parse the color() function and its profiles', () => {
      /**
       * The color() function is the extensible way CSS handles various
       * color spaces and illuminants.
       */
      const lrgb = parseColor('color(srgb-linear 1 0.5 0)');
      expect(lrgb.space).toBe('lrgb');

      const d65 = parseColor('color(xyz-d65 0.95 1 1.08)');
      expect(d65.space).toBe('xyz65');

      const d50 = parseColor('color(xyz-d50 0.96 1 0.82)');
      expect(d50.space).toBe('xyz50');

      // Generic fallback for spaces we support but aren't strictly CSS4 "standard" keywords
      const generic = parseColor('color(prophoto 0.5 0.5 0.5)');
      expect(generic.space).toBe('prophoto');
    });

    it('should handle percentage-based alpha', () => {
      // CSS allows alpha to be specified as a percentage (100% = 1.0)
      const color = parseColor('rgb(255 255 255 / 100%)');
      expect(color.alpha).toBe(1);

      const colorHalf = parseColor('rgb(255 255 255 / 20%)');
      expect(colorHalf.alpha).toBe(0.2);
    });

    it('should throw on invalid formats', () => {
      // Graceful error handling for unsupported strings
      expect(() => parseColor('not-a-color')).toThrow(
        'Invalid format: not-a-color',
      );
    });
  });
});
