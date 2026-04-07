import { bench, describe } from 'vitest';
import { labToLch } from '~/adapters/polar';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([50, 20, 30]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-50, -20, -30]);
const OUTPUT = createMockOutput();

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
