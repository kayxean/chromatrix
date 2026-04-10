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
  it('should create a Float32Array with length 3', () => {
    const m = createMatrix();
    expect(m).toBeInstanceOf(Float32Array);
    expect(m.length).toBe(3);
  });

  it('should return dead cell when cache is empty', () => {
    mountMatrix(0);
    expect(createMatrix()).toBe(DEAD_CELL);
  });
});

describe('dropMatrix()', () => {
  it('should return matrix to cache', () => {
    const m = createMatrix();
    expect(countMatrix()).toBe(0);
    dropMatrix(m);
    expect(countMatrix()).toBe(1);
  });

  it('should handle drop when HEAD < 0', () => {
    mountMatrix(0);
    const m = createMatrix();
    expect(countMatrix()).toBe(0);
    dropMatrix(m);
    expect(countMatrix()).toBe(1);
  });

  it('should not drop when cache is full', () => {
    mountMatrix(MAX_CELLS);
    const m = createMatrix();
    const countAfter = countMatrix();
    dropMatrix(m);
    expect(countMatrix()).toBe(countAfter + 1);
  });
});

describe('createColor()', () => {
  it('should create color with correct values', () => {
    mountMatrix(3);
    const c = createColor('rgb', [1, 0, 0]);
    expect(c.value[0]).toBe(1);
    expect(c.value[1]).toBe(0);
    expect(c.value[2]).toBe(0);
    expect(c.space).toBe('rgb');
  });

  it('should use dead cell when cache is empty', () => {
    mountMatrix(0);
    const c = createColor('rgb', [1, 0, 0]);
    expect(c.value).toBe(DEAD_CELL);
  });
});

describe('cloneColor()', () => {
  it('should clone color with same values and alpha', () => {
    mountMatrix(3);
    const original = createColor('rgb', [0.1, 0.2, 0.3], 0.5);
    const cloned = cloneColor(original);
    expect(cloned.space).toBe('rgb');
    expect(cloned.alpha).toBe(0.5);
    expect(cloned.value[0]).toBeCloseTo(0.1);
    expect(cloned.value[1]).toBeCloseTo(0.2);
    expect(cloned.value[2]).toBeCloseTo(0.3);
  });

  it('should use dead cell when cache is empty', () => {
    mountMatrix(0);
    const original = createColor('rgb', [0.5, 0.5, 0.5]);
    expect(cloneColor(original).value).toBe(DEAD_CELL);
  });
});

describe('dropColor()', () => {
  it('should return color to cache', () => {
    mountMatrix(3);
    const c = createColor('rgb', [1, 0, 0]);
    expect(countMatrix()).toBe(2);
    dropColor(c);
    expect(countMatrix()).toBe(3);
  });

  it('should not drop when cache is full', () => {
    mountMatrix(MAX_CELLS);
    const c = createColor('rgb', [1, 0, 0]);
    const countAfter = countMatrix();
    dropColor(c);
    expect(countMatrix()).toBe(countAfter + 1);
  });
});

describe('mountMatrix()', () => {
  it('should set cache size', () => {
    mountMatrix(5);
    expect(countMatrix()).toBe(5);
  });

  it('should cap at MAX_CELLS', () => {
    mountMatrix(MAX_CELLS + 100);
    expect(countMatrix()).toBe(MAX_CELLS);
  });
});

describe('clearMatrix()', () => {
  it('should clear all cached matrices', () => {
    mountMatrix(5);
    expect(countMatrix()).toBe(5);
    clearMatrix();
    expect(countMatrix()).toBe(0);
  });
});

describe('countMatrix()', () => {
  it('should return current cache count', () => {
    mountMatrix(3);
    expect(countMatrix()).toBe(3);
    const m = createMatrix();
    expect(countMatrix()).toBe(2);
    dropMatrix(m);
    expect(countMatrix()).toBe(3);
  });
});
