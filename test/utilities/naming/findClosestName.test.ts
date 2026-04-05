import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { findClosestName } from '~/utils/naming';

describe('findClosestName()', () => {
  it('should return the exact color name for a perfect match', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1, 0, 0]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = findClosestName(color);
    expect(result.name).toBe('red');
    expect(result.distance).toBe(0);
  });

  it('should return the closest color name for an approximate match', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([0.98, 0.01, 0.01]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = findClosestName(color);
    expect(result.name).toBe('red');
    expect(result.distance).toBeGreaterThan(0);
  });

  it('should identify rebeccapurple correctly', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([0.4, 0.2, 0.6]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = findClosestName(color);
    expect(result.name).toBe('rebeccapurple');
    expect(result.distance).toBe(0);
  });

  it('should handle black and white boundaries', () => {
    const white = {
      space: 'rgb',
      value: new Float32Array([1, 1, 1]),
      alpha: 1,
    } as Color<'rgb'>;
    const black = {
      space: 'rgb',
      value: new Float32Array([0, 0, 0]),
      alpha: 1,
    } as Color<'rgb'>;
    expect(findClosestName(white).name).toBe('white');
    expect(findClosestName(black).name).toBe('black');
  });
});
