import { describe, it } from 'vitest';
import { oklabToXyz65 } from '~/adapters/d65';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('oklabToXyz65()', () => {
  it('should convert Oklab to XYZ D65', () => {
    const input = createMockArray([1, 0, 0]);
    const output = createMockOutput();

    oklabToXyz65(input, output);
    expectColorCloseTo(output, [0.95047, 1.0, 1.0883]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    oklabToXyz65(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-1, -0.1, -0.1]);
    const output = createMockOutput();

    oklabToXyz65(input, output);
    expectColorCloseTo(output, [-1.11658, -0.96229, -0.5239]);
  });
});
