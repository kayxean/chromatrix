import { describe, it } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(HWB)', () => {
  const input = createMockArray([0, 1, 0]);
  it('should convert HWB to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert HWB to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert HWB to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert HWB to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert HWB to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'lch');
    expectColorCloseTo(output, [100, 0, 180]);
  });
  it('should convert HWB to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert HWB to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert HWB to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert HWB to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  it('should convert HWB to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
