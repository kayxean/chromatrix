import { describe, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-lch', () => {
  const input = createMockArray([100, 0, 0]);
  test('convert (lch-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (lch-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (lch-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (lch-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  test('convert (lch-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (lch-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (lch-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (lch-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (lch-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  test('convert (lch-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lch', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
