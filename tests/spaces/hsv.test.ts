import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(HSV)', () => {
  const input = createMockArray([0, 0, 1]);
  it('should convert HSV to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert HSV to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert HSV to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert HSV to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert HSV to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lch');
    expectColorCloseTo(output, [100, 0, 180]);
  });
  it('should convert HSV to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert HSV to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert HSV to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert HSV to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  it('should convert HSV to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
