import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { lrgbToXyz65 } from '~/adapters/d65';

const INPUT = new Float32Array([1, 1, 1]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-1, -1, -1]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('lrgbToXyz65()', () => {
  bench('adapters (lrgb-to-xyz65)', () => {
    lrgbToXyz65(INPUT, OUTPUT);
  });

  bench('adapters (lrgb-to-xyz65-zeros)', () => {
    lrgbToXyz65(ZEROS, OUTPUT);
  });

  bench('adapters (lrgb-to-xyz65-negatives)', () => {
    lrgbToXyz65(NEGATIVES, OUTPUT);
  });
});
