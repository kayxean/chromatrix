import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { xyz50ToLab } from '~/adapters/d50';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('xyz50ToLab()', () => {
  it('should convert XYZ D50 to Lab', () => {
    const input = new Float32Array([0.96422, 1.0, 0.82521]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz50ToLab(input, output);
    expectColorCloseTo(output, [100, 0, 0]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz50ToLab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-0.96422, -1.0, -0.82521]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    xyz50ToLab(input, output);
    expectColorCloseTo(output, [-903.296, 0, 0]);
  });
});
