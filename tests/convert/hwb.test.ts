import { describe, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-hwb', () => {
  const input = createMockArray([0, 1, 0]);
  test('convert (hwb-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (hwb-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (hwb-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (hwb-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (hwb-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'lch');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (hwb-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (hwb-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (hwb-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (hwb-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  test('convert (hwb-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hwb', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
