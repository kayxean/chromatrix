import { describe, expect, it } from 'vitest';
import { isEqual } from '~/utils/compare';
import { createMockColor } from '../../factory';

describe('isEqual()', () => {
  it('should return true for identical colors (same space)', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [1, 0, 0]);
    expect(isEqual(c1, c2)).toBe(true);
  });

  it('should return true for identical colors in different spaces', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('oklab', [0.6279, 0.2248, 0.1258]);
    expect(isEqual(c1, c2, 0.001)).toBe(true);
  });

  it('should return true for the exact same object reference', () => {
    const c1 = createMockColor('rgb', [0.5, 0.5, 0.5]);
    expect(isEqual(c1, c1)).toBe(true);
  });

  it('should return false for different colors', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [0, 0, 1]);
    expect(isEqual(c1, c2)).toBe(false);
  });

  it('should return false for different alpha', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [1, 0, 0], 0.5);
    expect(isEqual(c1, c2)).toBe(false);
  });

  it('should respect custom tolerance levels', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [1, 0.005, 0]);
    expect(isEqual(c1, c2)).toBe(false);
    expect(isEqual(c1, c2, 0.01)).toBe(true);
  });
});
