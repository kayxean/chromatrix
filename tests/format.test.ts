import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { formatCss } from '~/format';
import { createMatrix, dropMatrix } from '~/shared';

describe('CSS Formatter (format.ts)', () => {
  it('should format RGB as hex (including alpha)', () => {
    // Hexadecimal strings represent the legacy standard for web colors.
    // Each component is mapped from a 0-1 float to a 0-255 (00-ff) integer.
    const value = createMatrix('rgb');
    value.set([1, 0, 0.5]); // Corresponds to #ff0080
    const color: Color = { space: 'rgb', value };

    // Standard 6-digit hex notation (RRGGBB)
    expect(formatCss(color, undefined, true)).toBe('#ff0080');

    // 8-digit hex notation (RRGGBBAA)
    // Alpha 0.5 is multiplied by 255 and rounded (127.5 -> 128/0x80)
    expect(formatCss(color, 0.5, true)).toBe('#ff008080');

    dropMatrix(value);
  });

  it('should format functional RGB notation', () => {
    // Modern CSS Color Level 4 uses space-separated values rather than commas.
    // This improves readability and aligns with newer functional notations like lab().
    const value = createMatrix('rgb');
    value.set([1, 0.5, 0]);
    const color: Color = { space: 'rgb', value };

    // Integer-based functional notation
    expect(formatCss(color)).toBe('rgb(255 128 0)');

    // Alpha is appended with a forward slash separator
    expect(formatCss(color, 0.5)).toBe('rgb(255 128 0 / 0.5)');

    dropMatrix(value);
  });

  it('should format HSL and HWB with degrees and percentages', () => {
    // Cylindrical color models use polar coordinates (Hue) and percentages (S/L/W/B).
    // The "deg" suffix is explicitly added for CSS compatibility with hue angles.
    const hValue = createMatrix('hsl');
    hValue.set([180, 0.5, 0.5]);

    expect(formatCss({ space: 'hsl', value: hValue })).toBe(
      'hsl(180deg 50% 50%)',
    );
    expect(formatCss({ space: 'hwb', value: hValue })).toBe(
      'hwb(180deg 50% 50%)',
    );

    dropMatrix(hValue);
  });

  it('should format Lab and LCH (CIE)', () => {
    // CIE Lab uses a Lightness percentage and raw signed floats for chroma/hue components.
    // These spaces allow for colors outside the standard sRGB gamut.
    const labVal = createMatrix('lab');
    labVal.set([0.5, 10, 20]); // Internal normalized 0.5 maps to 50% lightness
    expect(formatCss({ space: 'lab', value: labVal })).toBe('lab(50% 10 20)');

    const lchVal = createMatrix('lch');
    lchVal.set([0.5, 30, 150]);
    expect(formatCss({ space: 'lch', value: lchVal })).toBe(
      'lch(50% 30 150deg)',
    );

    dropMatrix(labVal);
    dropMatrix(lchVal);
  });

  it('should format Oklab and Oklch', () => {
    // Oklab is a perceptually uniform color space designed for better UI transitions.
    // Lightness is scaled to a percentage while a and b remain as raw floats.
    const okVal = createMatrix('oklab');
    okVal.set([0.6, 0.1, -0.1]);
    expect(formatCss({ space: 'oklab', value: okVal })).toBe(
      'oklab(60% 0.1 -0.1)',
    );

    const okchVal = createMatrix('oklch');
    okchVal.set([0.6, 0.2, 270]);
    expect(formatCss({ space: 'oklch', value: okchVal })).toBe(
      'oklch(60% 0.2 270deg)',
    );

    dropMatrix(okVal);
    dropMatrix(okchVal);
  });

  it('should format srgb-linear and xyz variants', () => {
    // The generic color() function handles predefined color spaces like linear-light sRGB and XYZ.
    // This allows for high-bit-depth color specification in professional workflows.
    const val = createMatrix('xyz65');
    val.set([0.95, 1.0, 1.08]);

    // srgb-linear corresponds to gamma-uncorrected sRGB
    expect(formatCss({ space: 'lrgb', value: val })).toBe(
      'color(srgb-linear 0.95 1 1.08)',
    );

    // XYZ spaces are formatted with their respective white-point illuminant (D65 or D50)
    expect(formatCss({ space: 'xyz65', value: val })).toBe(
      'color(xyz-d65 0.95 1 1.08)',
    );
    expect(formatCss({ space: 'xyz50', value: val })).toBe(
      'color(xyz-d50 0.95 1 1.08)',
    );

    dropMatrix(val);
  });

  it('should handle custom spaces via default branch', () => {
    // Coverage for arbitrary color spaces.
    // If a space is not explicitly recognized by the formatter, it is passed
    // directly into the color() functional notation to support forward compatibility.
    const val = createMatrix('rgb');
    val.set([0.1, 0.2, 0.3]);
    const customColor = { space: 'prophoto' as any, value: val };

    expect(formatCss(customColor)).toBe('color(prophoto 0.1 0.2 0.3)');
    dropMatrix(val);
  });

  it('should respect custom precision and handle high precision rounding', () => {
    // Precision control is essential to prevent banding and rounding errors.
    // This verifies mapping between internal floats and external CSS representations.
    const val = createMatrix('rgb');
    val.set([0.1234567, 0, 0]);
    const color: Color = { space: 'rgb', value: val };

    // Standard RGB formatting rounds values to integers for the 0-255 range
    expect(formatCss(color)).toBe('rgb(31 0 0)');

    // For absolute spaces like XYZ, high precision is preserved via the precision parameter
    const highPrec = formatCss(
      { space: 'xyz65', value: val },
      undefined,
      false,
      8,
    );
    expect(highPrec).toBe('color(xyz-d65 0.1234567 0 0)');

    dropMatrix(val);
  });
});
