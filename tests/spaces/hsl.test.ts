import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(HSL)', () => {
  const input = createMockArray([0, 0, 1]);
  it('should convert HSL to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert HSL to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert HSL to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert HSL to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert HSL to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'lch');
    expectColorCloseTo(output, [100, 0, 180]);
  });
  it('should convert HSL to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert HSL to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert HSL to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert HSL to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  it('should convert HSL to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
