import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { hsvToHsl } from '~/adapters/srgb';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('hsvToHsl()', () => {
  it('should convert HSV to HSL', () => {
    const input = new Float32Array([180, 0.66667, 0.75]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hsvToHsl(input, output);
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hsvToHsl(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-180, -0.66667, -0.75]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hsvToHsl(input, output);
    expectColorCloseTo(output, [-180, 0, -1.0]);
  });
});
