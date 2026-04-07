import { describe, it } from 'vitest';
import { xyz50ToLab } from '~/adapters/d50';
import {
  createMockArray,
  createMockOutput,
  expectColorCloseTo,
  expectColorToBe,
} from '../../factory';

describe('xyz50ToLab()', () => {
  it('should convert XYZ D50 to Lab', () => {
    const input = createMockArray([0.96422, 1.0, 0.82521]);
    const output = createMockOutput();

    xyz50ToLab(input, output);
    expectColorCloseTo(output, [100, 0, 0]);
  });

  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();

    xyz50ToLab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });

  it('should handle negative values', () => {
    const input = createMockArray([-0.96422, -1.0, -0.82521]);
    const output = createMockOutput();

    xyz50ToLab(input, output);
    expectColorCloseTo(output, [-903.296, 0, 0]);
  });
});
