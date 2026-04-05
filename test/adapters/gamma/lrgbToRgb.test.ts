import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { lrgbToRgb } from '~/adapters/gamma';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('lrgbToRgb()', () => {
  it('should convert linear RGB to sRGB', () => {
    const input = new Float32Array([1, 1, 1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lrgbToRgb(input, output);
    expectColorCloseTo(output, [1, 1, 1]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lrgbToRgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-1, -1, -1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lrgbToRgb(input, output);
    expectColorCloseTo(output, [-12.92, -12.92, -12.92]);
  });
});
