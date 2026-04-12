import { describe, it } from 'vitest';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from '~/adapters/polar';
import { createMockArray, createMockOutput, expectColorCloseTo, expectColorToBe } from '../factory';

describe('labToLch()', () => {
  it('should convert Lab to LCH', () => {
    const input = createMockArray([1, 128, 128]);
    const output = createMockOutput();
    labToLch(input, output);
    expectColorCloseTo(output, [1, 181.019, 45]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    labToLch(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([0, -128, -128]);
    const output = createMockOutput();
    labToLch(input, output);
    expectColorCloseTo(output, [0, 181.019, 225]);
  });
});

describe('lchToLab()', () => {
  it('should convert LCH to Lab', () => {
    const input = createMockArray([1, 150, 360]);
    const output = createMockOutput();
    lchToLab(input, output);
    expectColorCloseTo(output, [1, 150, 0]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    lchToLab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([0, -150, -360]);
    const output = createMockOutput();
    lchToLab(input, output);
    expectColorCloseTo(output, [0, -150, 0]);
  });
});

describe('oklabToOklch()', () => {
  it('should convert Oklab to Oklch', () => {
    const input = createMockArray([1, 0.4, 0.4]);
    const output = createMockOutput();
    oklabToOklch(input, output);
    expectColorCloseTo(output, [1, 0.56569, 45]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    oklabToOklch(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([0, -0.4, -0.4]);
    const output = createMockOutput();
    oklabToOklch(input, output);
    expectColorCloseTo(output, [0, 0.56569, 225]);
  });
});

describe('oklchToOklab()', () => {
  it('should convert Oklch to Oklab', () => {
    const input = createMockArray([1, 0.4, 360]);
    const output = createMockOutput();
    oklchToOklab(input, output);
    expectColorCloseTo(output, [1, 0.4, 0]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    oklchToOklab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([0, -0.4, -360]);
    const output = createMockOutput();
    oklchToOklab(input, output);
    expectColorCloseTo(output, [0, -0.4, 0]);
  });
});
