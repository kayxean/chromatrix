import { bench, describe } from 'vitest';
import {
  clearMatrix,
  cloneColor,
  countMatrix,
  createColor,
  createMatrix,
  dropColor,
  dropMatrix,
  mountMatrix,
} from '~/api/color';

const values = new Float32Array([1, 0.5, 0]);
const sharedMatrix = new Float32Array([0.1, 0.2, 0.3]);
const sourceColor = createColor('rgb', values, 0.5);
const pooledColor = createColor('rgb', values);

describe('create-matrix', () => {
  bench('matrix (create-instance)', () => {
    createMatrix();
  });
  bench('matrix (create-dead-cell)', () => {
    clearMatrix();
    createMatrix();
    mountMatrix(2048);
  });
  bench('matrix (reuse-from-pool)', () => {
    const initial = createMatrix();
    dropMatrix(initial);
    createMatrix();
  });
});

describe('drop-matrix', () => {
  bench('matrix (drop-to-pool)', () => {
    dropMatrix(sharedMatrix);
    if (countMatrix() > 2000) mountMatrix(100);
  });
  bench('matrix (drop-max-pool-limit)', () => {
    mountMatrix(2048);
    dropMatrix(sharedMatrix);
  });
});

describe('create-color', () => {
  bench('matrix (create-color-values)', () => {
    createColor('rgb', values);
  });
  bench('matrix (create-color-dead-cell)', () => {
    clearMatrix();
    createColor('rgb', values);
    mountMatrix(2048);
  });
  bench('matrix (create-color-custom-alpha)', () => {
    createColor('rgb', values, 0.5);
  });
});

describe('drop-color', () => {
  bench('matrix (drop-to-pool)', () => {
    dropColor(pooledColor);
    if (countMatrix() > 2000) mountMatrix(100);
  });
  bench('matrix (drop-dead-cell-noop)', () => {
    clearMatrix();
    const deadColor = createColor('rgb', values);
    dropColor(deadColor);
    mountMatrix(2048);
  });
});

describe('clone-color', () => {
  bench('matrix (clone-color)', () => {
    cloneColor(sourceColor);
  });
  bench('matrix (clone-color-to-dead-cell)', () => {
    clearMatrix();
    cloneColor(sourceColor);
    mountMatrix(2048);
  });
});

describe('mount-matrix', () => {
  bench('matrix (mount-clamping)', () => {
    mountMatrix(9999);
  });
  bench('matrix (mount-empty)', () => {
    mountMatrix(0);
  });
});

describe('count-matrix', () => {
  bench('matrix (count)', () => {
    countMatrix();
  });
});
