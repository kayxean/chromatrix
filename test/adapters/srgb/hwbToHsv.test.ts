import type { ColorArray } from '~/types';
import { describe, it } from 'vitest';
import { hwbToHsv } from '~/adapters/srgb';
import { expectColorCloseTo, expectColorToBe } from '../../expect';

describe('hwbToHsv()', () => {
  it('should convert HWB to HSV', () => {
    const input = new Float32Array([180, 0.25, 0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hwbToHsv(input, output);
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should handle zero values', () => {
    const input = new Float32Array([0, 0, 0]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hwbToHsv(input, output);
    expectColorToBe(output, [0, 1, 1]);
  });

  it('should handle negative values', () => {
    const input = new Float32Array([-180, -0.25, -0.5]) as ColorArray;
    const output = new Float32Array(3) as ColorArray;

    hwbToHsv(input, output);
    expectColorCloseTo(output, [-180, 1.16667, 1.5]);
  });
});
