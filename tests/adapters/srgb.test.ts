import { describe, expect, it } from 'vitest';
import {
  hexToRgb,
  hslToHsv,
  hsvToHsl,
  hsvToHwb,
  hsvToRgb,
  hwbToHsv,
  rgbToHex,
  rgbToHsv,
} from '~/adapters/srgb';
import { createMatrix, dropMatrix } from '~/shared';

describe('sRGB Adapters (HSV, HSL, HWB, Hex)', () => {
  describe('HSV <-> RGB', () => {
    it('should convert RGB to HSV and back (sector coverage)', () => {
      const rgb = createMatrix('rgb');
      const hsv = createMatrix('hsv');
      const result = createMatrix('rgb');

      // Sector 0: Red is max (0°-60°)
      rgb.set([1, 0.5, 0]);
      rgbToHsv(rgb, hsv);
      expect(hsv[0]).toBe(30);
      hsvToRgb(hsv, result);
      expect(result[0]).toBeCloseTo(1);

      // Sector 2: Green is max (120°-180°)
      rgb.set([0.1, 0.9, 0.2]);
      rgbToHsv(rgb, hsv);
      expect(hsv[0]).toBeCloseTo(127.5, 1);
      hsvToRgb(hsv, result);
      expect(result[1]).toBeCloseTo(0.9);

      // Sector 4: Blue is max (240°-300°)
      rgb.set([0.1, 0.2, 0.9]);
      rgbToHsv(rgb, hsv);
      expect(hsv[0]).toBeCloseTo(232.5, 1);
      hsvToRgb(hsv, result);
      expect(result[2]).toBeCloseTo(0.9);

      dropMatrix(rgb);
      dropMatrix(hsv);
      dropMatrix(result);
    });

    it('should handle special cases (black, gray, negative hue)', () => {
      const rgb = createMatrix('rgb');
      const hsv = createMatrix('hsv');

      // Black: v=0, s=0
      rgb.set([0, 0, 0]);
      rgbToHsv(rgb, hsv);
      expect(hsv[1]).toBe(0);
      expect(hsv[2]).toBe(0);

      // Gray: delta=0, h=0
      rgb.set([0.5, 0.5, 0.5]);
      rgbToHsv(rgb, hsv);
      expect(hsv[0]).toBe(0);

      // Explicit zero delta check
      rgb.set([0.8, 0.8, 0.8]);
      rgbToHsv(rgb, hsv);
      expect(hsv[1]).toBe(0);

      // Wrap: Negative raw hue normalization
      rgb.set([1, 0, 0.1]);
      rgbToHsv(rgb, hsv);
      expect(hsv[0]).toBeGreaterThan(0);

      dropMatrix(rgb);
      dropMatrix(hsv);
    });

    it('should hit all sectors in hsvToRgb (f=0 through f=5)', () => {
      const hsv = createMatrix('hsv');
      const rgb = createMatrix('rgb');

      /** * Sector coverage for hsvToRgb:
       * f=0: 0, f=1: 60, f=2: 120, f=3: 180, f=4: 240, f=5: 300
       */
      const hues = [0, 60, 120, 180, 240, 300];
      hues.forEach((h) => {
        hsv.set([h, 1, 1]);
        hsvToRgb(hsv, rgb);
        expect(rgb[0] + rgb[1] + rgb[2]).toBeGreaterThan(0);
      });

      // Greyscale: Saturation 0 early return
      hsv.set([0, 0, 0.5]);
      hsvToRgb(hsv, rgb);
      expect(rgb[0]).toBe(0.5);

      dropMatrix(hsv);
      dropMatrix(rgb);
    });
  });

  describe('HSL / HWB', () => {
    it('should round-trip HSL and HSV and handle branches', () => {
      const hsv = createMatrix('hsv');
      const hsl = createMatrix('hsl');
      const result = createMatrix('hsv');

      hsv.set([180, 0.5, 0.8]);
      hsvToHsl(hsv, hsl);
      hslToHsv(hsl, result);
      expect(result[1]).toBeCloseTo(0.5);

      // Grayscale branch (max === min)
      hsv.set([0, 0, 0.5]);
      hsvToHsl(hsv, hsl);
      expect(hsl[1]).toBe(0);

      hsl.set([0, 0, 0.5]);
      hslToHsv(hsl, result);
      expect(result[1]).toBe(0);

      // Boundaries: L=0, L=1
      hsv.set([0, 0, 0]);
      hsvToHsl(hsv, hsl);
      expect(hsl[2]).toBe(0);
      hsv.set([0, 0, 1]);
      hsvToHsl(hsv, hsl);
      expect(hsl[2]).toBe(1);

      // Pure black (v === 0)
      hsl.set([0, 0, 0]);
      hslToHsv(hsl, result);
      expect(result[2]).toBe(0);

      dropMatrix(hsv);
      dropMatrix(hsl);
      dropMatrix(result);
    });

    it('should round-trip HWB and HSV and handle normalization', () => {
      const hsv = createMatrix('hsv');
      const hwb = createMatrix('hwb');
      const result = createMatrix('hsv');

      hsv.set([200, 0.3, 0.7]);
      hsvToHwb(hsv, hwb);
      hwbToHsv(hwb, result);
      expect(result[1]).toBeCloseTo(0.3);

      // Achromatic HWB (W + B >= 1)
      hwb.set([0, 0.6, 0.6]);
      hwbToHsv(hwb, result);
      expect(result[1]).toBe(0);

      // W + B normalization branch (> 1)
      hwb.set([0, 0.8, 0.4]);
      hwbToHsv(hwb, result);
      expect(result[1]).toBe(0);

      // Saturation safety branch (s < 0)
      hwb.set([0, 1.1, 0]);
      hwbToHsv(hwb, result);
      expect(result[1]).toBe(0);

      // Pure black (v === 0)
      hwb.set([0, 0, 1]);
      hwbToHsv(hwb, result);
      expect(result[2]).toBe(0);

      dropMatrix(hsv);
      dropMatrix(hwb);
      dropMatrix(result);
    });
  });

  describe('Hex Conversion', () => {
    it('should convert RGB to Hex and back with prefix options', () => {
      const rgb = createMatrix('rgb');
      const result = createMatrix('rgb');
      rgb.set([1, 0.5, 0]);

      expect(rgbToHex(rgb, true)).toBe('#ff8000');
      expect(rgbToHex(rgb, false)).toBe('ff8000');

      hexToRgb('#ff8000', result);
      expect(result[0]).toBeCloseTo(1);
      expect(result[1]).toBeCloseTo(128 / 255);

      dropMatrix(rgb);
      dropMatrix(result);
    });

    it('should handle shorthand and hex strings without hashes', () => {
      const rgb = createMatrix('rgb');

      hexToRgb('#f00', rgb);
      expect(rgb[0]).toBe(1);

      hexToRgb('00ff00', rgb);
      expect(rgb[1]).toBe(1);

      hexToRgb('00f', rgb);
      expect(rgb[2]).toBe(1);

      dropMatrix(rgb);
    });
  });
});
