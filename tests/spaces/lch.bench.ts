import { bench, describe } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convertColor(LCH)', () => {
  const input = createMockArray([100, 181.019, 360]);
  const output = createMockOutput();
  bench('convert (lch-to-rgb)', () => {
    convertColor(input, output, 'lch', 'rgb');
  });
  bench('convert (lch-to-hsl)', () => {
    convertColor(input, output, 'lch', 'hsl');
  });
  bench('convert (lch-to-hsv)', () => {
    convertColor(input, output, 'lch', 'hsv');
  });
  bench('convert (lch-to-hwb)', () => {
    convertColor(input, output, 'lch', 'hwb');
  });
  bench('convert (lch-to-lab)', () => {
    convertColor(input, output, 'lch', 'lab');
  });
  bench('convert (lch-to-oklab)', () => {
    convertColor(input, output, 'lch', 'oklab');
  });
  bench('convert (lch-to-oklch)', () => {
    convertColor(input, output, 'lch', 'oklch');
  });
  bench('convert (lch-to-lrgb)', () => {
    convertColor(input, output, 'lch', 'lrgb');
  });
  bench('convert (lch-to-xyz50)', () => {
    convertColor(input, output, 'lch', 'xyz50');
  });
  bench('convert (lch-to-xyz65)', () => {
    convertColor(input, output, 'lch', 'xyz65');
  });
});
