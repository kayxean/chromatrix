import { describe, it } from 'vitest';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from '~/adapters/polar';
import { createMockArray, createMockOutput, expectColorCloseTo, expectColorToBe } from '../factory';

describe('labToLch()', () => {
  it('should convert LAB to LCH', () => {
    const input = createMockArray([100, 128, 128]);
    const output = createMockOutput();
    labToLch(input, output);
    expectColorCloseTo(output, [100, 181.0193, 45]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    labToLch(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-100, -128, -128]);
    const output = createMockOutput();
    labToLch(input, output);
    expectColorCloseTo(output, [-100, 181.0193, 225]);
  });
});

describe('lchToLab()', () => {
  it('should convert LCH to LAB', () => {
    const input = createMockArray([100, 181.019, 360]);
    const output = createMockOutput();
    lchToLab(input, output);
    expectColorCloseTo(output, [100, 181.019, 0]);
  });
  it('should handle zero values', () => {
    const input = createMockArray([0, 0, 0]);
    const output = createMockOutput();
    lchToLab(input, output);
    expectColorToBe(output, [0, 0, 0]);
  });
  it('should handle negative values', () => {
    const input = createMockArray([-100, -181.019, -360]);
    const output = createMockOutput();
    lchToLab(input, output);
    expectColorCloseTo(output, [-100, -181.019, 0]);
  });
});

describe('oklabToOklch()', () => {
  it('should convert OKLAB to OKLCH', () => {
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
  it('should convert OKLCH to OKLAB', () => {
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
    const input = createMockArray([-1, -0.4, -360]);
    const output = createMockOutput();
    oklchToOklab(input, output);
    expectColorCloseTo(output, [-1, -0.4, 0]);
  });
});
