import { describe, it } from 'vitest';
import { lrgbToXyz65 } from '~/adapters/d65';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('lrgbToXyz65()', () => {
  it('should convert linear RGB to XYZ D65', () => {
    const input = createMockArray([1, 1, 1]);
    const output = createMockOutput();

    lrgbToXyz65(input, output);
    expectColorCloseTo(output, [0.95047, 1.0, 1.08883]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    lrgbToXyz65(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-1, -1, -1]);
    const output = createMockOutput();

    lrgbToXyz65(input, output);
    expectColorCloseTo(output, [-0.95047, -1.0, -1.08883]);
  });
});
