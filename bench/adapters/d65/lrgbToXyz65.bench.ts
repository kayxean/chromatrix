import { bench, describe } from 'vitest';
import { lrgbToXyz65 } from '~/adapters/d65';
import { createMockArray, createMockOutput } from '../../factory';

const INPUT = createMockArray([1, 1, 1]);
const ZEROS = createMockArray([0, 0, 0]);
const NEGATIVES = createMockArray([-1, -1, -1]);
const OUTPUT = createMockOutput();

describe('lrgbToXyz65()', () => {
  bench('adapters (lrgb-to-xyz65)', () => {
    lrgbToXyz65(INPUT, OUTPUT);
  });

  bench('adapters (lrgb-to-xyz65-zeros)', () => {
    lrgbToXyz65(ZEROS, OUTPUT);
  });

  bench('adapters (lrgb-to-xyz65-negatives)', () => {
    lrgbToXyz65(NEGATIVES, OUTPUT);
  });
});
