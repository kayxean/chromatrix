import { describe, it } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(OKLAB)', () => {
  const input = createMockArray([1, 0, 0]);
  it('should convert OKLAB to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert OKLAB to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert OKLAB to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  it('should convert OKLAB to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  it('should convert OKLAB to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert OKLAB to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lch');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  it('should convert OKLAB to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  it('should convert OKLAB to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  it('should convert OKLAB to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8248]);
  });
  it('should convert OKLAB to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0883]);
  });
});
