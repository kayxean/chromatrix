import { bench, describe } from 'vitest';
import { convertColor } from '~/api/convert';
import { createMockArray, createMockOutput } from '../factory';

describe('convert-color-oklab', () => {
  const input = createMockArray([1, 0, 0]);
  const output = createMockOutput();
  bench('convert (oklab-to-rgb)', () => {
    convertColor(input, output, 'oklab', 'rgb');
  });
  bench('convert (oklab-to-hsl)', () => {
    convertColor(input, output, 'oklab', 'hsl');
  });
  bench('convert (oklab-to-hsv)', () => {
    convertColor(input, output, 'oklab', 'hsv');
  });
  bench('convert (oklab-to-hwb)', () => {
    convertColor(input, output, 'oklab', 'hwb');
  });
  bench('convert (oklab-to-lab)', () => {
    convertColor(input, output, 'oklab', 'lab');
  });
  bench('convert (oklab-to-lch)', () => {
    convertColor(input, output, 'oklab', 'lch');
  });
  bench('convert (oklab-to-oklch)', () => {
    convertColor(input, output, 'oklab', 'oklch');
  });
  bench('convert (oklab-to-lrgb)', () => {
    convertColor(input, output, 'oklab', 'lrgb');
  });
  bench('convert (oklab-to-xyz50)', () => {
    convertColor(input, output, 'oklab', 'xyz50');
  });
  bench('convert (oklab-to-xyz65)', () => {
    convertColor(input, output, 'oklab', 'xyz65');
  });
});
