import { describe, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-hsl', () => {
  const input = createMockArray([0, 0, 1]);
  test('convert (hsl-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (hsl-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (hsl-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  test('convert (hsl-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (hsl-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'lch');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (hsl-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (hsl-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (hsl-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (hsl-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  test('convert (hsl-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsl', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
