import { bench, describe } from 'vitest';
import { xyz65ToLrgb } from '~/adapters/d65';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([0.95047, 1.0, 1.08883]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-0.95047, -1.0, -1.08883]);
const OUTPUT = createMockOutput();

describe('xyz65ToLrgb()', () => {
  bench('adapters (xyz65-to-lrgb)', () => {
    xyz65ToLrgb(INPUT, OUTPUT);
  });

  bench('adapters (xyz65-to-lrgb-zeros)', () => {
    xyz65ToLrgb(ZEROS, OUTPUT);
  });

  bench('adapters (xyz65-to-lrgb-negatives)', () => {
    xyz65ToLrgb(NEGATIVES, OUTPUT);
  });
});
