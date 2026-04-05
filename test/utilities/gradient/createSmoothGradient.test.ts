import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createSmoothGradient } from '~/utils/gradient';

describe('createSmoothGradient()', () => {
  it('should create a linear smooth gradient with exactly 5 stops', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
    const result = createSmoothGradient(c1, c2, 5);
    expect(result).toContain('linear-gradient(180deg');
    expect(result).toContain('0%');
    expect(result).toContain('25%');
    expect(result).toContain('50%');
    expect(result).toContain('75%');
    expect(result).toContain('100%');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should handle a single step (50% position)', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
    const result = createSmoothGradient(c1, c2, 1);
    expect(result).toContain('50%');
  });

  it('should support radial smooth gradients with options', () => {
    const c1 = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
    const result = createSmoothGradient(c1, c2, 3, 'radial', {
      shape: 'circle',
      position: 'center',
    });
    expect(result).toContain('radial-gradient(circle at center');
    expect(result).toContain('0%');
    expect(result).toContain('50%');
    expect(result).toContain('100%');
  });

  it('should return an empty string for zero or negative steps', () => {
    const c1 = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
    expect(createSmoothGradient(c1, c2, 0)).toBe('');
  });
});
