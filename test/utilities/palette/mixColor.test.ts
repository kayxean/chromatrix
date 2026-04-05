import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { mixColor } from '~/utils/palette';

describe('mixColor()', () => {
  it('should mix two RGB colors at 50% linearly', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 0 } as Color<'rgb'>;
    const result = mixColor(c1, c2, 0.5);
    expect(result.space).toBe('rgb');
    expect(result.value[0]).toBeCloseTo(0.5);
    expect(result.value[2]).toBeCloseTo(0.5);
    expect(result.alpha).toBeCloseTo(0.5);
    dropColor(result);
  });

  it('should perform shortest-path hue interpolation in HSL', () => {
    const c1 = { space: 'hsl', value: new Float32Array([350, 100, 50]), alpha: 1 } as Color<'hsl'>;
    const c2 = { space: 'hsl', value: new Float32Array([10, 100, 50]), alpha: 1 } as Color<'hsl'>;
    const result = mixColor(c1, c2, 0.5);
    expect(result.value[0]).toBeCloseTo(0);
    dropColor(result);
  });

  it('should handle hue wrapping from low to high', () => {
    const c1 = { space: 'hsl', value: new Float32Array([10, 100, 50]), alpha: 1 } as Color<'hsl'>;
    const c2 = { space: 'hsl', value: new Float32Array([350, 100, 50]), alpha: 1 } as Color<'hsl'>;
    const result = mixColor(c1, c2, 0.5);
    expect(result.value[0]).toBeCloseTo(0);
    dropColor(result);
  });

  it('should clamp the ratio between 0 and 1', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
    const underflow = mixColor(c1, c2, -1);
    const overflow = mixColor(c1, c2, 2);
    expect(underflow.value[0]).toBe(1);
    expect(overflow.value[2]).toBe(1);
    dropColor(underflow);
    dropColor(overflow);
  });

  it('should return a new matrix from the pool at ratio 0', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
    const result = mixColor(c1, c2, 0);
    expect(result.value[0]).toBe(1);
    expect(result.value).not.toBe(c1.value);
    dropColor(result);
  });
});
