import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { xyz50ToXyz65 } from '~/adapters/cat';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('xyz50ToXyz65()', () => {
  it('should convert XYZ D50 to XYZ D65', () => {
    const input = new Float32Array([0.96422, 1.0, 0.82521]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz50ToXyz65(input, output);
    expectColorCloseTo(output, [0.95047, 1.0, 1.08883]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz50ToXyz65(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-0.96422, -1.0, -0.82521]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz50ToXyz65(input, output);
    expectColorCloseTo(output, [-0.95047, -1.0, -1.08883]);
  });
});
