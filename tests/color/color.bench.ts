import { bench, describe } from 'vite-plus/test';
import {
  clearMatrix,
  cloneColor,
  countMatrix,
  createColor,
  createMatrix,
  deriveColor,
  dropColor,
  dropMatrix,
  mountMatrix,
  mutateColor,
} from '~/api/color';

const values = new Float32Array([1, 0.5, 0]);
const sharedMatrix = new Float32Array([0.1, 0.2, 0.3]);
const sourceColor = createColor('rgb', values, 0.5);
const pooledColor = createColor('rgb', values);
const mutationTarget = createColor('rgb', values);

describe('create-matrix', () => {
  bench('matrix (create-instance)', () => {
    mountMatrix(2048);
    createMatrix();
  });
  bench('matrix (create-dead-cell)', () => {
    clearMatrix();
    createMatrix();
  });
  bench('matrix (create-and-drop)', () => {
    mountMatrix(2048);
    const m = createMatrix();
    dropMatrix(m);
  });
});

describe('drop-matrix', () => {
  bench('matrix (drop-to-pool)', () => {
    mountMatrix(100);
    dropMatrix(sharedMatrix);
  });
  bench('matrix (drop-dead-cell-noop)', () => {
    mountMatrix(2048);
    dropMatrix(new Float32Array(3));
  });
  bench('matrix (drop-max-pool-limit)', () => {
    mountMatrix(2048);
    dropMatrix(sharedMatrix);
  });
});

describe('create-color', () => {
  bench('matrix (create-color-instance)', () => {
    mountMatrix(2048);
    createColor('rgb', values);
  });
  bench('matrix (create-color-dead-cell)', () => {
    clearMatrix();
    createColor('rgb', values);
  });
  bench('matrix (create-color-custom-alpha)', () => {
    mountMatrix(2048);
    createColor('rgb', values, 0.85);
  });
});

describe('drop-color', () => {
  bench('matrix (drop-color-to-pool)', () => {
    mountMatrix(100);
    dropColor(pooledColor);
  });
  bench('matrix (drop-color-dead-cell-noop)', () => {
    clearMatrix();
    const deadColor = createColor('rgb', values);
    dropColor(deadColor);
  });
  bench('matrix (drop-color-full-pool)', () => {
    mountMatrix(2048);
    dropColor(pooledColor);
  });
});

describe('clone-color', () => {
  bench('matrix (clone-color-instance)', () => {
    mountMatrix(2048);
    cloneColor(sourceColor);
  });
  bench('matrix (clone-color-to-dead-cell)', () => {
    clearMatrix();
    cloneColor(sourceColor);
  });
  bench('matrix (clone-color-and-drop)', () => {
    mountMatrix(2048);
    const c = cloneColor(sourceColor);
    dropColor(c);
  });
});

describe('derive-color', () => {
  bench('matrix (derive-same-space)', () => {
    mountMatrix(2048);
    deriveColor(sourceColor, 'rgb');
  });
  bench('matrix (derive-new-space)', () => {
    mountMatrix(2048);
    deriveColor(sourceColor, 'lrgb');
  });
  bench('matrix (derive-to-dead-cell)', () => {
    clearMatrix();
    deriveColor(sourceColor, 'lrgb');
  });
});

describe('mutate-color', () => {
  bench('matrix (mutate-in-place)', () => {
    mutateColor(mutationTarget, 'lrgb');
  });
  bench('matrix (mutate-back-and-forth)', () => {
    mutateColor(mutationTarget, 'lrgb');
    mutateColor(mutationTarget, 'rgb');
  });
  bench('matrix (mutate-noop)', () => {
    mutateColor(mutationTarget, 'rgb');
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
