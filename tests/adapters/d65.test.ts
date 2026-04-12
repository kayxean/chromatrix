import { describe, it } from 'vitest';
import { lrgbToXyz65, oklabToXyz65, xyz65ToLrgb, xyz65ToOklab } from '~/adapters/d65';
import { createMockArray, createMockOutput, expectColorCloseTo, expectColorToBe } from '../factory';

describe('lrgbToXyz65()', () => {
  it('should convert linear RGB to XYZ D65', () => {
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

describe('oklabToXyz65()', () => {
  it('should convert Oklab to XYZ D65', () => {
    const input = createMockArray([1, 0, 0]);
    const output = createMockOutput();
    oklabToXyz65(input, output);
    expectColorCloseTo(output, [0.95047, 1, 1.0883]);
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
    expectColorCloseTo(output, [0.02922, -0.01115, 0.26859]);
  });
});

describe('xyz65ToLrgb()', () => {
  it('should convert XYZ D65 to linear RGB', () => {
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

describe('xyz65ToOklab()', () => {
  it('should convert XYZ D65 to Oklab', () => {
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
