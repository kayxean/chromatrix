import { bench, describe } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convert-color-hwb', () => {
  const input = createMockArray([0, 1, 0]);
  const output = createMockOutput();
  bench('convert (hwb-to-rgb)', () => {
    convertColor(input, output, 'hwb', 'rgb');
  });
  bench('convert (hwb-to-hsl)', () => {
    convertColor(input, output, 'hwb', 'hsl');
  });
  bench('convert (hwb-to-hsv)', () => {
    convertColor(input, output, 'hwb', 'hsv');
  });
  bench('convert (hwb-to-lab)', () => {
    convertColor(input, output, 'hwb', 'lab');
  });
  bench('convert (hwb-to-lch)', () => {
    convertColor(input, output, 'hwb', 'lch');
  });
  bench('convert (hwb-to-oklab)', () => {
    convertColor(input, output, 'hwb', 'oklab');
  });
  bench('convert (hwb-to-oklch)', () => {
    convertColor(input, output, 'hwb', 'oklch');
  });
  bench('convert (hwb-to-lrgb)', () => {
    convertColor(input, output, 'hwb', 'lrgb');
  });
  bench('convert (hwb-to-xyz50)', () => {
    convertColor(input, output, 'hwb', 'xyz50');
  });
  bench('convert (hwb-to-xyz65)', () => {
    convertColor(input, output, 'hwb', 'xyz65');
  });
});
