import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { formatCss } from '~/format';
import { createMatrix, dropMatrix } from '~/shared';

describe('CSS Formatter (format.ts)', () => {
  it('should format RGB as hex (including alpha)', () => {
    const value = createMatrix('rgb');
    value.set([1, 0, 0.5]);
    const color: Color = { space: 'rgb', value };

    expect(formatCss(color, true)).toBe('#ff0080');

    expect(formatCss({ ...color, alpha: 0.5 }, true)).toBe('#ff008080');

    dropMatrix(value);
  });

  it('should format functional RGB notation', () => {
    const value = createMatrix('rgb');
    value.set([1, 0.5, 0]);
    const color: Color = { space: 'rgb', value };

    expect(formatCss(color)).toBe('rgb(255 128 0)');

    expect(formatCss({ ...color, alpha: 0.5 })).toBe('rgb(255 128 0 / 0.5)');

    dropMatrix(value);
  });

  it('should format HSL and HWB with degrees and percentages', () => {
    const hValue = createMatrix('hsl');
    hValue.set([180, 0.5, 0.5]);

    expect(formatCss({ space: 'hsl', value: hValue })).toBe('hsl(180deg 50% 50%)');
    expect(formatCss({ space: 'hwb', value: hValue })).toBe('hwb(180deg 50% 50%)');

    dropMatrix(hValue);
  });

  it('should format Lab and LCH (CIE)', () => {
    const labVal = createMatrix('lab');
    labVal.set([0.5, 10, 20]);
    expect(formatCss({ space: 'lab', value: labVal })).toBe('lab(0.5% 10 20)');

    const lchVal = createMatrix('lch');
    lchVal.set([0.5, 30, 150]);
    expect(formatCss({ space: 'lch', value: lchVal })).toBe('lch(0.5% 30 150deg)');

    dropMatrix(labVal);
    dropMatrix(lchVal);
  });

  it('should format Oklab and Oklch', () => {
    const okVal = createMatrix('oklab');
    okVal.set([0.6, 0.1, -0.1]);
    expect(formatCss({ space: 'oklab', value: okVal })).toBe('oklab(60% 0.1 -0.1)');

    const okchVal = createMatrix('oklch');
    okchVal.set([0.6, 0.2, 270]);
    expect(formatCss({ space: 'oklch', value: okchVal })).toBe('oklch(60% 0.2 270deg)');

    dropMatrix(okVal);
    dropMatrix(okchVal);
  });

  it('should format srgb-linear and xyz variants', () => {
    const val = createMatrix('xyz65');
    val.set([0.95, 1.0, 1.08]);

    expect(formatCss({ space: 'lrgb', value: val })).toBe('color(srgb-linear 0.95 1 1.08)');

    expect(formatCss({ space: 'xyz65', value: val })).toBe('color(xyz-d65 0.95 1 1.08)');
    expect(formatCss({ space: 'xyz50', value: val })).toBe('color(xyz-d50 0.95 1 1.08)');

    dropMatrix(val);
  });

  it('should handle custom spaces via default branch', () => {
    const val = createMatrix('rgb');
    val.set([0.1, 0.2, 0.3]);
    const customColor = { space: 'prophoto' as any, value: val };

    expect(formatCss(customColor)).toBe('color(prophoto 0.1 0.2 0.3)');
    dropMatrix(val);
  });

  it('should respect custom precision and handle high precision rounding', () => {
    const val = createMatrix('rgb');
    val.set([0.1234567, 0, 0]);
    const color: Color = { space: 'rgb', value: val };

    expect(formatCss(color)).toBe('rgb(31 0 0)');

    const highPrec = formatCss({ space: 'xyz65', value: val }, false, 7);
    expect(highPrec).toBe('color(xyz-d65 0.1234567 0 0)');

    dropMatrix(val);
  });

  it('should pad single-digit alpha hex values', () => {
    const value = createMatrix('rgb');
    value.set([0, 0, 0]);

    const color: Color = { space: 'rgb', value, alpha: 0.04 };

    expect(formatCss(color, true)).toBe('#0000000a');

    dropMatrix(value);
  });

  it('should clamp precision to valid range', () => {
    const val = createMatrix('xyz65');
    val.set([0.5, 0.25, 0.75]);
    const color: Color = { space: 'xyz65', value: val };

    expect(formatCss(color, false, -5)).toBe('color(xyz-d65 1 0 1)');

    expect(() => formatCss(color, false, 100)).not.toThrow();

    dropMatrix(val);
  });
});
