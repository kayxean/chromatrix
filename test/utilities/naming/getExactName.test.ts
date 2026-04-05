import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { getExactName } from '~/utils/naming';

describe('getExactName()', () => {
  it('should return exact name for a named color', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1, 0, 0]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = getExactName(color);
    expect(result).toBe('red');
  });

  it('should return null for an unnamed color', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([0.123, 0.456, 0.789]),
      alpha: 1,
    } as Color<'rgb'>;
    const result = getExactName(color);
    expect(result).toBeNull();
  });

  it('should respect the tolerance parameter', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([0.9999, 0, 0]),
      alpha: 1,
    } as Color<'rgb'>;
    expect(getExactName(color)).toBe('red');
    expect(getExactName(color, 0.0000001)).toBeNull();
  });
});
