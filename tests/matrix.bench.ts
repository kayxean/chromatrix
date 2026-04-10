import { afterAll, beforeAll, bench, describe } from 'vitest';
import {
  clearMatrix,
  cloneColor,
  createColor,
  createMatrix,
  dropColor,
  dropMatrix,
  mountMatrix,
} from '~/matrix';

beforeAll(() => {
  mountMatrix(2048);
});

afterAll(() => {
  clearMatrix();
});

describe('createMatrix()', () => {
  bench('single operation', () => {
    const m = createMatrix();
    dropMatrix(m);
  });

  bench('batch 10', () => {
    for (let i = 0; i < 10; i++) {
      const m = createMatrix();
      dropMatrix(m);
    }
  });
});

describe('dropMatrix()', () => {
  bench('single operation', () => {
    const m = createMatrix();
    dropMatrix(m);
  });

  bench('mixed operations', () => {
    for (let i = 0; i < 5; i++) {
      const m1 = createMatrix();
      const m2 = createMatrix();
      dropMatrix(m2);
      dropMatrix(m1);
    }
  });
});

describe('createColor()', () => {
  bench('single operation', () => {
    const c = createColor('rgb', [0.5, 0.5, 0.5]);
    dropColor(c);
  });

  bench('batch 10', () => {
    for (let i = 0; i < 10; i++) {
      const c = createColor('rgb', [0.5, 0.5, 0.5]);
      dropColor(c);
    }
  });
});

describe('cloneColor()', () => {
  bench('single operation', () => {
    const original = createColor('rgb', [0.1, 0.2, 0.3]);
    const cloned = cloneColor(original);
    dropColor(original);
    dropColor(cloned);
  });
});

describe('dropColor()', () => {
  bench('single operation', () => {
    const c = createColor('rgb', [0.5, 0.5, 0.5]);
    dropColor(c);
  });

  bench('mixed operations', () => {
    for (let i = 0; i < 5; i++) {
      const c1 = createColor('rgb', [1, 0, 0]);
      const c2 = createColor('rgb', [0, 1, 0]);
      dropColor(c2);
      dropColor(c1);
    }
  });
});
