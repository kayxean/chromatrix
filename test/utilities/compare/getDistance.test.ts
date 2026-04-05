import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { getDistance } from '~/utils/compare';

describe('getDistance()', () => {
  it('should return 0 for identical colors in the same space', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    expect(getDistance(c1, c2)).toBe(0);
  });

  it('should return 0 for identical colors in different spaces', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'hsl', value: new Float32Array([0, 1, 0.5]), alpha: 1 } as Color<'hsl'>;
    expect(getDistance(c1, c2)).toBeCloseTo(0, 5);
  });

  it('should return positive distance for different colors', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
    const distance = getDistance(c1, c2);
    expect(distance).toBeCloseTo(0.5371, 4);
  });

  it('should calculate distance correctly if one color is already OKLAB', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'oklab', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'oklab'>;
    expect(getDistance(c1, c2)).toBeCloseTo(0, 3);
  });
});
