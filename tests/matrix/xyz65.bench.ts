import { bench, describe } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convert-color-xyz65', () => {
  const input = createMockArray([0.9505, 1, 1.0888]);
  const output = createMockOutput();
  bench('convert (xyz65-to-rgb)', () => {
    convertColor(input, output, 'xyz65', 'rgb');
  });
  bench('convert (xyz65-to-hsl)', () => {
    convertColor(input, output, 'xyz65', 'hsl');
  });
  bench('convert (xyz65-to-hsv)', () => {
    convertColor(input, output, 'xyz65', 'hsv');
  });
  bench('convert (xyz65-to-hwb)', () => {
    convertColor(input, output, 'xyz65', 'hwb');
  });
  bench('convert (xyz65-to-lab)', () => {
    convertColor(input, output, 'xyz65', 'lab');
  });
  bench('convert (xyz65-to-lch)', () => {
    convertColor(input, output, 'xyz65', 'lch');
  });
  bench('convert (xyz65-to-oklab)', () => {
    convertColor(input, output, 'xyz65', 'oklab');
  });
  bench('convert (xyz65-to-oklch)', () => {
    convertColor(input, output, 'xyz65', 'oklch');
  });
  bench('convert (xyz65-to-lrgb)', () => {
    convertColor(input, output, 'xyz65', 'lrgb');
  });
  bench('convert (xyz65-to-xyz50)', () => {
    convertColor(input, output, 'xyz65', 'xyz50');
  });
});
