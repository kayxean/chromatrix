import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { clampColor } from '~/utils/gamut';

describe('clampColor()', () => {
  it('should return in-gamut color unchanged', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([0.5, 0.2, 0.8]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = clampColor(color);
    expect(result.value[0]).toBeCloseTo(0.5, 6);
    expect(result.value[1]).toBeCloseTo(0.2, 6);
    expect(result.value[2]).toBeCloseTo(0.8, 6);
  });

  it('should clamp out-of-gamut RGB values', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1.5, -0.2, 0.5]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = clampColor(color);
    expect(result.value[0]).toBe(1);
    expect(result.value[1]).toBe(0);
    expect(result.value[2]).toBe(0.5);
  });

  it('should wrap hue values in OKLCH correctly', () => {
    const color = {
      space: 'oklch',
      value: new Float32Array([0.5, 0.2, 400]),
      alpha: 1,
    } as Color<'oklch'>;
    const result = clampColor(color);
    expect(result.value[2]).toBeCloseTo(40, 4);

    const colorNeg = {
      space: 'oklch',
      value: new Float32Array([0.5, 0.2, -10]),
      alpha: 1,
    } as Color<'oklch'>;
    expect(clampColor(colorNeg).value[2]).toBeCloseTo(350, 4);
  });

  it('should mutate the original object when mutate is true', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1.5, 1.5, 1.5]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = clampColor(color, true);
    expect(result).toBe(color);
    expect(color.value[0]).toBe(1);
  });

  it('should return a new object and new matrix when mutate is false', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1.5, 1.5, 1.5]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = clampColor(color, false);
    expect(result).not.toBe(color);
    expect(result.value).not.toBe(color.value);
    expect(result.value[0]).toBe(1);
    expect(color.value[0]).toBe(1.5);
  });
});
