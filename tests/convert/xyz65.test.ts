import { describe, test } from 'vite-plus/test';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-xyz65', () => {
  const input = createMockArray([0, 0, 0]);
  test('convert (xyz65-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'rgb');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (xyz65-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'hsl');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (xyz65-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'hsv');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (xyz65-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'hwb');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (xyz65-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'lab');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (xyz65-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'lch');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (xyz65-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'oklab');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (xyz65-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'oklch');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (xyz65-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'lrgb');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (xyz65-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz65', 'xyz50');
    expectColorCloseTo(output, [0, 0, 0]);
  });
});
