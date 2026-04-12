import { describe, it } from 'vitest';
import { labToXyz50, xyz50ToLab } from '~/adapters/d50';
import { createMockArray, createMockOutput, expectColorCloseTo, expectColorToBe } from '../factory';

describe('labToXyz50()', () => {
  it('should convert Lab to XYZ D50', () => {
    const input = createMockArray([1, 0, 0]);
    const output = createMockOutput();
    labToXyz50(input, output);
    expectColorCloseTo(output, [0.001067, 0.001107, 0.00091]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    labToXyz50(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([0, -128, -128]);
    const output = createMockOutput();
    labToXyz50(input, output);
    expectColorCloseTo(output, [-0.031699, 0, 0.38833]);
  });
});

describe('xyz50ToLab()', () => {
  it('should convert XYZ D50 to Lab', () => {
    const input = createMockArray([0.96422, 1, 0.82521]);
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
    const input = createMockArray([-0.96422, -1, -0.82521]);
    const output = createMockOutput();
    xyz50ToLab(input, output);
    expectColorCloseTo(output, [-903.296325, 0, 0]);
  });
});
