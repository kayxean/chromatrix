import { bench, describe } from 'vitest';
import { lrgbToRgb } from '~/adapters/gamma';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([1, 1, 1]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-1, -1, -1]);
const OUTPUT = createMockOutput();

describe('lrgbToRgb()', () => {
  bench('adapters (lrgb-to-rgb)', () => {
    lrgbToRgb(INPUT, OUTPUT);
  });

  bench('adapters (lrgb-to-rgb-zeros)', () => {
    lrgbToRgb(ZEROS, OUTPUT);
  });

  bench('adapters (lrgb-to-rgb-negatives)', () => {
    lrgbToRgb(NEGATIVES, OUTPUT);
  });
});
