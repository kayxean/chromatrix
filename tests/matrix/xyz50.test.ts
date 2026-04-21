import { describe, test } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-xyz50', () => {
  const input = createMockArray([0.96422, 1, 0.82521]);
  test('convert (xyz50-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'rgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (xyz50-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'hsl');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (xyz50-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'hsv');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (xyz50-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'hwb');
    expectColorCloseTo(output, [0, 1, 0]);
  });
  test('convert (xyz50-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'lab');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (xyz50-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'lch');
    expectColorCloseTo(output, [100, 0, 0]);
  });
  test('convert (xyz50-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'oklab');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (xyz50-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'oklch');
    expectColorCloseTo(output, [1, 0, 0]);
  });
  test('convert (xyz50-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'lrgb');
    expectColorCloseTo(output, [1, 1, 1]);
  });
  test('convert (xyz50-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'xyz50', 'xyz65');
    expectColorCloseTo(output, [0.95047, 1, 1.08883]);
  });
});
