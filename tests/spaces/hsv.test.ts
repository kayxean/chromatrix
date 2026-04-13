import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(HSV)', () => {
  const input = createMockArray([360, 1, 1]);
  it('should convert HSV to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'rgb');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert HSV to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'hsl');
    expectColorCloseTo(output, [360, 1, 0.5]);
  });
  it('should convert HSV to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'hwb');
    expectColorCloseTo(output, [360, 0, 0]);
  });
  it('should convert HSV to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lab');
    expectColorCloseTo(output, [54.2917, 80.8124, 69.8851]);
  });
  it('should convert HSV to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lch');
    expectColorCloseTo(output, [54.2917, 106.839, 40.8526]);
  });
  it('should convert HSV to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'oklab');
    expectColorCloseTo(output, [0.628, 0.2248, 0.1258]);
  });
  it('should convert HSV to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'oklch');
    expectColorCloseTo(output, [0.628, 0.2576, 29.2272]);
  });
  it('should convert HSV to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lrgb');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert HSV to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'xyz50');
    expectColorCloseTo(output, [0.4361, 0.2225, 0.0139]);
  });
  it('should convert HSV to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'xyz65');
    expectColorCloseTo(output, [0.4125, 0.2127, 0.0193]);
  });
});
