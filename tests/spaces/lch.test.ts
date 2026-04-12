import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(LCH)', () => {
  const input = createMockArray([50, 70.711, 45]);
  it('should convert LCH to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'rgb');
    expectColorCloseTo(output, [0.794, 0.296, 0.136]);
  });
  it('should convert LCH to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hsl');
    expectColorCloseTo(output, [14.586, 0.7072, 0.465]);
  });
  it('should convert LCH to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hsv');
    expectColorCloseTo(output, [14.586, 0.828, 0.794]);
  });
  it('should convert LCH to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hwb');
    expectColorCloseTo(output, [14.586, 0.136, 0.206]);
  });
  it('should convert LCH to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'lab');
    expectColorCloseTo(output, [50, 50, 50]);
  });
  it('should convert LCH to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'oklab');
    expectColorCloseTo(output, [0.581, 0.135, 0.103]);
  });
  it('should convert LCH to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'oklch');
    expectColorCloseTo(output, [0.581, 0.17, 37.438]);
  });
  it('should convert LCH to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'lrgb');
    expectColorCloseTo(output, [0.594, 0.071, 0.016]);
  });
  it('should convert LCH to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'xyz50');
    expectColorCloseTo(output, [0.289, 0.184, 0.027]);
  });
  it('should convert LCH to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'xyz65');
    expectColorCloseTo(output, [0.273, 0.178, 0.035]);
  });
});
