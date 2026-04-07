import { describe, expect, it } from 'vitest';
import { findClosestName } from '~/utils/naming';
import { createMockColor } from '../../factory';

describe('findClosestName()', () => {
  it('should return the exact color name for a perfect match', () => {
    const color = createMockColor('rgb', [1, 0, 0]);
    const result = findClosestName(color);
    expect(result.name).toBe('red');
    expect(result.distance).toBe(0);
  });

  it('should return the closest color name for an approximate match', () => {
    const color = createMockColor('rgb', [0.98, 0.01, 0.01]);
    const result = findClosestName(color);
    expect(result.name).toBe('red');
    expect(result.distance).toBeGreaterThan(0);
  });

  it('should identify rebeccapurple correctly', () => {
    const color = createMockColor('rgb', [0.4, 0.2, 0.6]);
    const result = findClosestName(color);
    expect(result.name).toBe('rebeccapurple');
    expect(result.distance).toBe(0);
  });

  it('should handle black and white boundaries', () => {
    const white = createMockColor('rgb', [1, 1, 1]);
    const black = createMockColor('rgb', [0, 0, 0]);
    expect(findClosestName(white).name).toBe('white');
    expect(findClosestName(black).name).toBe('black');
  });
});
