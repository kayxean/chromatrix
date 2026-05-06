import { bench, describe } from 'vite-plus/test';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convert-color-lrgb', () => {
  const input = createMockArray([0, 0, 0]);
  const output = createMockOutput();
  bench('convert (lrgb-to-rgb)', () => {
    convertColor(input, output, 'lrgb', 'rgb');
  });
  bench('convert (lrgb-to-hsl)', () => {
    convertColor(input, output, 'lrgb', 'hsl');
  });
  bench('convert (lrgb-to-hsv)', () => {
    convertColor(input, output, 'lrgb', 'hsv');
  });
  bench('convert (lrgb-to-hwb)', () => {
    convertColor(input, output, 'lrgb', 'hwb');
  });
  bench('convert (lrgb-to-lab)', () => {
    convertColor(input, output, 'lrgb', 'lab');
  });
  bench('convert (lrgb-to-lch)', () => {
    convertColor(input, output, 'lrgb', 'lch');
  });
  bench('convert (lrgb-to-oklab)', () => {
    convertColor(input, output, 'lrgb', 'oklab');
  });
  bench('convert (lrgb-to-oklch)', () => {
    convertColor(input, output, 'lrgb', 'oklch');
  });
  bench('convert (lrgb-to-xyz50)', () => {
    convertColor(input, output, 'lrgb', 'xyz50');
  });
  bench('convert (lrgb-to-xyz65)', () => {
    convertColor(input, output, 'lrgb', 'xyz65');
  });
});
