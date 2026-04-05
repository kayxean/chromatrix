import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { xyz65ToXyz50 } from '~/adapters/cat';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('xyz65ToXyz50()', () => {
  it('should convert XYZ D65 to XYZ D50', () => {
    const input = new Float32Array([0.95047, 1.0, 1.08883]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToXyz50(input, output);
    expectColorCloseTo(output, [0.96422, 1.0, 0.82521]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToXyz50(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-0.95047, -1.0, -1.08883]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz65ToXyz50(input, output);
    expectColorCloseTo(output, [-0.96422, -1.0, -0.82521]);
  });
});
