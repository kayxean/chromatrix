import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createRadialGradient } from '~/utils/gradient';

describe('createRadialGradient()', () => {
  it('should create a valid radial-gradient CSS string', () => {
    const stops = [
      {
        color: { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>,
        position: 0,
      },
      {
        color: { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>,
        position: 100,
      },
    ];
    const result = createRadialGradient({
      shape: 'circle',
      position: 'top right',
      stops,
    });
    expect(result).toContain('radial-gradient(circle at top right');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should use default values for shape and position if not provided', () => {
    const stops = [
      { color: { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'> },
    ];
    const result = createRadialGradient({ stops });
    expect(result).toContain('radial-gradient(ellipse at center');
  });

  it('should handle stops without explicit positions', () => {
    const stops = [
      { color: { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'> },
      { color: { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'> },
    ];
    const result = createRadialGradient({ stops });
    expect(result).toMatch(/rgb\(255 0 0\), rgb\(0 0 255\)/);
  });
});
