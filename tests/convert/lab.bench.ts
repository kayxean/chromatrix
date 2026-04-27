import { bench, describe } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convert-color-lab', () => {
  const input = createMockArray([1, 0, 0]);
  const output = createMockOutput();
  bench('convert (lab-to-rgb)', () => {
    convertColor(input, output, 'lab', 'rgb');
  });
  bench('convert (lab-to-hsl)', () => {
    convertColor(input, output, 'lab', 'hsl');
  });
  bench('convert (lab-to-hsv)', () => {
    convertColor(input, output, 'lab', 'hsv');
  });
  bench('convert (lab-to-hwb)', () => {
    convertColor(input, output, 'lab', 'hwb');
  });
  bench('convert (lab-to-lch)', () => {
    convertColor(input, output, 'lab', 'lch');
  });
  bench('convert (lab-to-oklab)', () => {
    convertColor(input, output, 'lab', 'oklab');
  });
  bench('convert (lab-to-oklch)', () => {
    convertColor(input, output, 'lab', 'oklch');
  });
  bench('convert (lab-to-lrgb)', () => {
    convertColor(input, output, 'lab', 'lrgb');
  });
  bench('convert (lab-to-xyz50)', () => {
    convertColor(input, output, 'lab', 'xyz50');
  });
  bench('convert (lab-to-xyz65)', () => {
    convertColor(input, output, 'lab', 'xyz65');
  });
});
