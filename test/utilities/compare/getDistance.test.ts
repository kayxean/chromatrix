import { describe, expect, it } from 'vitest';
import { getDistance } from '~/utils/compare';
import { createMockColor } from '../../factory';

describe('getDistance()', () => {
  it('should return 0 for identical colors in the same space', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [1, 0, 0]);
    expect(getDistance(c1, c2)).toBe(0);
  });

  it('should return 0 for identical colors in different spaces', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('hsl', [0, 1, 0.5]);
    expect(getDistance(c1, c2)).toBeCloseTo(0, 5);
  });

  it('should return positive distance for different colors', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [0, 0, 1]);
    const distance = getDistance(c1, c2);
    expect(distance).toBeCloseTo(0.5371, 4);
  });

  it('should calculate distance correctly if one color is already OKLAB', () => {
    const c1 = createMockColor('rgb', [1, 1, 1]);
    const c2 = createMockColor('oklab', [1, 0, 0]);
    expect(getDistance(c1, c2)).toBeCloseTo(0, 3);
  });
});
