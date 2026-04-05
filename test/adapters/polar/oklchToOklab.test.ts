import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { oklchToOklab } from '~/adapters/polar';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('oklchToOklab()', () => {
  it('should convert Oklch to Oklab', () => {
    const input = new Float32Array([0.6, 0.2, 120]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    oklchToOklab(input, output);
    expectColorCloseTo(output, [0.6, -0.1, 0.17321]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    oklchToOklab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-0.6, -0.2, -120]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    oklchToOklab(input, output);
    expectColorCloseTo(output, [-0.6, 0.1, 0.17321]);
  });
});
