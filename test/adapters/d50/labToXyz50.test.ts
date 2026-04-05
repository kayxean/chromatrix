import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { labToXyz50 } from '~/adapters/d50';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('labToXyz50()', () => {
  it('should convert Lab to XYZ D50', () => {
    const input = new Float32Array([100, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    labToXyz50(input, output);
    expectColorCloseTo(output, [0.96422, 1.0, 0.82521]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    labToXyz50(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-50, -20, -30]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    labToXyz50(input, output);
    expectColorCloseTo(output, [-0.05833, -0.05535, -0.02978]);
  });
});
