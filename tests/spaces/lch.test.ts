import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(LCH)', () => {
  const input = createMockArray([100, 0, 180]);
  it('should convert LCH to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert LCH to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert LCH to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert LCH to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert LCH to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert LCH to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert LCH to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert LCH to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert LCH to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  it('should convert LCH to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
