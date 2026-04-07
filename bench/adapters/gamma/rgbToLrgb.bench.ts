import { bench, describe } from 'vitest';
import { rgbToLrgb } from '~/adapters/gamma';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([1, 1, 1]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-1, -1, -1]);
const OUTPUT = createMockOutput();

describe('rgbToLrgb()', () => {
  bench('adapters (rgb-to-lrgb)', () => {
    rgbToLrgb(INPUT, OUTPUT);
  });

  bench('adapters (rgb-to-lrgb-zeros)', () => {
    rgbToLrgb(ZEROS, OUTPUT);
  });

  bench('adapters (rgb-to-lrgb-negatives)', () => {
    rgbToLrgb(NEGATIVES, OUTPUT);
  });
});
