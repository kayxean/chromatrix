import { describe, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-rgb', () => {
  const input = createMockArray([1, 1, 1]);
  test('convert (rgb-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (rgb-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (rgb-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  test('convert (rgb-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (rgb-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'lch');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (rgb-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (rgb-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (rgb-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (rgb-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  test('convert (rgb-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'rgb', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
