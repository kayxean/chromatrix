import { describe, expect, it } from 'vitest';
import { getExactName } from '~/utils/naming';
import { createMockColor } from '../../factory';

describe('getExactName()', () => {
  it('should return exact name for a named color', () => {
    const color = createMockColor('rgb', [1, 0, 0]);
    const result = getExactName(color);
    expect(result).toBe('red');
  });

  it('should return null for an unnamed color', () => {
    const color = createMockColor('rgb', [0.123, 0.456, 0.789]);
    const result = getExactName(color);
    expect(result).toBeNull();
  });

  it('should respect the tolerance parameter', () => {
    const color = createMockColor('rgb', [0.9999, 0, 0]);
    expect(getExactName(color)).toBe('red');
    expect(getExactName(color, 0.0000001)).toBeNull();
  });
});
