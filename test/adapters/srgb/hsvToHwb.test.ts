import { describe, it } from 'vitest';
import { hsvToHwb } from '~/adapters/srgb';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('hsvToHwb()', () => {
  it('should convert HSV to HWB', () => {
    const input = createMockArray([180, 0.5, 0.5]);
    const output = createMockOutput();

    hsvToHwb(input, output);
    expectColorCloseTo(output, [180, 0.25, 0.5]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    hsvToHwb(input, output);
    expectColorToBe(output, [0, 0, 1]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-180, -0.5, -0.5]);
    const output = createMockOutput();

    hsvToHwb(input, output);
    expectColorCloseTo(output, [-180, -0.75, 1.5]);
  });
});
