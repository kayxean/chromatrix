import { bench, describe } from 'vitest';
import { lchToLab } from '~/adapters/polar';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([50, 36.0555, 56.3099]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-50, -36.0555, -56.3099]);
const OUTPUT = createMockOutput();

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
