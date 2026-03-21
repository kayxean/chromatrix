import type { ColorMatrix } from '~/types';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearPool,
  cloneColor,
  createColor,
  createMatrix,
  deriveColor,
  dropColor,
  dropMatrix,
  mutateColor,
  preallocatePool,
} from '~/shared';

describe('Shared Utilities & Pooling (shared.ts)', () => {
  beforeEach(() => {
    clearPool();
  });

  describe('Matrix Pooling', () => {
    it('should preallocate and retrieve from pool', () => {
      preallocatePool(5);

      const m1 = createMatrix();
      expect(m1).toBeInstanceOf(Float32Array);
      expect(m1.length).toBe(3);
    });

    it('should reuse matrices from the pool', () => {
      const m1 = createMatrix();
      dropMatrix(m1);

      const m2 = createMatrix();
      expect(m2).toBe(m1);
    });

    it('should respect the MAX_POOL_SIZE limit', () => {
      for (let i = 0; i < 300; i++) {
        dropMatrix(new Float32Array(3) as unknown as ColorMatrix<'rgb'>);
      }

      const m = createMatrix('rgb');
      expect(m).toBeInstanceOf(Float32Array);
      expect(m.length).toBe(3);

      preallocatePool(10);

      const m2 = createMatrix('rgb');
      expect(m2).toBeDefined();
    });
  });

  describe('Color Lifecycle', () => {
    it('should create and drop colors correctly', () => {
      const color = createColor('rgb', [1, 0, 0], 0.5);
      expect(color.space).toBe('rgb');
      expect(color.value[0]).toBe(1);
      expect(color.alpha).toBe(0.5);

      const originalBuffer = color.value;

      dropColor(color);

      const reused = createMatrix();
      expect(reused).toBe(originalBuffer);
    });

    it('should clone colors with new buffer references', () => {
      const original = createColor('oklab', [0.5, 0.1, 0.1]);
      const clone = cloneColor(original);

      expect(clone.space).toBe(original.space);
      expect(clone.value).not.toBe(original.value);
      expect(clone.value).toEqual(original.value);
    });
  });

  describe('Mutation and Derivation', () => {
    it('mutateColor: should change space in-place', () => {
      const color = createColor('rgb', [1, 1, 1]);
      mutateColor(color, 'oklab');

      expect(color.space).toBe('oklab');
      expect(color.value[0]).toBeCloseTo(1, 3);
    });

    it('mutateColor: should do nothing if space is the same', () => {
      const color = createColor('rgb', [1, 0, 0]);
      const originalValue = color.value;

      mutateColor(color, 'rgb');
      expect(color.value).toBe(originalValue);
    });

    it('deriveColor: should return a new color object in target space', () => {
      const original = createColor('rgb', [1, 1, 1]);
      const derived = deriveColor(original, 'oklab');

      expect(derived.space).toBe('oklab');
      expect(original.space).toBe('rgb');
      expect(derived.value).not.toBe(original.value);
    });

    it('deriveColor: should return a clone if target space matches', () => {
      const original = createColor('rgb', [1, 0, 0]);
      const derived = deriveColor(original, 'rgb');

      expect(derived.value).not.toBe(original.value);
      expect(derived.value).toEqual(original.value);
    });
  });
});
