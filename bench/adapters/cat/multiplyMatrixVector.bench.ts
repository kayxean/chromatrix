import { bench, describe } from 'vitest';
import { multiplyMatrixVector } from '~/adapters/cat';
import { createMockArray, createMockOutput } from '../../factory';

const MATRIX = createMockArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const IDENTITY = createMockArray([1, 0, 0, 0, 1, 0, 0, 0, 1]);
const INPUT_ONES = createMockArray([1, 1, 1]);
const INPUT_ZEROS = createMockArray([0, 0, 0]);
const INPUT_VALS = createMockArray([1, 2, 3]);
const OUTPUT = createMockOutput();

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
