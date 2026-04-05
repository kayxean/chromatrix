import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { checkContrast } from '~/utils/contrast';

describe('checkContrast()', () => {
  it('should return APCA contrast score for white on black', () => {
    const white = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
    const black = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
    expect(checkContrast(white, black)).toBe(114);
  });

  it('should return 0 for identical colors', () => {
    const c1 = { space: 'rgb', value: new Float32Array([0.5, 0.5, 0.5]), alpha: 1 } as Color<'rgb'>;
    const c2 = { space: 'rgb', value: new Float32Array([0.5, 0.5, 0.5]), alpha: 1 } as Color<'rgb'>;
    expect(checkContrast(c1, c2)).toBe(0);
  });

  it('should return a negative score for dark text on light background', () => {
    const black = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const white = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
    expect(checkContrast(black, white)).toBe(-114);
  });
});
