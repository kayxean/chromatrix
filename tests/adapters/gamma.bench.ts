import { bench, describe } from 'vitest';
import { lrgbToRgb, rgbToLrgb } from '~/adapters/gamma';
import { createMockArray, createMockOutput } from '../factory';

describe('lrgbToRgb()', () => {
  const input = createMockArray([1, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-1, -1, -1]);
  const output = createMockOutput();
  bench('adapters (lrgb-to-rgb)', () => {
    lrgbToRgb(input, output);
  });
  bench('adapters (lrgb-to-rgb-zeros)', () => {
    lrgbToRgb(zeros, output);
  });
  bench('adapters (lrgb-to-rgb-negatives)', () => {
    lrgbToRgb(negatives, output);
  });
});

describe('rgbToLrgb()', () => {
  const input = createMockArray([1, 1, 1]);
  const zeros = createMockArray([0, 0, 0]);
  const negatives = createMockArray([-1, -1, -1]);
  const output = createMockOutput();
  bench('adapters (rgb-to-lrgb)', () => {
    rgbToLrgb(input, output);
  });
  bench('adapters (rgb-to-lrgb-zeros)', () => {
    rgbToLrgb(zeros, output);
  });
  bench('adapters (rgb-to-lrgb-negatives)', () => {
    rgbToLrgb(negatives, output);
  });
});
