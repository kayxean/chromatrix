import { bench, describe } from 'vitest';
import { xyz65ToXyz50 } from '~/adapters/cat';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([0.95047, 1.0, 1.08883]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-0.95047, -1.0, -1.08883]);
const OUTPUT = createMockOutput();

describe('xyz65ToXyz50()', () => {
  bench('adapters (xyz65-to-xyz50)', () => {
    xyz65ToXyz50(INPUT, OUTPUT);
  });

  bench('adapters (xyz65-to-xyz50-zeros)', () => {
    xyz65ToXyz50(ZEROS, OUTPUT);
  });

  bench('adapters (xyz65-to-xyz50-negatives)', () => {
    xyz65ToXyz50(NEGATIVES, OUTPUT);
  });
});
