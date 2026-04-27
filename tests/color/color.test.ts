import { beforeEach, describe, expect, test } from 'vitest';
import {
  DEAD_CELL,
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
import { expectColorToBe } from '../factory';

describe('create-matrix', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('matrix (create-instance)', () => {
    const initialCount = countMatrix();
    const m = createMatrix();
    expect(countMatrix()).toBe(initialCount - 1);
    expect(m).not.toBe(DEAD_CELL);
  });
  test('matrix (create-dead-cell)', () => {
    clearMatrix();
    expect(countMatrix()).toBe(0);
    expect(createMatrix()).toBe(DEAD_CELL);
  });
  test('matrix (create-and-drop)', () => {
    const m = createMatrix();
    const countAfterCreate = countMatrix();
    dropMatrix(m);
    expect(countMatrix()).toBe(countAfterCreate + 1);
  });
});

describe('drop-matrix', () => {
  test('matrix (drop-to-pool)', () => {
    mountMatrix(100);
    const m = new Float32Array(3);
    dropMatrix(m);
    expect(countMatrix()).toBe(101);
  });
  test('matrix (drop-dead-cell-noop)', () => {
    const initialCount = countMatrix();
    dropMatrix(DEAD_CELL);
    expect(countMatrix()).toBe(initialCount);
  });
  test('matrix (drop-max-pool-limit)', () => {
    mountMatrix(2048);
    const m = new Float32Array(3);
    dropMatrix(m);
    expect(countMatrix()).toBe(2048);
  });
});

describe('create-color', () => {
  const values = new Float32Array([1, 0.5, 0]);
  test('matrix (create-color-instance)', () => {
    const color = createColor('rgb', values);
    expect(color.space).toBe('rgb');
    expectColorToBe(color.value, [1, 0.5, 0]);
  });
  test('matrix (create-color-dead-cell)', () => {
    clearMatrix();
    const color = createColor('rgb', values);
    expect(color.value).toBe(DEAD_CELL);
  });
  test('matrix (create-color-custom-alpha)', () => {
    const color = createColor('rgb', values, 0.85);
    expect(color.alpha).toBe(0.85);
  });
});

describe('drop-color', () => {
  const values = new Float32Array([1, 0.5, 0]);
  test('matrix (drop-color-to-pool)', () => {
    mountMatrix(100);
    const color = createColor('rgb', values);
    const count = countMatrix();
    dropColor(color);
    expect(countMatrix()).toBe(count + 1);
  });
  test('matrix (drop-color-dead-cell-noop)', () => {
    clearMatrix();
    const deadColor = createColor('rgb', values);
    const count = countMatrix();
    dropColor(deadColor);
    expect(countMatrix()).toBe(count);
  });
});

describe('clone-color', () => {
  const values = new Float32Array([1, 0.5, 0]);
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('matrix (clone-color-instance)', () => {
    const source = createColor('rgb', values);
    const clone = cloneColor(source);
    expect(clone.value).not.toBe(source.value);
    expectColorToBe(clone.value, [1, 0.5, 0]);
  });
  test('matrix (clone-color-to-dead-cell)', () => {
    const source = createColor('rgb', values);
    clearMatrix();
    const clone = cloneColor(source);
    expect(clone.value).toBe(DEAD_CELL);
  });
});

describe('derive-color', () => {
  const values = new Float32Array([1, 0.5, 0]);
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('matrix (derive-same-space)', () => {
    const source = createColor('rgb', values);
    const derived = deriveColor(source, 'rgb');
    expect(derived.space).toBe('rgb');
    expect(derived.value).not.toBe(source.value);
    expectColorToBe(derived.value, [1, 0.5, 0]);
  });
  test('matrix (derive-to-dead-cell)', () => {
    const source = createColor('rgb', values);
    clearMatrix();
    const derived = deriveColor(source, 'lrgb');
    expect(derived.value).toBe(DEAD_CELL);
  });
});

describe('mutate-color', () => {
  const values = new Float32Array([1, 0.5, 0]);
  test('matrix (mutate-noop)', () => {
    const color = createColor('rgb', values);
    const originalValue = color.value;
    mutateColor(color, 'rgb');
    expect(color.value).toBe(originalValue);
    expect(color.space).toBe('rgb');
  });
});

describe('mount-matrix', () => {
  test('matrix (mount-clamping)', () => {
    mountMatrix(9999);
    expect(countMatrix()).toBe(2048);
  });
  test('matrix (mount-empty)', () => {
    mountMatrix(0);
    expect(countMatrix()).toBe(0);
  });
});

describe('count-matrix', () => {
  test('matrix (count)', () => {
    mountMatrix(500);
    expect(countMatrix()).toBe(500);
  });
});
