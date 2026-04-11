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

describe('createMatrix()', () => {
  beforeAll(() => {
    mountMatrix(2048);
  });

  afterAll(() => {
    clearMatrix();
  });

  bench('single', () => {
    const m = createMatrix();
    dropMatrix(m);
  });

  bench('batch', () => {
    for (let i = 0; i < 100; i++) {
      const m = createMatrix();
      dropMatrix(m);
    }
  });
});

describe('dropMatrix()', () => {
  beforeAll(() => {
    mountMatrix(2048);
  });

  afterAll(() => {
    clearMatrix();
  });

  bench('single', () => {
    const m = createMatrix();
    dropMatrix(m);
  });

  bench('batch', () => {
    for (let i = 0; i < 100; i++) {
      const m = createMatrix();
      dropMatrix(m);
    }
  });
});

describe('createColor()', () => {
  beforeAll(() => {
    mountMatrix(2048);
  });

  afterAll(() => {
    clearMatrix();
  });

  bench('single', () => {
    const c = createColor('rgb', [0.5, 0.5, 0.5]);
    dropColor(c);
  });

  bench('batch', () => {
    for (let i = 0; i < 100; i++) {
      const c = createColor('rgb', [0.5, 0.5, 0.5]);
      dropColor(c);
    }
  });
});

describe('dropColor()', () => {
  beforeAll(() => {
    mountMatrix(2048);
  });

  afterAll(() => {
    clearMatrix();
  });

  bench('single', () => {
    const c = createColor('rgb', [0.5, 0.5, 0.5]);
    dropColor(c);
  });

  bench('batch', () => {
    for (let i = 0; i < 100; i++) {
      const c = createColor('rgb', [0.5, 0.5, 0.5]);
      dropColor(c);
    }
  });
});

describe('cloneColor()', () => {
  beforeAll(() => {
    mountMatrix(2048);
  });

  afterAll(() => {
    clearMatrix();
  });

  bench('single', () => {
    const original = createColor('rgb', [0.1, 0.2, 0.3]);
    const cloned = cloneColor(original);
    dropColor(original);
    dropColor(cloned);
  });

  bench('batch', () => {
    for (let i = 0; i < 100; i++) {
      const original = createColor('rgb', [0.1, 0.2, 0.3]);
      const cloned = cloneColor(original);
      dropColor(original);
      dropColor(cloned);
    }
  });
});
