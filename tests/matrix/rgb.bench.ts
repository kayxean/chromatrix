import { bench, describe } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convertColor(RGB)', () => {
  const input = createMockArray([1, 1, 1]);
  const output = createMockOutput();
  bench('convert (rgb-to-hsl)', () => {
    convertColor(input, output, 'rgb', 'hsl');
  });
  bench('convert (rgb-to-hsv)', () => {
    convertColor(input, output, 'rgb', 'hsv');
  });
  bench('convert (rgb-to-hwb)', () => {
    convertColor(input, output, 'rgb', 'hwb');
  });
  bench('convert (rgb-to-lab)', () => {
    convertColor(input, output, 'rgb', 'lab');
  });
  bench('convert (rgb-to-lch)', () => {
    convertColor(input, output, 'rgb', 'lch');
  });
  bench('convert (rgb-to-oklab)', () => {
    convertColor(input, output, 'rgb', 'oklab');
  });
  bench('convert (rgb-to-oklch)', () => {
    convertColor(input, output, 'rgb', 'oklch');
  });
  bench('convert (rgb-to-lrgb)', () => {
    convertColor(input, output, 'rgb', 'lrgb');
  });
  bench('convert (rgb-to-xyz50)', () => {
    convertColor(input, output, 'rgb', 'xyz50');
  });
  bench('convert (rgb-to-xyz65)', () => {
    convertColor(input, output, 'rgb', 'xyz65');
  });
});
