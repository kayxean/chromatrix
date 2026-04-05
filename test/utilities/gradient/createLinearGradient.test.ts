import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createLinearGradient } from '~/utils/gradient';

describe('createLinearGradient()', () => {
  it('should create a valid linear-gradient CSS string with default angle', () => {
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
    const result = createLinearGradient({ stops });
    expect(result).toContain('linear-gradient(180deg');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should respect a custom angle', () => {
    const stops = [
      { color: { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'> },
    ];
    const result = createLinearGradient({ angle: 90, stops });
    expect(result).toContain('linear-gradient(90deg');
  });

  it('should handle multiple stops without explicit positions', () => {
    const stops = [
      { color: { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'> },
      { color: { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'> },
      {
        color: { space: 'rgb', value: new Float32Array([0.5, 0.5, 0.5]), alpha: 1 } as Color<'rgb'>,
      },
    ];
    const result = createLinearGradient({ stops });
    expect(result).toMatch(/rgb\(255 255 255\), rgb\(0 0 0\), rgb\(128 128 128\)/);
  });
});
