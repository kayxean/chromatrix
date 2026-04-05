import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { fromPicker } from '~/utils/picker';

describe('fromPicker()', () => {
  it('should create a pure Red RGB color from picker values', () => {
    const result = fromPicker({ h: 0, s: 1, v: 1, a: 1 }, 'rgb');
    expect(result.space).toBe('rgb');
    expect(result.alpha).toBe(1);
    expect(result.value[0]).toBeCloseTo(1, 3);
    expect(result.value[1]).toBeCloseTo(0, 3);
    expect(result.value[2]).toBeCloseTo(0, 3);
    dropColor(result);
  });

  it('should create a semi-transparent color from picker values', () => {
    const result = fromPicker({ h: 120, s: 1, v: 1, a: 0.5 }, 'rgb');
    expect(result.alpha).toBe(0.5);
    expect(result.value[1]).toBeCloseTo(1, 3);
    dropColor(result);
  });

  it('should support conversion to different spaces (e.g., oklch)', () => {
    const result = fromPicker({ h: 0, s: 0, v: 0.5, a: 1 }, 'oklch');
    expect(result.space).toBe('oklch');
    expect(result.value[1]).toBeCloseTo(0, 3);
    expect(result.value[0]).toBeGreaterThan(0);
    dropColor(result);
  });
});
