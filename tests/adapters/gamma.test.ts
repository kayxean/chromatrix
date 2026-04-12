import { describe, it } from 'vitest';
import { lrgbToRgb, rgbToLrgb } from '~/adapters/gamma';
import { createMockArray, createMockOutput, expectColorCloseTo, expectColorToBe } from '../factory';

describe('lrgbToRgb()', () => {
  it('should convert linear RGB to sRGB', () => {
    const input = createMockArray([1, 1, 1]);
    const output = createMockOutput();
    lrgbToRgb(input, output);
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    lrgbToRgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-1, -1, -1]);
    const output = createMockOutput();
    lrgbToRgb(input, output);
    expectColorCloseTo(output, [-1, -1, -1]);
  });
});

describe('rgbToLrgb()', () => {
  it('should convert sRGB to linear RGB', () => {
    const input = createMockArray([1, 1, 1]);
    const output = createMockOutput();
    rgbToLrgb(input, output);
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    rgbToLrgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-1, -1, -1]);
    const output = createMockOutput();
    rgbToLrgb(input, output);
    expectColorCloseTo(output, [-1, -1, -1]);
  });
});
