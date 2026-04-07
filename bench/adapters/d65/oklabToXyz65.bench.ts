import { bench, describe } from 'vitest';
import { oklabToXyz65 } from '~/adapters/d65';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([1, 0, 0]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-1, -0.1, -0.1]);
const OUTPUT = createMockOutput();

describe('oklabToXyz65()', () => {
  bench('adapters (oklab-to-xyz65)', () => {
    oklabToXyz65(INPUT, OUTPUT);
  });

  bench('adapters (oklab-to-xyz65-zeros)', () => {
    oklabToXyz65(ZEROS, OUTPUT);
  });

  bench('adapters (oklab-to-xyz65-negatives)', () => {
    oklabToXyz65(NEGATIVES, OUTPUT);
  });
});
