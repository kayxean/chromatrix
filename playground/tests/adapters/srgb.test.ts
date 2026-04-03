import { describe, expect, it } from 'vitest';
import { hsvToHsl, hsvToHwb, hsvToRgb, hwbToHsv, rgbToHsv } from '../../adapters/srgb';
import { createColor, dropColor, getSharedBuffer } from '../../shared';

describe('sRGB Adapters (HSV, HSL, HWB)', () => {
  describe('HSV <-> RGB', () => {
    it('should convert RGB to HSV and back (sector coverage)', () => {
      const color = createColor('rgb', [1, 0.5, 0]);
      const buf = getSharedBuffer();
      const idx = color.index;

      rgbToHsv(buf, idx);
      expect(buf[idx]).toBe(30);
      hsvToRgb(buf, idx);
      expect(buf[idx]).toBeCloseTo(1);

      color.value[0] = 0.1;
      color.value[1] = 0.9;
      color.value[2] = 0.2;
      rgbToHsv(buf, idx);
      expect(buf[idx]).toBeCloseTo(127.5, 1);

      dropColor(color);
    });

    it('should handle special cases (black, gray, negative hue)', () => {
      const color = createColor('rgb', [0, 0, 0]);
      const buf = getSharedBuffer();
      let idx = color.index;

      rgbToHsv(buf, idx);
      expect(buf[idx + 1]).toBe(0);
      expect(buf[idx + 2]).toBe(0);

      color.value[0] = 0.5;
      color.value[1] = 0.5;
      color.value[2] = 0.5;
      rgbToHsv(buf, idx);
      expect(buf[idx]).toBe(0);

      dropColor(color);
    });

    it('should hit all sectors in hsvToRgb (f=0 through f=5)', () => {
      const color = createColor('hsv', [0, 1, 1]);
      const buf = getSharedBuffer();
      let idx = color.index;

      const hues = [0, 60, 120, 180, 240, 300];
      hues.forEach((h) => {
        color.value[0] = h;
        hsvToRgb(buf, idx);
        expect(buf[idx] + buf[idx + 1] + buf[idx + 2]).toBeGreaterThan(0);
      });

      color.value[0] = 0;
      color.value[1] = 0;
      color.value[2] = 0.5;
      hsvToRgb(buf, idx);
      expect(buf[idx]).toBe(0.5);

      dropColor(color);
    });

    it('should correctly handle negative hue values', () => {
      const color = createColor('hsv', [-30, 0.5, 0.8]);
      const buf = getSharedBuffer();
      const idx = color.index;

      hsvToRgb(buf, idx);
      expect(buf[idx] + buf[idx + 1] + buf[idx + 2]).toBeGreaterThan(0);
      expect(buf[idx]).toBeGreaterThan(buf[idx + 1]);
      expect(buf[idx]).toBeGreaterThan(buf[idx + 2]);

      dropColor(color);
    });
  });

  describe('HSL / HWB', () => {
    it('should round-trip HSL and HSV and handle branches', () => {
      const color = createColor('hsv', [180, 0.5, 0.8]);
      const buf = getSharedBuffer();
      const idx = color.index;

      hsvToHsl(buf, idx);
      expect(buf[idx + 1]).toBeCloseTo(0.5);

      hsvToRgb(buf, idx);
      rgbToHsv(buf, idx);
      expect(buf[idx + 1]).toBeCloseTo(0.5);

      dropColor(color);
    });

    it('should round-trip HWB and HSV and handle normalization', () => {
      const color = createColor('hsv', [200, 0.3, 0.7]);
      const buf = getSharedBuffer();
      const idx = color.index;

      hsvToHwb(buf, idx);
      hwbToHsv(buf, idx);
      expect(buf[idx + 1]).toBeCloseTo(0.3);

      color.value[0] = 0;
      color.value[1] = 0.6;
      color.value[2] = 0.6;
      hwbToHsv(buf, idx);
      expect(buf[idx + 1]).toBe(0);

      color.value[0] = 0;
      color.value[1] = 0;
      color.value[2] = 1;
      hwbToHsv(buf, idx);
      expect(buf[idx + 2]).toBe(0);

      dropColor(color);
    });
  });
});
