import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { multiplyMatrixVector } from '~/adapters/cat';

const MATRIX = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const IDENTITY = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
const INPUT_ONES = new Float32Array([1, 1, 1]) as ColorArray;
const INPUT_ZEROS = new Float32Array([0, 0, 0]) as ColorArray;
const INPUT_VALS = new Float32Array([1, 2, 3]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('multiplyMatrixVector()', () => {
  bench('adapters (matrix-multiply)', () => {
    multiplyMatrixVector(MATRIX, INPUT_ONES, OUTPUT);
  });

  bench('adapters (matrix-multiply-zero-vector)', () => {
    multiplyMatrixVector(MATRIX, INPUT_ZEROS, OUTPUT);
  });

  bench('adapters (matrix-multiply-in-place)', () => {
    multiplyMatrixVector(IDENTITY, INPUT_VALS, INPUT_VALS);
  });
});
