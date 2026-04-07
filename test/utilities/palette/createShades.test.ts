import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { createShades } from '~/utils/palette';
import { createMockColor } from '../../factory';

describe('createShades()', () => {
  it('should create exactly 5 shades between red and blue', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [0, 0, 1]);
    const steps = 5;
    const result = createShades(c1, c2, steps);
    expect(result).toHaveLength(steps);
    expect(result[0].value[0]).toBe(1);
    expect(result[4].value[2]).toBe(1);
    expect(result[1].value[0]).toBeCloseTo(0.75);
    expect(result[1].value[2]).toBeCloseTo(0.25);
    result.forEach((c) => dropColor(c));
  });

  it('should handle alpha interpolation correctly', () => {
    const c1 = createMockColor('rgb', [1, 1, 1], 1);
    const c2 = createMockColor('rgb', [1, 1, 1], 0);
    const result = createShades(c1, c2, 3);
    expect(result[1].alpha).toBe(0.5);
    result.forEach((c) => dropColor(c));
  });

  it('should return a single color copy when steps is 1', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [0, 0, 1]);
    const result = createShades(c1, c2, 1);
    expect(result).toHaveLength(1);
    expect(result[0].value[0]).toBe(1);
    expect(result[0].value).not.toBe(c1.value);
    dropColor(result[0]);
  });

  it('should return an empty array for invalid step counts', () => {
    const c1 = createMockColor('rgb', [1, 0, 0]);
    const c2 = createMockColor('rgb', [0, 0, 1]);
    expect(createShades(c1, c2, 0)).toEqual([]);
    expect(createShades(c1, c2, -5)).toEqual([]);
  });
});
