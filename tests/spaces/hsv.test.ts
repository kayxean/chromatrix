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
    expectColorCloseTo(output, [54.292, 80.812, 69.885]);
  });
  it('should convert HSV to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lch');
    expectColorCloseTo(output, [54.292, 106.839, 40.853]);
  });
  it('should convert HSV to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'oklab');
    expectColorCloseTo(output, [0.628, 0.225, 0.126]);
  });
  it('should convert HSV to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'oklch');
    expectColorCloseTo(output, [0.628, 0.258, 29.227]);
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
    expectColorCloseTo(output, [0.4124, 0.2126, 0.0193]);
  });
});
