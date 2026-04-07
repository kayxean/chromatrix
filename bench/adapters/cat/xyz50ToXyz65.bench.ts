import { bench, describe } from 'vitest';
import { xyz50ToXyz65 } from '~/adapters/cat';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([0.96422, 1.0, 0.82521]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-0.96422, -1.0, -0.82521]);
const OUTPUT = createMockOutput();

describe('xyz50ToXyz65()', () => {
  bench('adapters (xyz50-to-xyz65)', () => {
    xyz50ToXyz65(INPUT, OUTPUT);
  });

  bench('adapters (xyz50-to-xyz65-zeros)', () => {
    xyz50ToXyz65(ZEROS, OUTPUT);
  });

  bench('adapters (xyz50-to-xyz65-negatives)', () => {
    xyz50ToXyz65(NEGATIVES, OUTPUT);
  });
});
