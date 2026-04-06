import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { labToLch } from '~/adapters/polar';

const INPUT = new Float32Array([50, 20, 30]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-50, -20, -30]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('labToLch()', () => {
  bench('adapters (lab-to-lch)', () => {
    labToLch(INPUT, OUTPUT);
  });

  bench('adapters (lab-to-lch-zeros)', () => {
    labToLch(ZEROS, OUTPUT);
  });

  bench('adapters (lab-to-lch-negatives)', () => {
    labToLch(NEGATIVES, OUTPUT);
  });
});
