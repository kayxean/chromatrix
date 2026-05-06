import { bench, describe } from 'vite-plus/test';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convert-color-hsl', () => {
  const input = createMockArray([0, 0, 0]);
  const output = createMockOutput();
  bench('convert (hsl-to-rgb)', () => {
    convertColor(input, output, 'hsl', 'rgb');
  });
  bench('convert (hsl-to-hsv)', () => {
    convertColor(input, output, 'hsl', 'hsv');
  });
  bench('convert (hsl-to-hwb)', () => {
    convertColor(input, output, 'hsl', 'hwb');
  });
  bench('convert (hsl-to-lab)', () => {
    convertColor(input, output, 'hsl', 'lab');
  });
  bench('convert (hsl-to-lch)', () => {
    convertColor(input, output, 'hsl', 'lch');
  });
  bench('convert (hsl-to-oklab)', () => {
    convertColor(input, output, 'hsl', 'oklab');
  });
  bench('convert (hsl-to-oklch)', () => {
    convertColor(input, output, 'hsl', 'oklch');
  });
  bench('convert (hsl-to-lrgb)', () => {
    convertColor(input, output, 'hsl', 'lrgb');
  });
  bench('convert (hsl-to-xyz50)', () => {
    convertColor(input, output, 'hsl', 'xyz50');
  });
  bench('convert (hsl-to-xyz65)', () => {
    convertColor(input, output, 'hsl', 'xyz65');
  });
});
