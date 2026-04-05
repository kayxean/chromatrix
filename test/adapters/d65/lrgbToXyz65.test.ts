import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { lrgbToXyz65 } from '~/adapters/d65';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('lrgbToXyz65()', () => {
  it('should convert linear RGB to XYZ D65', () => {
    const input = new Float32Array([1, 1, 1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lrgbToXyz65(input, output);
    expectColorCloseTo(output, [0.95047, 1.0, 1.08883]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lrgbToXyz65(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-1, -1, -1]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    lrgbToXyz65(input, output);
    expectColorCloseTo(output, [-0.95047, -1.0, -1.08883]);
  });
});
