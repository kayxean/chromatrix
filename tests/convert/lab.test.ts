import { describe, test } from 'vite-plus/test';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-lab', () => {
  const input = createMockArray([0, 0, 0]);
  test('convert (lab-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'rgb');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (lab-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hsl');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (lab-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hsv');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (lab-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'hwb');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (lab-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'lch');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (lab-to-oklab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'oklab');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (lab-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'oklch');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (lab-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'lrgb');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (lab-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'xyz50');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (lab-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'lab', 'xyz65');
    expectColorCloseTo(output, [0, 0, 0]);
  });
});
