import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { lchToLab } from '~/adapters/polar';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('lchToLab()', () => {
  it('should convert LCH to Lab', () => {
    const input = new Float32Array([50, 36.0555, 56.3099]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lchToLab(input, output);
    expectColorCloseTo(output, [50, 20, 30]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lchToLab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-50, -36.0555, -56.3099]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lchToLab(input, output);
    expectColorCloseTo(output, [-50, -20, 30]);
  });
});
