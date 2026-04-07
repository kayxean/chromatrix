import { describe, it } from 'vitest';
import { xyz65ToLrgb } from '~/adapters/d65';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('xyz65ToLrgb()', () => {
  it('should convert XYZ D65 to linear RGB', () => {
    const input = createMockArray([0.95047, 1.0, 1.08883]);
    const output = createMockOutput();

    xyz65ToLrgb(input, output);
    expectColorCloseTo(output, [1, 1, 1]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    xyz65ToLrgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-0.95047, -1.0, -1.08883]);
    const output = createMockOutput();

    xyz65ToLrgb(input, output);
    expectColorCloseTo(output, [-1, -1, -1]);
  });
});
