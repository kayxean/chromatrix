import type { ColorArray } from '../types';
import { createMatrix, dropMatrix } from '../shared';

export function multiplyMatrixVector(
  matrix: Float32Array,
  vector: ColorArray,
  output: ColorArray,
): void {
  const v0 = vector[0];
  const v1 = vector[1];
  const v2 = vector[2];

  output[0] = matrix[0] * v0 + matrix[1] * v1 + matrix[2] * v2;
  output[1] = matrix[3] * v0 + matrix[4] * v1 + matrix[5] * v2;
  output[2] = matrix[6] * v0 + matrix[7] * v1 + matrix[8] * v2;
}

const M_BRADFORD = new Float32Array([
  0.8951, 0.2664, -0.1614, -0.7502, 1.7135, 0.0367, 0.0389, -0.0685, 1.0296,
]);

const M_BRADFORD_INV = new Float32Array([
  0.98699, -0.14705, 0.15996, 0.43231, 0.51836, 0.04929, -0.00853, 0.04006,
  0.96848,
]);

const WHITE_D65 = new Float32Array([0.95047, 1.0, 1.08883]) as ColorArray;
const WHITE_D50 = new Float32Array([0.96422, 1.0, 0.82521]) as ColorArray;

const lmsD65 = createMatrix('xyz65');
const lmsD50 = createMatrix('xyz50');

multiplyMatrixVector(M_BRADFORD, WHITE_D65, lmsD65);
multiplyMatrixVector(M_BRADFORD, WHITE_D50, lmsD50);

const SCALE_D65_TO_D50 = new Float32Array([
  lmsD50[0] / lmsD65[0],
  lmsD50[1] / lmsD65[1],
  lmsD50[2] / lmsD65[2],
]);

const SCALE_D50_TO_D65 = new Float32Array([
  lmsD65[0] / lmsD50[0],
  lmsD65[1] / lmsD50[1],
  lmsD65[2] / lmsD50[2],
]);

dropMatrix(lmsD65);
dropMatrix(lmsD50);

export function xyz65ToXyz50(input: ColorArray, output: ColorArray): void {
  const lmsScratch = createMatrix('xyz50');

  multiplyMatrixVector(M_BRADFORD, input, lmsScratch);

  lmsScratch[0] *= SCALE_D65_TO_D50[0];
  lmsScratch[1] *= SCALE_D65_TO_D50[1];
  lmsScratch[2] *= SCALE_D65_TO_D50[2];

  multiplyMatrixVector(M_BRADFORD_INV, lmsScratch, output);

  dropMatrix(lmsScratch);
}

export function xyz50ToXyz65(input: ColorArray, output: ColorArray): void {
  const lmsScratch = createMatrix('xyz65');

  multiplyMatrixVector(M_BRADFORD, input, lmsScratch);

  lmsScratch[0] *= SCALE_D50_TO_D65[0];
  lmsScratch[1] *= SCALE_D50_TO_D65[1];
  lmsScratch[2] *= SCALE_D50_TO_D65[2];

  multiplyMatrixVector(M_BRADFORD_INV, lmsScratch, output);

  dropMatrix(lmsScratch);
}
