import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { labToLch } from '~/adapters/polar';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('labToLch()', () => {
  it('should convert Lab to LCH', () => {
    const input = new Float32Array([50, 20, 30]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    labToLch(input, output);
    expectColorCloseTo(output, [50, 36.056, 56.31]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    labToLch(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-50, -20, -30]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    labToLch(input, output);
    expectColorCloseTo(output, [-50, 36.056, 236.31]);
  });
});
