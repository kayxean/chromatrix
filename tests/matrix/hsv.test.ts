import { describe, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-hsv', () => {
  const input = createMockArray([0, 0, 1]);
  test('convert (hsv-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (hsv-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (hsv-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  test('convert (hsv-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (hsv-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lch');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (hsv-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (hsv-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (hsv-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (hsv-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'xyz50');
    expectColorCloseTo(output, [0.9642, 1, 0.8252]);
  });
  test('convert (hsv-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'hsv', 'xyz65');
    expectColorCloseTo(output, [0.9505, 1, 1.0888]);
  });
});
