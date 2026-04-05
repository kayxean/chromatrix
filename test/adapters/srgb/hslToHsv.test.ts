import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { hslToHsv } from '~/adapters/srgb';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('hslToHsv()', () => {
  it('should convert HSL to HSV', () => {
    const input = new Float32Array([180, 0.5, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hslToHsv(input, output);
    expectColorCloseTo(output, [180, 0.66667, 0.75]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hslToHsv(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-180, -0.5, -0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hslToHsv(input, output);
    expectColorCloseTo(output, [-180, -2, -0.25]);
  });
});
