import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { xyz65ToLrgb } from '~/adapters/d65';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('xyz65ToLrgb()', () => {
  it('should convert XYZ D65 to linear RGB', () => {
    const input = new Float32Array([0.95047, 1.0, 1.08883]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToLrgb(input, output);
    expectColorCloseTo(output, [1, 1, 1]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToLrgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-0.95047, -1.0, -1.08883]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToLrgb(input, output);
    expectColorCloseTo(output, [-1, -1, -1]);
  });
});
