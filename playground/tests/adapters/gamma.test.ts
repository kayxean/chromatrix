import { describe, expect, it } from 'vitest';
import { lrgbToRgb, rgbToLrgb } from '../../adapters/gamma';
import { createColor, dropColor, getSharedBuffer } from '../../shared';

describe('Gamma Adapters (sRGB Transfer Functions)', () => {
  it('should round-trip standard colors (power-curve zone)', () => {
    const color = createColor('rgb', [0.8, 0.4, 0.2]);
    const buf = getSharedBuffer();
    const idx = color.index;

    rgbToLrgb(buf, idx);
    lrgbToRgb(buf, idx);

    expect(buf[idx]).toBeCloseTo(0.8, 6);
    expect(buf[idx + 1]).toBeCloseTo(0.4, 6);
    expect(buf[idx + 2]).toBeCloseTo(0.2, 6);

    dropColor(color);
  });

  it('should trigger linear slope for very dark colors (linear zone)', () => {
    const color = createColor('rgb', [0.01, 0.02, 0.03]);
    const buf = getSharedBuffer();
    const idx = color.index;

    const originalVal = buf[idx];

    rgbToLrgb(buf, idx);
    lrgbToRgb(buf, idx);

    expect(buf[idx]).toBeCloseTo(originalVal, 6);

    dropColor(color);
  });

  it('should handle negative linear values using extended transfer function', () => {
    const color = createColor('lrgb', [-0.1, -0.5, -1.0]);
    const buf = getSharedBuffer();
    const idx = color.index;

    lrgbToRgb(buf, idx);

    expect(buf[idx]).toBeCloseTo(-1.292, 2);
    expect(buf[idx + 1]).toBeCloseTo(-6.46, 2);
    expect(buf[idx + 2]).toBeCloseTo(-12.92, 2);

    dropColor(color);
  });

  it('should handle absolute white and black points', () => {
    const color = createColor('rgb', [0, 0, 0]);
    const buf = getSharedBuffer();
    let idx = color.index;

    rgbToLrgb(buf, idx);
    expect(buf[idx]).toBe(0);

    color.value[0] = 1;
    color.value[1] = 1;
    color.value[2] = 1;
    rgbToLrgb(buf, idx);
    expect(buf[idx]).toBe(1);

    dropColor(color);
  });
});
