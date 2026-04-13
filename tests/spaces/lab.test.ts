import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(LAB)', () => {
  const input = createMockArray([100, 128, 128]);
  it('should convert LAB to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'rgb');
    expectColorCloseTo(output, [1.8919, 0.2424, -0.2134]);
  });
  it('should convert LAB to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hsl');
    expectColorCloseTo(output, [12.991, 6.5489, 0.8393]);
  });
  it('should convert LAB to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hsv');
    expectColorCloseTo(output, [12.991, 1.1128, 1.8919]);
  });
  it('should convert LAB to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hwb');
    expectColorCloseTo(output, [12.991, -0.2134, -0.8919]);
  });
  it('should convert LAB to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'lch');
    expectColorCloseTo(output, [100, 181.0193, 45]);
  });
  it('should convert LAB to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'oklab');
    expectColorCloseTo(output, [1.0342, 0.3507, 0.2185]);
  });
  it('should convert LAB to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'oklch');
    expectColorCloseTo(output, [1.0342, 0.4132, 31.9246]);
  });
  it('should convert LAB to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'lrgb');
    expectColorCloseTo(output, [4.3514, 0.0475, -0.0374]);
  });
  it('should convert LAB to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'xyz50');
    expectColorCloseTo(output, [1.9105, 1, 0.0385]);
  });
  it('should convert LAB to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'xyz65');
    expectColorCloseTo(output, [1.805, 0.9567, 0.0542]);
  });
});
