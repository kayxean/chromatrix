import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { createScales } from '~/utils/palette';

describe('createScales()', () => {
  it('should create a smooth interpolation between multiple stops', () => {
    const colors = [
      { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>,
      { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>,
    ];
    const steps = 5;
    const result = createScales(colors, steps);
    expect(result).toHaveLength(steps);
    expect(result[0].value[0]).toBe(1);
    expect(result[4].value[2]).toBe(1);
    expect(result[2].value[0]).toBeCloseTo(0.5);
    expect(result[2].value[2]).toBeCloseTo(0.5);
    result.forEach((c) => dropColor(c));
  });

  it('should handle more than two color stops (multi-segment)', () => {
    const colors = [
      { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>,
      { space: 'rgb', value: new Float32Array([0, 1, 0]), alpha: 1 } as Color<'rgb'>,
      { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>,
    ];
    const result = createScales(colors, 3);
    expect(result[0].value[0]).toBe(1);
    expect(result[1].value[1]).toBe(1);
    expect(result[2].value[2]).toBe(1);
    result.forEach((c) => dropColor(c));
  });

  it('should return a copy of the stop if only one is provided', () => {
    const colors = [{ space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>];
    const result = createScales(colors, 3);
    expect(result).toHaveLength(1);
    expect(result[0].value).not.toBe(colors[0].value);
    dropColor(result[0]);
  });

  it('should return an empty array for zero steps', () => {
    const colors = [
      { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>,
      { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>,
    ];
    expect(createScales(colors, 0)).toEqual([]);
  });
});
