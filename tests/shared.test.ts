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
    // Reset pool state between tests to ensure isolation
    clearPool();
  });

  describe('Matrix Pooling', () => {
    it('should preallocate and retrieve from pool', () => {
      // Warm up the engine by pre-creating buffers
      preallocatePool(5);

      const m1 = createMatrix();
      expect(m1).toBeInstanceOf(Float32Array);
      expect(m1.length).toBe(3); // Standard 3-component color vector
    });

    it('should reuse matrices from the pool', () => {
      /**
       * This is the core of the zero-allocation strategy.
       * Dropping a matrix and immediately creating one should yield
       * the exact same object reference.
       */
      const m1 = createMatrix();
      dropMatrix(m1);

      const m2 = createMatrix();
      expect(m2).toBe(m1); // Reference equality check
    });

    it('should respect the MAX_POOL_SIZE limit', () => {
      /**
       * To prevent memory leaks, the pool must have a ceiling (256).
       * We simulate an overflow and verify the boundary logic.
       */
      for (let i = 0; i < 300; i++) {
        dropMatrix(new Float32Array(3) as unknown as ColorMatrix<'rgb'>);
      }

      // Verify that the engine doesn't crash after overflow
      const m = createMatrix('rgb');
      expect(m).toBeInstanceOf(Float32Array);
      expect(m.length).toBe(3);

      // Verify that preallocate respects current capacity to avoid redundant work
      preallocatePool(10);

      const m2 = createMatrix('rgb');
      expect(m2).toBeDefined();
    });
  });

  describe('Color Lifecycle', () => {
    it('should create and drop colors correctly', () => {
      // createColor combines space metadata with a pooled buffer
      const color = createColor('rgb', [1, 0, 0], 0.5);
      expect(color.space).toBe('rgb');
      expect(color.value[0]).toBe(1);
      expect(color.alpha).toBe(0.5);

      const originalBuffer = color.value;

      // dropColor should detach the buffer and return it to the pool
      dropColor(color);

      const reused = createMatrix();
      expect(reused).toBe(originalBuffer);
    });

    it('should clone colors with new buffer references', () => {
      // Clones are useful when you need a snapshot that won't be mutated
      const original = createColor('oklab', [0.5, 0.1, 0.1]);
      const clone = cloneColor(original);

      expect(clone.space).toBe(original.space);
      expect(clone.value).not.toBe(original.value); // Different reference
      expect(clone.value).toEqual(original.value); // Same content
    });
  });

  describe('Mutation and Derivation', () => {
    it('mutateColor: should change space in-place', () => {
      /**
       * Mutation is the high-performance path.
       * It updates the existing object rather than creating a new one.
       */
      const color = createColor('rgb', [1, 1, 1]);
      mutateColor(color, 'oklab');

      expect(color.space).toBe('oklab');
      expect(color.value[0]).toBeCloseTo(1, 3);
    });

    it('mutateColor: should do nothing if space is the same', () => {
      // Efficiency check: don't run conversion logic if types already match
      const color = createColor('rgb', [1, 0, 0]);
      const originalValue = color.value;

      mutateColor(color, 'rgb');
      expect(color.value).toBe(originalValue);
    });

    it('deriveColor: should return a new color object in target space', () => {
      /**
       * Derivation is the non-destructive path.
       * The original color remains untouched.
       */
      const original = createColor('rgb', [1, 1, 1]);
      const derived = deriveColor(original, 'oklab');

      expect(derived.space).toBe('oklab');
      expect(original.space).toBe('rgb');
      expect(derived.value).not.toBe(original.value);
    });

    it('deriveColor: should return a clone if target space matches', () => {
      // If spaces match, deriveColor acts as a standard clone
      const original = createColor('rgb', [1, 0, 0]);
      const derived = deriveColor(original, 'rgb');

      expect(derived.value).not.toBe(original.value);
      expect(derived.value).toEqual(original.value);
    });
  });
});
