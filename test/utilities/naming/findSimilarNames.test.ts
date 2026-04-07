import { describe, expect, it } from 'vitest';
import { findSimilarNames } from '~/utils/naming';
import { createMockColor } from '../../factory';

describe('findSimilarNames()', () => {
  it('should return a list of similar color names sorted by distance', () => {
    const color = createMockColor('rgb', [1, 0, 0]);
    const limit = 3;
    const result = findSimilarNames(color, limit);
    expect(result).toHaveLength(limit);
    expect(result[0].name).toBe('red');
    expect(result[0].distance).toBe(0);

    const names = result.map((r) => r.name);
    expect(names).toContain('crimson');
    expect(result[0].distance).toBeLessThanOrEqual(result[1].distance);
    expect(result[1].distance).toBeLessThanOrEqual(result[2].distance);
  });

  it('should respect the limit parameter', () => {
    const color = createMockColor('rgb', [0, 1, 0]);
    const result = findSimilarNames(color, 10);
    expect(result).toHaveLength(10);
  });

  it('should handle colors that are between names', () => {
    const color = createMockColor('rgb', [0.5, 0.5, 0.8]);
    const result = findSimilarNames(color, 2);
    expect(typeof result[0].distance).toBe('number');
    expect(result[0].name).toBeDefined();
  });
});
