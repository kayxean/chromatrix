import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { xyz65ToXyz50 } from '~/adapters/cat';

const INPUT = new Float32Array([0.95047, 1.0, 1.08883]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-0.95047, -1.0, -1.08883]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

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
