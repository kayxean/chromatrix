import { describe, expect, it } from 'vitest';
import { checkContrastBulk } from '~/utils/contrast';
import { createMockColor } from '../../factory';

describe('checkContrastBulk()', () => {
  it('should return an array of contrast objects with correct scores and ratings', () => {
    const bg = createMockColor('rgb', [0, 0, 0]);
    const fg = [createMockColor('rgb', [1, 1, 1]), createMockColor('rgb', [0.5, 0.5, 0.5])];

    const result = checkContrastBulk(bg, fg);
    expect(result).toHaveLength(2);

    expect(result[0].contrast).toBe(114);
    expect(result[0].rating).toBe('platinum');
    expect(result[0].color).toBe(fg[0]);

    expect(result[1].contrast).toBeCloseTo(66.75, 1);
    expect(result[1].rating).toBe('silver');
    expect(result[1].color).toBe(fg[1]);

    expect(result[0].contrast).toBeGreaterThan(result[1].contrast);
  });

  it('should return empty array when provided no foreground colors', () => {
    const bg = createMockColor('rgb', [0, 0, 0]);
    const result = checkContrastBulk(bg, []);
    expect(result).toEqual([]);
  });
});
