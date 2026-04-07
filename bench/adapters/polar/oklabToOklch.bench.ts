import { bench, describe } from 'vitest';
import { oklabToOklch } from '~/adapters/polar';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([0.5, 0.15, 0.1]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-0.5, -0.15, -0.1]);
const OUTPUT = createMockOutput();

describe('oklabToOklch()', () => {
  bench('adapters (oklab-to-oklch)', () => {
    oklabToOklch(INPUT, OUTPUT);
  });

  bench('adapters (oklab-to-oklch-zeros)', () => {
    oklabToOklch(ZEROS, OUTPUT);
  });

  bench('adapters (oklab-to-oklch-negatives)', () => {
    oklabToOklch(NEGATIVES, OUTPUT);
  });
});
