import { bench, describe } from 'vitest';
import { oklchToOklab } from '~/adapters/polar';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([0.6, 0.2, 120]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-0.6, -0.2, -120]);
const OUTPUT = createMockOutput();

describe('oklchToOklab()', () => {
  bench('adapters (oklch-to-oklab)', () => {
    oklchToOklab(INPUT, OUTPUT);
  });

  bench('adapters (oklch-to-oklab-zeros)', () => {
    oklchToOklab(ZEROS, OUTPUT);
  });

  bench('adapters (oklch-to-oklab-negatives)', () => {
    oklchToOklab(NEGATIVES, OUTPUT);
  });
});
