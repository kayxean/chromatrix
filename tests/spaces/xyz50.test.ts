import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(XYZ50)', () => {
  const input = createMockArray([0.9642, 1, 0.8252]);
  it('should convert XYZ50 to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert XYZ50 to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'hsl');
    expectColorCloseTo(output, [120, 0, 1]);
  });
  it('should convert XYZ50 to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'hsv');
    expectColorCloseTo(output, [120, 0, 1]);
  });
  it('should convert XYZ50 to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'hwb');
    expectColorCloseTo(output, [120, 1, 0]);
  });
  it('should convert XYZ50 to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'lab');
    expectColorCloseTo(output, [100, -0.0035, 0.0008]);
  });
  it('should convert XYZ50 to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'lch');
    expectColorCloseTo(output, [100, 0.0035, 166.861]);
  });
  it('should convert XYZ50 to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'oklab');
    expectColorCloseTo(output, [1, 0, -0.0001]);
  });
  it('should convert XYZ50 to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'oklch');
    expectColorCloseTo(output, [1, 0.0001, 256.3872]);
  });
  it('should convert XYZ50 to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'lrgb');
    expectColorCloseTo(output, [0.9999, 1, 1]);
  });
  it('should convert XYZ50 to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
