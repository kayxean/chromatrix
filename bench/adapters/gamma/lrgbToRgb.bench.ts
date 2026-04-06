import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { lrgbToRgb } from '~/adapters/gamma';

const INPUT = new Float32Array([1, 1, 1]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-1, -1, -1]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

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
