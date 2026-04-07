import { describe, it } from 'vitest';
import { hslToHsv } from '~/adapters/srgb';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('hslToHsv()', () => {
  it('should convert HSL to HSV', () => {
    const input = createMockArray([180, 0.5, 0.5]);
    const output = createMockOutput();

    hslToHsv(input, output);
    expectColorCloseTo(output, [180, 0.66667, 0.75]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    hslToHsv(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-180, -0.5, -0.5]);
    const output = createMockOutput();

    hslToHsv(input, output);
    expectColorCloseTo(output, [-180, -2, -0.25]);
  });
});
