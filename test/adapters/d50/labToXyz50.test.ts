import { describe, it } from 'vitest';
import { labToXyz50 } from '~/adapters/d50';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('labToXyz50()', () => {
  it('should convert Lab to XYZ D50', () => {
    const input = createMockArray([100, 0, 0]);
    const output = createMockOutput();

    labToXyz50(input, output);
    expectColorCloseTo(output, [0.96422, 1.0, 0.82521]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    labToXyz50(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-50, -20, -30]);
    const output = createMockOutput();

    labToXyz50(input, output);
    expectColorCloseTo(output, [-0.05833, -0.05535, -0.02978]);
  });
});
