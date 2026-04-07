import { describe, it } from 'vitest';
import { lrgbToRgb } from '~/adapters/gamma';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

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
    expectColorCloseTo(output, [-12.92, -12.92, -12.92]);
  });
});
