import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createMultiColorGradient } from '~/utils/gradient';

describe('createMultiColorGradient()', () => {
  it('should create a linear gradient with evenly distributed stops', () => {
    const colors = [
      { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>,
      { space: 'rgb', value: new Float32Array([0, 1, 0]), alpha: 1 } as Color<'rgb'>,
      { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>,
    ];
    const result = createMultiColorGradient(colors);
    expect(result).toContain('linear-gradient(180deg');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 255 0) 50%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should return a single color string if only one color is provided', () => {
    const colors = [{ space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>];
    const result = createMultiColorGradient(colors);
    expect(result).toBe('rgb(255 255 255)');
  });

  it('should throw an error if no colors are provided', () => {
    expect(() => createMultiColorGradient([])).toThrow('at least two colors are required');
  });

  it('should support switching to radial type with options', () => {
    const colors = [
      { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>,
      { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>,
    ];
    const result = createMultiColorGradient(colors, 'radial', {
      shape: 'circle',
      position: 'top left',
    });
    expect(result).toContain('radial-gradient(circle at top left');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });
});
