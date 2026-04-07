import { describe, it } from 'vitest';
import { xyz65ToOklab } from '~/adapters/d65';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('xyz65ToOklab()', () => {
  it('should convert XYZ D65 to Oklab', () => {
    const input = createMockArray([0.95047, 1.0, 1.08883]);
    const output = createMockOutput();

    xyz65ToOklab(input, output);
    expectColorCloseTo(output, [1, 0, 0]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    xyz65ToOklab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-0.95047, -1.0, -1.08883]);
    const output = createMockOutput();

    xyz65ToOklab(input, output);
    expectColorCloseTo(output, [-1, 0, 0]);
  });
});
