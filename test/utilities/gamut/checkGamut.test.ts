import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { checkGamut } from '~/utils/gamut';

describe('checkGamut()', () => {
  it('should return true for in-gamut RGB color', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([0.5, 0.5, 0.5]),
      alpha: 1,
    } as Color<'rgb'>;
    expect(checkGamut(color)).toBe(true);
  });

  it('should return false for out-of-gamut RGB color', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1.1, 0.5, 0.5]),
      alpha: 1,
    } as Color<'rgb'>;
    expect(checkGamut(color)).toBe(false);
  });

  it('should respect the tolerance parameter', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1.00005, 0, 0]),
      alpha: 1,
    } as Color<'rgb'>;
    expect(checkGamut(color)).toBe(true);
    expect(checkGamut(color, 0.00001)).toBe(false);
  });

  it('should return false for out-of-gamut OKLCH (Chroma > 0.4)', () => {
    const color = {
      space: 'oklch',
      value: new Float32Array([0.5, 0.5, 120]),
      alpha: 1,
    } as Color<'oklch'>;
    expect(checkGamut(color)).toBe(false);
  });

  it('should return true for any Hue value in LCH/OKLCH', () => {
    const color = {
      space: 'oklch',
      value: new Float32Array([0.5, 0.2, 400]),
      alpha: 1,
    } as Color<'oklch'>;
    expect(checkGamut(color)).toBe(true);
  });

  it('should return true for spaces without defined bounds', () => {
    const color = {
      space: 'custom' as any,
      value: new Float32Array([999, 999, 999]),
      alpha: 1,
    } as Color;
    expect(checkGamut(color)).toBe(true);
  });
});
