import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { xyz65ToOklab } from '~/adapters/d65';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('xyz65ToOklab()', () => {
  it('should convert XYZ D65 to Oklab', () => {
    const input = new Float32Array([0.95047, 1.0, 1.08883]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToOklab(input, output);
    expectColorCloseTo(output, [1, 0, 0]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToOklab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-0.95047, -1.0, -1.08883]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToOklab(input, output);
    expectColorCloseTo(output, [-1, 0, 0]);
  });
});
