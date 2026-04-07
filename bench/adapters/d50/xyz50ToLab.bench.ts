import { bench, describe } from 'vitest';
import { xyz50ToLab } from '~/adapters/d50';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([0.96422, 1.0, 0.82521]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-0.96422, -1.0, -0.82521]);
const OUTPUT = createMockOutput();

describe('xyz50ToLab()', () => {
  bench('adapters (xyz50-to-lab)', () => {
    xyz50ToLab(INPUT, OUTPUT);
  });

  bench('adapters (xyz50-to-lab-zeros)', () => {
    xyz50ToLab(ZEROS, OUTPUT);
  });

  bench('adapters (xyz50-to-lab-negatives)', () => {
    xyz50ToLab(NEGATIVES, OUTPUT);
  });
});
