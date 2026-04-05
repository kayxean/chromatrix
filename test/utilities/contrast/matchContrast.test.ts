import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { matchContrast, checkContrast } from '~/utils/contrast';

describe('matchContrast()', () => {
  it('should lighten a dark color to meet target contrast on a black background', () => {
    const fg = { space: 'rgb', value: new Float32Array([0.5, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const bg = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const target = 60;
    const result = matchContrast(fg, bg, target);
    const finalContrast = checkContrast(result, bg);
    expect(result.space).toBe('rgb');
    expect(result.value[0]).toBeGreaterThan(0.5);
    expect(Math.abs(finalContrast)).toBeGreaterThanOrEqual(target);
  });

  it('should darken a light color to meet target contrast on a white background', () => {
    const fg = { space: 'rgb', value: new Float32Array([0.8, 0.8, 1]), alpha: 1 } as Color<'rgb'>;
    const bg = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
    const target = 75;
    const result = matchContrast(fg, bg, target);
    const finalContrast = checkContrast(result, bg);
    expect(finalContrast).toBeLessThanOrEqual(-target);
    expect(result.value[0]).toBeLessThan(0.8);
  });

  it('should preserve the original alpha', () => {
    const fg = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 0.5 } as Color<'rgb'>;
    const bg = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const result = matchContrast(fg, bg, 60);
    expect(result.alpha).toBe(0.5);
  });
});
