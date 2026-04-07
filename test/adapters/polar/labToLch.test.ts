import { describe, it } from 'vitest';
import { labToLch } from '~/adapters/polar';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('labToLch()', () => {
  it('should convert Lab to LCH', () => {
    const input = createMockArray([50, 20, 30]);
    const output = createMockOutput();

    labToLch(input, output);
    expectColorCloseTo(output, [50, 36.056, 56.31]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    labToLch(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-50, -20, -30]);
    const output = createMockOutput();

    labToLch(input, output);
    expectColorCloseTo(output, [-50, 36.056, 236.31]);
  });
});
