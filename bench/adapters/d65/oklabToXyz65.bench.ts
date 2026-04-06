import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { oklabToXyz65 } from '~/adapters/d65';

const INPUT = new Float32Array([1, 0, 0]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-1, -0.1, -0.1]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('oklabToXyz65()', () => {
  bench('adapters (oklab-to-xyz65)', () => {
    oklabToXyz65(INPUT, OUTPUT);
  });

  bench('adapters (oklab-to-xyz65-zeros)', () => {
    oklabToXyz65(ZEROS, OUTPUT);
  });

  bench('adapters (oklab-to-xyz65-negatives)', () => {
    oklabToXyz65(NEGATIVES, OUTPUT);
  });
});
