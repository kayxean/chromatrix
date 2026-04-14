import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(LAB)', () => {
  const input = createMockArray([100, 0, 0]);
  it('should convert LAB to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert LAB to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert LAB to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert LAB to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert LAB to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'lch');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert LAB to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert LAB to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert LAB to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert LAB to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  it('should convert LAB to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
