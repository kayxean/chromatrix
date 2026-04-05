import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { hsvToRgb } from '~/adapters/srgb';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('hsvToRgb()', () => {
  it('should convert HSV to RGB', () => {
    const input = new Float32Array([180, 0.5, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hsvToRgb(input, output);
    expectColorCloseTo(output, [0.25, 0.5, 0.5]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hsvToRgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-180, -0.5, -0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hsvToRgb(input, output);
    expectColorCloseTo(output, [-0.75, -1.0, -0.5]);
  });
});
