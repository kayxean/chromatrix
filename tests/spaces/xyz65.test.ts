import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(XYZ65)', () => {
  const input = createMockArray([0.95047, 1, 1.08883]);
  it('should convert XYZ65 to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert XYZ65 to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert XYZ65 to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert XYZ65 to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert XYZ65 to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert XYZ65 to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'lch');
    expectColorCloseTo(output, [100, 0, 151.3646]);
  });
  it('should convert XYZ65 to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'oklab');
    expectColorCloseTo(output, [1, 0, -0.0001]);
  });
  it('should convert XYZ65 to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'oklch');
    expectColorCloseTo(output, [1, 0.0001, 263.3055]);
  });
  it('should convert XYZ65 to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert XYZ65 to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
});
