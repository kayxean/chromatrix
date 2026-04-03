import { bench, describe } from 'vitest';
import { multiplyMatrixVector } from '../../../adapters/cat';
import { createColor, dropColor, getSharedBuffer } from '../../../shared';

const SHARED_BUFFER = getSharedBuffer();
const RGB_COLOR = createColor('rgb', [0.7, 0.1, 0.9]);
const RGB_IDX = RGB_COLOR.index;

describe('multiplyMatrixVector', () => {
  bench('multiplyMatrixVector', () => {
    const matrix = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    multiplyMatrixVector(matrix, SHARED_BUFFER, RGB_IDX);
  });
});

dropColor(RGB_COLOR);
