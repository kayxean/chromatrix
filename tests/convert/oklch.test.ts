import { describe, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-oklch', () => {
  const input = createMockArray([1, 0, 0]);
  test('convert (oklch-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (oklch-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (oklch-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (oklch-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  test('convert (oklch-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (oklch-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (oklch-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (oklch-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (oklch-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8248]);
  });
  test('convert (oklch-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklch', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0883]);
  });
});
