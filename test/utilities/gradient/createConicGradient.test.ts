import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createConicGradient } from '~/utils/gradient';

describe('createConicGradient()', () => {
  it('should create a valid conic-gradient CSS string', () => {
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
    const result = createConicGradient({
      angle: 45,
      position: '50% 50%',
      stops,
    });
    expect(result).toContain('conic-gradient(from 45deg at 50% 50%');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should use default values for angle and position if not provided', () => {
    const stops = [
      { color: { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'> },
    ];
    const result = createConicGradient({ stops });
    expect(result).toContain('conic-gradient(from 0deg at center');
  });

  it('should handle stops without explicit positions', () => {
    const stops = [
      { color: { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'> },
      { color: { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'> },
    ];
    const result = createConicGradient({ stops });
    expect(result).toMatch(/rgb\(255 0 0\), rgb\(0 0 255\)/);
  });
});
