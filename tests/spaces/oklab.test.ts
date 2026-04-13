import { describe, it } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convertColor(OKLAB)', () => {
  const input = createMockArray([1, 0.4, 0.4]);
  it('should convert OKLAB to RGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'rgb');
    expectColorCloseTo(output, [2.0429, -0.6371, -0.6836]);
  });
  it('should convert OKLAB to HSL', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hsl');
    expectColorCloseTo(output, [1.0238, 4.2552, 0.6796]);
  });
  it('should convert OKLAB to HSV', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hsv');
    expectColorCloseTo(output, [1.0238, 1.3346, 2.0429]);
  });
  it('should convert OKLAB to HWB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hwb');
    expectColorCloseTo(output, [1.0238, -0.6836, -1.0429]);
  });
  it('should convert OKLAB to LAB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lab');
    expectColorCloseTo(output, [94.8173, 167.2674, 666.066]);
  });
  it('should convert OKLAB to LCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lch');
    expectColorCloseTo(output, [94.8173, 686.7477, 75.903]);
  });
  it('should convert OKLAB to OKLCH', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'oklch');
    expectColorCloseTo(output, [1, 0.5657, 45]);
  });
  it('should convert OKLAB to LRGB', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lrgb');
    expectColorCloseTo(output, [5.2055, -0.3636, -0.425]);
  });
  it('should convert OKLAB to XYZ50', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'xyz50');
    expectColorCloseTo(output, [2.0692, 0.8719, -0.2663]);
  });
  it('should convert OKLAB to XYZ65', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'xyz65');
    expectColorCloseTo(output, [1.9404, 0.8164, -0.3466]);
  });
});
