import { describe, it } from 'vitest';
import { hwbToHsv } from '~/adapters/srgb';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('hwbToHsv()', () => {
  it('should convert HWB to HSV', () => {
    const input = createMockArray([180, 0.25, 0.5]);
    const output = createMockOutput();

    hwbToHsv(input, output);
    expectColorCloseTo(output, [180, 0.5, 0.5]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    hwbToHsv(input, output);
    expectColorToBe(output, [0, 1, 1]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-180, -0.25, -0.5]);
    const output = createMockOutput();

    hwbToHsv(input, output);
    expectColorCloseTo(output, [-180, 1.16667, 1.5]);
  });
});
