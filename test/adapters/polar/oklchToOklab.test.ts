import { describe, it } from 'vitest';
import { oklchToOklab } from '~/adapters/polar';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('oklchToOklab()', () => {
  it('should convert Oklch to Oklab', () => {
    const input = createMockArray([0.6, 0.2, 120]);
    const output = createMockOutput();

    oklchToOklab(input, output);
    expectColorCloseTo(output, [0.6, -0.1, 0.17321]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    oklchToOklab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-0.6, -0.2, -120]);
    const output = createMockOutput();

    oklchToOklab(input, output);
    expectColorCloseTo(output, [-0.6, 0.1, 0.17321]);
  });
});
