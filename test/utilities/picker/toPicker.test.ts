import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { toPicker } from '~/utils/picker';

describe('toPicker()', () => {
  it('should convert a pure Red RGB color to picker values', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1, 0, 0]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = toPicker(color);
    expect(result.h).toBe(0);
    expect(result.s).toBe(1);
    expect(result.v).toBe(1);
    expect(result.a).toBe(1);
  });

  it('should convert a semi-transparent Green color', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([0, 1, 0]),
      alpha: 0.5,
    } as Color<'rgb'>;
    const result = toPicker(color);
    expect(result.h).toBe(120);
    expect(result.a).toBe(0.5);
  });

  it('should handle conversion from OKLCH (Black)', () => {
    const color = {
      space: 'oklch',
      value: new Float32Array([0, 0, 0]),
      alpha: 1,
    } as Color<'oklch'>;
    const result = toPicker(color);
    expect(result.v).toBe(0);
  });

  it('should handle conversion from HSL (White)', () => {
    const color = {
      space: 'hsl',
      value: new Float32Array([0, 0, 100]),
      alpha: 1,
    } as Color<'hsl'>;
    const result = toPicker(color);
    expect(result.v).toBe(100);
    expect(result.s).toBe(0);
  });
});
