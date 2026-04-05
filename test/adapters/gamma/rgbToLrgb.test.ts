import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { rgbToLrgb } from '~/adapters/gamma';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('rgbToLrgb()', () => {
  it('should convert sRGB to linear RGB', () => {
    const input = new Float32Array([1, 1, 1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    rgbToLrgb(input, output);
    expectColorCloseTo(output, [1, 1, 1]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    rgbToLrgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-1, -1, -1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    rgbToLrgb(input, output);
    expectColorCloseTo(output, [-0.0774, -0.0774, -0.0774]);
  });
});
