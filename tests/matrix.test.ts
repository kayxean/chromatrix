import { beforeEach, describe, expect, it } from 'vitest';
import {
  DEAD_CELL,
  MAX_CELLS,
  clearMatrix,
  cloneColor,
  countMatrix,
  createColor,
  createMatrix,
  dropColor,
  dropMatrix,
  mountMatrix,
} from '~/matrix';

beforeEach(() => {
  clearMatrix();
});

describe('createMatrix()', () => {
  it('creates reusable float32array buffer when cache has available slots', () => {
    const m = createMatrix();
    expect(m).toBeInstanceOf(Float32Array);
    expect(m.length).toBe(3);
  });

  it('returns shared dead cell when cache is exhausted to prevent allocation failures', () => {
    mountMatrix(0);
    expect(createMatrix()).toBe(DEAD_CELL);
  });
});

describe('dropMatrix()', () => {
  it('returning buffers increases available cache count when below maximum capacity', () => {
    const m = createMatrix();
    expect(countMatrix()).toBe(0);
    dropMatrix(m);
    expect(countMatrix()).toBe(1);
  });

  it('still increases cache count when dropping from empty cache state', () => {
    mountMatrix(0);
    const m = createMatrix();
    expect(countMatrix()).toBe(0);
    dropMatrix(m);
    expect(countMatrix()).toBe(1);
  });

  it('preserves existing cached buffers when dropping to already full cache', () => {
    mountMatrix(MAX_CELLS);
    const m = createMatrix();
    const countAfter = countMatrix();
    dropMatrix(m);
    expect(countMatrix()).toBe(countAfter + 1);
  });
});

describe('createColor()', () => {
  it('writes provided rgb values to allocated buffer when cache available', () => {
    mountMatrix(3);
    const c = createColor('rgb', [1, 0, 0]);
    expect(c.value[0]).toBe(1);
    expect(c.value[1]).toBe(0);
    expect(c.value[2]).toBe(0);
    expect(c.space).toBe('rgb');
  });

  it('returns shared dead cell buffer when cache is exhausted during color creation', () => {
    mountMatrix(0);
    const c = createColor('rgb', [1, 0, 0]);
    expect(c.value).toBe(DEAD_CELL);
  });
});

describe('cloneColor()', () => {
  it('produces independent buffer copy while preserving original color properties', () => {
    mountMatrix(3);
    const original = createColor('rgb', [0.1, 0.2, 0.3], 0.5);
    const cloned = cloneColor(original);
    expect(cloned.space).toBe('rgb');
    expect(cloned.alpha).toBe(0.5);
    expect(cloned.value[0]).toBeCloseTo(0.1);
    expect(cloned.value[1]).toBeCloseTo(0.2);
    expect(cloned.value[2]).toBeCloseTo(0.3);
    expect(cloned.value).not.toBe(original.value);
  });

  it('returns shared dead cell when attempting to clone with exhausted cache', () => {
    mountMatrix(0);
    const original = createColor('rgb', [0.5, 0.5, 0.5]);
    expect(cloneColor(original).value).toBe(DEAD_CELL);
  });
});

describe('dropColor()', () => {
  it('returning color buffers increases available cache count when below maximum capacity', () => {
    mountMatrix(3);
    const c = createColor('rgb', [1, 0, 0]);
    expect(countMatrix()).toBe(2);
    dropColor(c);
    expect(countMatrix()).toBe(3);
  });

  it('still increases cache count when dropping color from exhausted cache state', () => {
    mountMatrix(MAX_CELLS);
    const c = createColor('rgb', [1, 0, 0]);
    const countAfter = countMatrix();
    dropColor(c);
    expect(countMatrix()).toBe(countAfter + 1);
  });
});

describe('mountMatrix()', () => {
  it('sets available cache count to specified size when within limits', () => {
    mountMatrix(5);
    expect(countMatrix()).toBe(5);
  });

  it('respects maximum cache limit regardless of input size', () => {
    mountMatrix(MAX_CELLS + 100);
    expect(countMatrix()).toBe(MAX_CELLS);
  });
});

describe('clearMatrix()', () => {
  it('resets cache to empty state regardless of previous allocation level', () => {
    mountMatrix(5);
    expect(countMatrix()).toBe(5);
    clearMatrix();
    expect(countMatrix()).toBe(0);
  });
});

describe('countMatrix()', () => {
  it('accurately tracks available buffer count through allocation and release cycles', () => {
    mountMatrix(3);
    expect(countMatrix()).toBe(3);
    const m = createMatrix();
    expect(countMatrix()).toBe(2);
    dropMatrix(m);
    expect(countMatrix()).toBe(3);
  });
});
