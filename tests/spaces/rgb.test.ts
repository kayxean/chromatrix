import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(RGB)', () => {
  const input = createMockArray([1, 1, 1]);
  it('should convert RGB to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert RGB to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert RGB to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert RGB to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert RGB to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'lch');
    expectColorCloseTo(output, [100, 0, 155.471]);
  });
  it('should convert RGB to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert RGB to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'oklch');
    expectColorCloseTo(output, [1, 0, 263.267]);
  });
  it('should convert RGB to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert RGB to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1.0, 0.8249]);
  });
  it('should convert RGB to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'xyz65');
    expectColorCloseTo(output, [0.9504, 1.0, 1.0888]);
  });
});
