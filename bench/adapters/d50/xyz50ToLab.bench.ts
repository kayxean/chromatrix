import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { xyz50ToLab } from '~/adapters/d50';

const INPUT = new Float32Array([0.96422, 1.0, 0.82521]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-0.96422, -1.0, -0.82521]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

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
