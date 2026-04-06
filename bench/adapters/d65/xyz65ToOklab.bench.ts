import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { xyz65ToOklab } from '~/adapters/d65';

const INPUT = new Float32Array([0.95047, 1.0, 1.08883]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-0.95047, -1.0, -1.08883]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('xyz65ToOklab()', () => {
  bench('adapters (xyz65-to-oklab)', () => {
    xyz65ToOklab(INPUT, OUTPUT);
  });

  bench('adapters (xyz65-to-oklab-zeros)', () => {
    xyz65ToOklab(ZEROS, OUTPUT);
  });

  bench('adapters (xyz65-to-oklab-negatives)', () => {
    xyz65ToOklab(NEGATIVES, OUTPUT);
  });
});
