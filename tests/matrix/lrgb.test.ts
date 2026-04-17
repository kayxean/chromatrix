import { describe, it } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(LRGB)', () => {
  const input = createMockArray([1, 1, 1]);
  it('should convert LRGB to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert LRGB to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert LRGB to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert LRGB to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert LRGB to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert LRGB to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'lch');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert LRGB to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert LRGB to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert LRGB to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  it('should convert LRGB to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
