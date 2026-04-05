import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { oklabToOklch } from '~/adapters/polar';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('oklabToOklch()', () => {
  it('should convert Oklab to Oklch', () => {
    const input = new Float32Array([0.5, 0.15, 0.1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    oklabToOklch(input, output);
    expectColorCloseTo(output, [0.5, 0.18028, 33.69]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    oklabToOklch(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-0.5, -0.15, -0.1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    oklabToOklch(input, output);
    expectColorCloseTo(output, [-0.5, 0.18028, 213.69]);
  });
});
