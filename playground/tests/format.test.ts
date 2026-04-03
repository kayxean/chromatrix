import { describe, expect, it } from 'vitest';
import { formatCss } from '../format';
import { createColor, dropColor } from '../shared';

describe('CSS Formatter (format.ts)', () => {
  it('should format RGB as hex (including alpha)', () => {
    const color = createColor('rgb', [1, 0, 0.5]);

    expect(formatCss(color, true)).toBe('#ff0080');

    dropColor(color);
  });

  it('should format RGB with alpha as hex', () => {
    const color = createColor('rgb', [1, 0, 0.5], 0.5);

    expect(formatCss(color, true)).toBe('#ff008080');

    dropColor(color);
  });

  it('should format functional RGB notation', () => {
    const color = createColor('rgb', [1, 0.5, 0]);

    expect(formatCss(color)).toBe('rgb(255 128 0)');

    dropColor(color);
  });

  it('should format RGB with alpha', () => {
    const color = createColor('rgb', [1, 0.5, 0], 0.5);

    expect(formatCss(color)).toBe('rgb(255 128 0 / 0.5)');

    dropColor(color);
  });

  it('should format HSL and HWB with degrees and percentages', () => {
    const hsl = createColor('hsl', [180, 0.5, 0.5]);
    const hwb = createColor('hwb', [180, 0.5, 0.5]);

    expect(formatCss(hsl)).toBe('hsl(180deg 50% 50%)');
    expect(formatCss(hwb)).toBe('hwb(180deg 50% 50%)');

    dropColor(hsl);
    dropColor(hwb);
  });

  it('should format Lab and LCH (CIE)', () => {
    const lab = createColor('lab', [0.5, 10, 20]);
    expect(formatCss(lab)).toBe('lab(0% 10 20)');

    const lch = createColor('lch', [0.5, 30, 150]);
    expect(formatCss(lch)).toBe('lch(0% 30 150deg)');

    dropColor(lab);
    dropColor(lch);
  });

  it('should format Oklab and Oklch', () => {
    const oklab = createColor('oklab', [0.6, 0.1, -0.1]);
    expect(formatCss(oklab)).toBe('oklab(60% 0.1 -0.1)');

    const oklch = createColor('oklch', [0.6, 0.2, 270]);
    expect(formatCss(oklch)).toBe('oklch(60% 0.2 270deg)');

    dropColor(oklab);
    dropColor(oklch);
  });

  it('should format srgb-linear and xyz variants', () => {
    const lrgb = createColor('lrgb', [0.95, 1.0, 1.08]);
    expect(formatCss(lrgb)).toBe('color(srgb-linear 0.95 1 1.08)');

    const xyz65 = createColor('xyz65', [0.95, 1.0, 1.08]);
    expect(formatCss(xyz65)).toBe('color(xyz-d65 0.95 1 1.08)');

    const xyz50 = createColor('xyz50', [0.95, 1.0, 1.08]);
    expect(formatCss(xyz50)).toBe('color(xyz-d50 0.95 1 1.08)');

    dropColor(lrgb);
    dropColor(xyz65);
    dropColor(xyz50);
  });

  it('should handle custom spaces via default branch', () => {
    const color = createColor('rgb', [0.1, 0.2, 0.3]);
    (color as { space: string }).space = 'prophoto';

    expect(formatCss(color)).toBe('color(prophoto 0.1 0.2 0.3)');

    dropColor(color);
  });

  it('should respect custom precision', () => {
    const color = createColor('xyz65', [0.1234567, 0, 0]);

    const highPrec = formatCss(color, false, 7);
    expect(highPrec).toBe('color(xyz-d65 0.1234567 0 0)');

    dropColor(color);
  });
});
