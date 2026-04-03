import { describe, expect, it } from 'vitest';
import { convertColor, convertHue } from '../convert';
import { createColor, dropColor } from '../shared';

describe('Conversion Engine (convert.ts)', () => {
  it('should handle the identity path (from === to)', () => {
    const color = createColor('rgb', [1, 0.5, 0]);
    convertColor(color, 'rgb');

    expect(color.value[0]).toBe(1);
    expect(color.value[1]).toBe(0.5);

    dropColor(color);
  });

  it('should use DIRECT_HUB for same-model shortcuts (RGB -> HSL)', () => {
    const rgb = createColor('rgb', [1, 0, 0]);
    convertColor(rgb, 'hsl');

    expect(rgb.value[0]).toBe(0);
    expect(rgb.value[1]).toBe(1);
    expect(rgb.value[2]).toBe(0.5);
    expect(rgb.space).toBe('hsl');

    dropColor(rgb);
  });

  it('should convert RGB to HSV via direct path', () => {
    const rgb = createColor('rgb', [1, 0, 0]);
    convertColor(rgb, 'hsv');

    expect(rgb.value[0]).toBe(0);
    expect(rgb.space).toBe('hsv');

    dropColor(rgb);
  });

  it('should convert RGB to HWB via direct path', () => {
    const rgb = createColor('rgb', [0.5, 0.5, 0.5]);
    convertColor(rgb, 'hwb');

    expect(rgb.space).toBe('hwb');

    dropColor(rgb);
  });

  it('should handle complex Hub paths with CAT (Lab to Oklab)', () => {
    const lab = createColor('lab', [0.5, 0.2, 0.1]);
    convertColor(lab, 'oklab');

    expect(lab.value[0]).toBeGreaterThan(0);
    expect(lab.value[0]).toBeLessThan(1);
    expect(lab.space).toBe('oklab');

    dropColor(lab);
  });

  it('should handle chromatic adaptation (XYZ50 to XYZ65)', () => {
    const xyz50 = createColor('xyz50', [0.9642, 1.0, 0.8249]);
    convertColor(xyz50, 'xyz65');

    expect(xyz50.value[0]).toBeCloseTo(0.9504, 3);
    expect(xyz50.value[2]).toBeCloseTo(1.0888, 3);

    dropColor(xyz50);
  });

  it('should handle D65 to D50 chromatic adaptation', () => {
    const oklab = createColor('oklab', [1, 0, 0]);
    convertColor(oklab, 'lab');

    expect(oklab.value[0]).toBeCloseTo(1, 1);

    dropColor(oklab);
  });

  it('convertHue should map correctly or copy if no polar target exists', () => {
    const rgb = createColor('rgb', [1, 0, 0]);
    convertHue(rgb, 'rgb');

    expect(rgb.value[0]).toBe(0);

    dropColor(rgb);
  });

  it('convertHue should do nothing for non-polar spaces', () => {
    const xyz = createColor('xyz65', [0.5, 0.5, 0.5]);
    convertHue(xyz, 'xyz65');

    expect(xyz.value[0]).toBe(0.5);

    dropColor(xyz);
  });
});
