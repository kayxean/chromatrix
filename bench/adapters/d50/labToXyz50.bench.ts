import { bench, describe } from 'vitest';
import { labToXyz50 } from '~/adapters/d50';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([100, 0, 0]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-50, -20, -30]);
const OUTPUT = createMockOutput();

describe('labToXyz50()', () => {
  bench('adapters (lab-to-xyz50)', () => {
    labToXyz50(INPUT, OUTPUT);
  });

  bench('adapters (lab-to-xyz50-zeros)', () => {
    labToXyz50(ZEROS, OUTPUT);
  });

  bench('adapters (lab-to-xyz50-negatives)', () => {
    labToXyz50(NEGATIVES, OUTPUT);
  });
});
