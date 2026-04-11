import { bench, describe } from 'vitest';
import { convertColor, convertHue } from '~/convert';

describe('convertColor()', () => {
  const input = new Float32Array([0.5, 0.5, 0.5]);
  const output = new Float32Array(3);

  bench('identity', () => {
    convertColor(input, output, 'rgb', 'rgb');
  });

  bench('rgb to hsv', () => {
    convertColor(input, output, 'rgb', 'hsv');
  });

  bench('rgb to lrgb', () => {
    convertColor(input, output, 'rgb', 'lrgb');
  });

  bench('rgb to lab', () => {
    convertColor(input, output, 'rgb', 'lab');
  });

  bench('rgb to oklch', () => {
    convertColor(input, output, 'rgb', 'oklch');
  });

  bench('lab to lch', () => {
    convertColor(input, output, 'lab', 'lch');
  });

  bench('xyz65 to xyz50', () => {
    convertColor(input, output, 'xyz65', 'xyz50');
  });
});

describe('convertHue()', () => {
  const input = new Float32Array([1, 0, 0]);
  const output = new Float32Array(3);

  bench('rgb to hsl', () => {
    convertHue(input, output, 'rgb');
  });

  bench('lab to lch', () => {
    convertHue(input, output, 'lab');
  });
});
