import { describe, test } from 'vite-plus/test';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput, expectColorCloseTo } from '../factory';

describe('convert-color-oklab', () => {
  const input = createMockArray([0, 0, 0]);
  test('convert (oklab-to-rgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'rgb');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (oklab-to-hsl)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hsl');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (oklab-to-hsv)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hsv');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (oklab-to-hwb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'hwb');
    expectColorCloseTo(output, [0, 0, 1]);
  });
  test('convert (oklab-to-lab)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lab');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (oklab-to-lch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lch');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (oklab-to-oklch)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'oklch');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (oklab-to-lrgb)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'lrgb');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (oklab-to-xyz50)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'xyz50');
    expectColorCloseTo(output, [0, 0, 0]);
  });
  test('convert (oklab-to-xyz65)', () => {
    const output = createMockOutput();
    convertColor(input, output, 'oklab', 'xyz65');
    expectColorCloseTo(output, [0, 0, 0]);
  });
});
