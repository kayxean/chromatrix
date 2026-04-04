import type { ColorArray } from '~/types';
import { bench, describe } from 'vitest';
import { multiplyMatrixVector } from '~/adapters/cat';

const MATRIX = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]) as ColorArray;
const INPUT = new Float32Array([0.5, 0.5, 0.5]) as ColorArray;
const OUTPUT = new Float32Array(3) as ColorArray;

describe('multiplyMatrixVector()', () => {
  bench('adapters', () => {
    multiplyMatrixVector(MATRIX, INPUT, OUTPUT);
  });
});
