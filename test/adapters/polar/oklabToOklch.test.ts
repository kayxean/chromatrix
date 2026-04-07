import { describe, it } from 'vitest';
import { oklabToOklch } from '~/adapters/polar';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('oklabToOklch()', () => {
  it('should convert Oklab to Oklch', () => {
    const input = createMockArray([0.5, 0.15, 0.1]);
    const output = createMockOutput();

    oklabToOklch(input, output);
    expectColorCloseTo(output, [0.5, 0.18028, 33.69]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    oklabToOklch(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-0.5, -0.15, -0.1]);
    const output = createMockOutput();

    oklabToOklch(input, output);
    expectColorCloseTo(output, [-0.5, 0.18028, 213.69]);
  });
});
