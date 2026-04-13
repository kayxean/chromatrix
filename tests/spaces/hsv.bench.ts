import { bench, describe } from 'vitest';
import { convertColor } from '~/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convertColor(HSV)', () => {
  const input = createMockArray([360, 1, 1]);
  const output = createMockOutput();
  bench('convert (hsv-to-rgb)', () => {
    convertColor(input, output, 'hsv', 'rgb');
  });
  bench('convert (hsv-to-hsl)', () => {
    convertColor(input, output, 'hsv', 'hsl');
  });
  bench('convert (hsv-to-hwb)', () => {
    convertColor(input, output, 'hsv', 'hwb');
  });
  bench('convert (hsv-to-lab)', () => {
    convertColor(input, output, 'hsv', 'lab');
  });
  bench('convert (hsv-to-lch)', () => {
    convertColor(input, output, 'hsv', 'lch');
  });
  bench('convert (hsv-to-oklab)', () => {
    convertColor(input, output, 'hsv', 'oklab');
  });
  bench('convert (hsv-to-oklch)', () => {
    convertColor(input, output, 'hsv', 'oklch');
  });
  bench('convert (hsv-to-lrgb)', () => {
    convertColor(input, output, 'hsv', 'lrgb');
  });
  bench('convert (hsv-to-xyz50)', () => {
    convertColor(input, output, 'hsv', 'xyz50');
  });
  bench('convert (hsv-to-xyz65)', () => {
    convertColor(input, output, 'hsv', 'xyz65');
  });
});
