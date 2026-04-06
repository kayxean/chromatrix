import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { labToXyz50 } from '~/adapters/d50';

const INPUT = new Float32Array([100, 0, 0]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-50, -20, -30]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

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
