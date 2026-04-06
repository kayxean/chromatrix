import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { lchToLab } from '~/adapters/polar';

const INPUT = new Float32Array([50, 36.0555, 56.3099]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-50, -36.0555, -56.3099]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('lchToLab()', () => {
  bench('adapters (lch-to-lab)', () => {
    lchToLab(INPUT, OUTPUT);
  });

  bench('adapters (lch-to-lab-zeros)', () => {
    lchToLab(ZEROS, OUTPUT);
  });

  bench('adapters (lch-to-lab-negatives)', () => {
    lchToLab(NEGATIVES, OUTPUT);
  });
});
