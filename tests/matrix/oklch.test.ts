import { describe, it } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(OKLCH)', () => {
  const input = createMockArray([1, 0, 0]);
  it('should convert OKLCH to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert OKLCH to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert OKLCH to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert OKLCH to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert OKLCH to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert OKLCH to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lch');
    expectColorCloseTo(output, [100, 0, 180]);
  });
  it('should convert OKLCH to OKLAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert OKLCH to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert OKLCH to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8248]);
  });
  it('should convert OKLCH to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0883]);
  });
});
