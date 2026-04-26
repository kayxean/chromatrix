import { describe, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-lrgb', () => {
  const input = createMockArray([1, 1, 1]);
  test('convert (lrgb-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (lrgb-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (lrgb-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (lrgb-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  test('convert (lrgb-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'lab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (lrgb-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'lch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (lrgb-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (lrgb-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (lrgb-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  test('convert (lrgb-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lrgb', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
