import { describe, it } from 'vitest';
import { lchToLab } from '~/adapters/polar';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('lchToLab()', () => {
  it('should convert LCH to Lab', () => {
    const input = createMockArray([50, 36.0555, 56.3099]);
    const output = createMockOutput();

    lchToLab(input, output);
    expectColorCloseTo(output, [50, 20, 30]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    lchToLab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-50, -36.0555, -56.3099]);
    const output = createMockOutput();

    lchToLab(input, output);
    expectColorCloseTo(output, [-50, -20, 30]);
  });
});
