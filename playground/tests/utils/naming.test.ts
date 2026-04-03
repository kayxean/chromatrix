import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../../shared';
import {
  findClosestName,
  getExactName,
  findSimilarNames,
  parseColorName,
} from '../../utils/naming';

describe('Naming Utilities (naming.ts)', () => {
  describe('findClosestName', () => {
    it('should find closest CSS color name', () => {
      const color = createColor('rgb', [1, 0, 0]);

      const result = findClosestName(color);

      expect(result.name).toBe('red');

      dropColor(color);
    });

    it('should find closest to black', () => {
      const color = createColor('rgb', [0.1, 0.1, 0.1]);

      const result = findClosestName(color);

      expect(result.name).toBe('black');

      dropColor(color);
    });
  });

  describe('getExactName', () => {
    it('should return exact name within tolerance', () => {
      const color = createColor('rgb', [1, 0, 0]);

      const result = getExactName(color);

      expect(result).toBe('red');

      dropColor(color);
    });

    it('should return null outside tolerance', () => {
      const color = createColor('rgb', [0.8, 0.1, 0.1]);

      const result = getExactName(color, 0.001);

      expect(result).toBeNull();

      dropColor(color);
    });
  });

  describe('findSimilarNames', () => {
    it('should return similar colors sorted by distance', () => {
      const color = createColor('rgb', [1, 0, 0]);

      const results = findSimilarNames(color, 3);

      expect(results).toHaveLength(3);
      expect(results[0].name).toBe('red');

      dropColor(color);
    });
  });

  describe('parseColorName', () => {
    it('should parse valid color names', () => {
      const color = parseColorName('red');

      expect(color).not.toBeNull();
      expect(color?.value[0]).toBe(1);
      expect(color?.value[1]).toBe(0);
      expect(color?.value[2]).toBe(0);

      if (color) dropColor(color);
    });

    it('should return null for invalid names', () => {
      const color = parseColorName('notacolor');

      expect(color).toBeNull();
    });

    it('should be case insensitive', () => {
      const color = parseColorName('BLUE');

      expect(color).not.toBeNull();
      expect(color?.value[2]).toBe(1);

      if (color) dropColor(color);
    });
  });
});
