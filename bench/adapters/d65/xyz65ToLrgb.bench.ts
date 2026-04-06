import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { xyz65ToLrgb } from '~/adapters/d65';

const INPUT = new Float32Array([0.95047, 1.0, 1.08883]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-0.95047, -1.0, -1.08883]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('xyz65ToLrgb()', () => {
  bench('adapters (xyz65-to-lrgb)', () => {
    xyz65ToLrgb(INPUT, OUTPUT);
  });

  bench('adapters (xyz65-to-lrgb-zeros)', () => {
    xyz65ToLrgb(ZEROS, OUTPUT);
  });

  bench('adapters (xyz65-to-lrgb-negatives)', () => {
    xyz65ToLrgb(NEGATIVES, OUTPUT);
  });
});
