import { describe, it } from 'vitest';
import { labToXyz50, xyz50ToLab } from '~/adapters/d50';
import { createMockArray, createMockOutput, expectColorCloseTo, expectColorToBe } from '../factory';

describe('xyz50ToLab()', () => {
  it('should convert XYZ50 to LAB', () => {
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
    expectColorCloseTo(output, [-903.2963, 0.0001, 0]);
  });
});

describe('labToXyz50()', () => {
  it('should convert LAB to XYZ50', () => {
    const input = createMockArray([100, 128, 128]);
    const output = createMockOutput();
    labToXyz50(input, output);
    expectColorCloseTo(output, [1.9105, 1, 0.0385]);
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
    expectColorCloseTo(output, [-0.0317, 0, 0.3885]);
  });
});
