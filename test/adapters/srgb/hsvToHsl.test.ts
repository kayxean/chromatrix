import { describe, it } from 'vitest';
import { hsvToHsl } from '~/adapters/srgb';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('hsvToHsl()', () => {
  it('should convert HSV to HSL', () => {
    const input = createMockArray([180, 0.66667, 0.75]);
    const output = createMockOutput();

    hsvToHsl(input, output);
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    hsvToHsl(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-180, -0.66667, -0.75]);
    const output = createMockOutput();

    hsvToHsl(input, output);
    expectColorCloseTo(output, [-180, 0, -1.0]);
  });
});
