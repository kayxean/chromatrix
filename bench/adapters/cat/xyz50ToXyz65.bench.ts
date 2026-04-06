import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { xyz50ToXyz65 } from '~/adapters/cat';

const INPUT = new Float32Array([0.96422, 1.0, 0.82521]) as ColorArray;
const ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const NEGATIVES = new Float32Array([-0.96422, -1.0, -0.82521]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('xyz50ToXyz65()', () => {
  bench('adapters (xyz50-to-xyz65)', () => {
    xyz50ToXyz65(INPUT, OUTPUT);
  });

  bench('adapters (xyz50-to-xyz65-zeros)', () => {
    xyz50ToXyz65(ZEROS, OUTPUT);
  });

  bench('adapters (xyz50-to-xyz65-negatives)', () => {
    xyz50ToXyz65(NEGATIVES, OUTPUT);
  });
});
