import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { rgbToHsv } from '~/adapters/srgb';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('rgbToHsv()', () => {
  it('should convert RGB to HSV', () => {
    const input = new Float32Array([0.25, 0.5, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    rgbToHsv(input, output);
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    rgbToHsv(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-0.25, -0.5, -0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    rgbToHsv(input, output);
    expectColorCloseTo(output, [0, -1, -0.25]);
  });
});
