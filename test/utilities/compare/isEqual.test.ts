import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { isEqual } from '~/utils/compare';

describe('isEqual()', () => {
  it('should return true for identical colors (same space)', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    expect(isEqual(c1, c2)).toBe(true);
  });

  it('should return true for identical colors in different spaces', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = {
      space: 'oklab',
      value: new Float32Array([0.6279, 0.2248, 0.1258]),
      alpha: 1,
    } as Color<'oklab'>;
    expect(isEqual(c1, c2, 0.001)).toBe(true);
  });

  it('should return true for the exact same object reference', () => {
    const c1 = { space: 'rgb', value: new Float32Array([0.5, 0.5, 0.5]), alpha: 1 } as Color<'rgb'>;
    expect(isEqual(c1, c1)).toBe(true);
  });

  it('should return false for different colors', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
    expect(isEqual(c1, c2)).toBe(false);
  });

  it('should return false for different alpha', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 0.5 } as Color<'rgb'>;
    expect(isEqual(c1, c2)).toBe(false);
  });

  it('should respect custom tolerance levels', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([1, 0.005, 0]), alpha: 1 } as Color<'rgb'>;
    expect(isEqual(c1, c2)).toBe(false);
    expect(isEqual(c1, c2, 0.01)).toBe(true);
  });
});
