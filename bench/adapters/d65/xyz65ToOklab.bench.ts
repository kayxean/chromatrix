import { bench, describe } from 'vitest';
import { xyz65ToOklab } from '~/adapters/d65';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([0.95047, 1.0, 1.08883]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-0.95047, -1.0, -1.08883]);
const OUTPUT = createMockOutput();

describe('xyz65ToOklab()', () => {
  bench('adapters (xyz65-to-oklab)', () => {
    xyz65ToOklab(INPUT, OUTPUT);
  });

  bench('adapters (xyz65-to-oklab-zeros)', () => {
    xyz65ToOklab(ZEROS, OUTPUT);
  });

  bench('adapters (xyz65-to-oklab-negatives)', () => {
    xyz65ToOklab(NEGATIVES, OUTPUT);
  });
});
