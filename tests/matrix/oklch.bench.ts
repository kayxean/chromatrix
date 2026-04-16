import { bench, describe } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convertColor(OKLCH)', () => {
  const input = createMockArray([1, 0, 0]);
  const output = createMockOutput();
  bench('convert (oklch-to-rgb)', () => {
    convertColor(input, output, 'oklch', 'rgb');
  });
  bench('convert (oklch-to-hsl)', () => {
    convertColor(input, output, 'oklch', 'hsl');
  });
  bench('convert (oklch-to-hsv)', () => {
    convertColor(input, output, 'oklch', 'hsv');
  });
  bench('convert (oklch-to-hwb)', () => {
    convertColor(input, output, 'oklch', 'hwb');
  });
  bench('convert (oklch-to-lab)', () => {
    convertColor(input, output, 'oklch', 'lab');
  });
  bench('convert (oklch-to-lch)', () => {
    convertColor(input, output, 'oklch', 'lch');
  });
  bench('convert (oklch-to-oklab)', () => {
    convertColor(input, output, 'oklch', 'oklab');
  });
  bench('convert (oklch-to-lrgb)', () => {
    convertColor(input, output, 'oklch', 'lrgb');
  });
  bench('convert (oklch-to-xyz50)', () => {
    convertColor(input, output, 'oklch', 'xyz50');
  });
  bench('convert (oklch-to-xyz65)', () => {
    convertColor(input, output, 'oklch', 'xyz65');
  });
});
