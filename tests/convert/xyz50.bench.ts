import { bench, describe } from 'vite-plus/test';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convert-color-xyz50', () => {
  const input = createMockArray([0, 0, 0]);
  const output = createMockOutput();
  bench('convert (xyz50-to-rgb)', () => {
    convertColor(input, output, 'xyz50', 'rgb');
  });
  bench('convert (xyz50-to-hsl)', () => {
    convertColor(input, output, 'xyz50', 'hsl');
  });
  bench('convert (xyz50-to-hsv)', () => {
    convertColor(input, output, 'xyz50', 'hsv');
  });
  bench('convert (xyz50-to-hwb)', () => {
    convertColor(input, output, 'xyz50', 'hwb');
  });
  bench('convert (xyz50-to-lab)', () => {
    convertColor(input, output, 'xyz50', 'lab');
  });
  bench('convert (xyz50-to-lch)', () => {
    convertColor(input, output, 'xyz50', 'lch');
  });
  bench('convert (xyz50-to-oklab)', () => {
    convertColor(input, output, 'xyz50', 'oklab');
  });
  bench('convert (xyz50-to-oklch)', () => {
    convertColor(input, output, 'xyz50', 'oklch');
  });
  bench('convert (xyz50-to-lrgb)', () => {
    convertColor(input, output, 'xyz50', 'lrgb');
  });
  bench('convert (xyz50-to-xyz65)', () => {
    convertColor(input, output, 'xyz50', 'xyz65');
  });
});
