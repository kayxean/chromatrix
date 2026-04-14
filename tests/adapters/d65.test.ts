import { describe, it } from 'vitest';
import { lrgbToXyz65, oklabToXyz65, xyz65ToLrgb, xyz65ToOklab } from '~/adapters/d65';
import { createMockArray, createMockOutput, expectColorCloseTo, expectColorToBe } from '../factory';

describe('xyz65ToLrgb()', () => {
  it('should convert XYZ65 to LRGB', () => {
    const input = createMockArray([0.95047, 1, 1.08883]);
    const output = createMockOutput();
    xyz65ToLrgb(input, output);
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    xyz65ToLrgb(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-0.95047, -1, -1.08883]);
    const output = createMockOutput();
    xyz65ToLrgb(input, output);
    expectColorCloseTo(output, [-1, -1, -1]);
  });
});

describe('lrgbToXyz65()', () => {
  it('should convert LRGB to XYZ65', () => {
    const input = createMockArray([1, 1, 1]);
    const output = createMockOutput();
    lrgbToXyz65(input, output);
    expectColorCloseTo(output, [0.95047, 1, 1.08883]);
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
    expectColorCloseTo(output, [-0.95047, -1, -1.08883]);
  });
});

describe('xyz65ToOklab()', () => {
  it('should convert XYZ65 to OKLAB', () => {
    const input = createMockArray([0.95047, 1, 1.08883]);
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
    const input = createMockArray([-0.95047, -1, -1.08883]);
    const output = createMockOutput();
    xyz65ToOklab(input, output);
    expectColorCloseTo(output, [-1, 0, 0]);
  });
});

describe('oklabToXyz65()', () => {
  it('should convert OKLAB to XYZ65', () => {
    const input = createMockArray([1, 0.4, 0.4]);
    const output = createMockOutput();
    oklabToXyz65(input, output);
    expectColorCloseTo(output, [1.9404, 0.8164, -0.3466]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    oklabToXyz65(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([0, -0.4, -0.4]);
    const output = createMockOutput();
    oklabToXyz65(input, output);
    expectColorCloseTo(output, [0.0292, -0.0111, 0.2683]);
  });
});
