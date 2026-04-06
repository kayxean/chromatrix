import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { rgbToLrgb } from '~/adapters/gamma';

const INPUT = new Float32Array([1, 1, 1]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-1, -1, -1]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

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
