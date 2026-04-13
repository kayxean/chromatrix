import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(OKLCH)', () => {
  const input = createMockArray([1, 0.4, 360]);
  it('should convert OKLCH to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'rgb');
    expectColorCloseTo(output, [1.7524, 0.1266, 0.9576]);
  });
  it('should convert OKLCH to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hsl');
    expectColorCloseTo(output, [329.3343, 13.441, 0.9395]);
  });
  it('should convert OKLCH to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hsv');
    expectColorCloseTo(output, [329.3343, 0.9277, 1.7524]);
  });
  it('should convert OKLCH to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hwb');
    expectColorCloseTo(output, [329.3343, 0.1266, -0.7524]);
  });
  it('should convert OKLCH to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lab');
    expectColorCloseTo(output, [94.9594, 128.4221, 2.0804]);
  });
  it('should convert OKLCH to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lch');
    expectColorCloseTo(output, [94.9594, 128.4389, 0.9281]);
  });
  it('should convert OKLCH to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'oklab');
    expectColorCloseTo(output, [1, 0.4, 0]);
  });
  it('should convert OKLCH to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lrgb');
    expectColorCloseTo(output, [3.6403, 0.0144, 0.9057]);
  });
  it('should convert OKLCH to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'xyz50');
    expectColorCloseTo(output, [1.7226, 0.8752, 0.6989]);
  });
  it('should convert OKLCH to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'xyz65');
    expectColorCloseTo(output, [1.67, 0.8499, 0.9328]);
  });
});
