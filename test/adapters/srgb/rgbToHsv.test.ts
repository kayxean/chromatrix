import { describe, it } from 'vitest';
import { rgbToHsv } from '~/adapters/srgb';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('rgbToHsv()', () => {
  it('should convert RGB to HSV', () => {
    const input = createMockArray([0.25, 0.5, 0.5]);
    const output = createMockOutput();

    rgbToHsv(input, output);
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    rgbToHsv(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-0.25, -0.5, -0.5]);
    const output = createMockOutput();

    rgbToHsv(input, output);
    expectColorCloseTo(output, [0, -1, -0.25]);
  });
});
