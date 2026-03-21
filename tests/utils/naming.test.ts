import { describe, expect, it } from 'vitest';
import { findClosestName, findSimilarNames, getExactName, parseColorName } from '~/utils/naming';
import { createColor, dropColor } from '~/shared';

describe('naming', () => {
  describe('findClosestName', () => {
    it('should find exact match for pure red', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const result = findClosestName(red);

      expect(result.name).toBe('red');
      expect(result.distance).toBeLessThan(0.01);

      dropColor(red);
    });

    it('should find exact match for white', () => {
      const white = createColor('rgb', [1, 1, 1]);
      const result = findClosestName(white);

      expect(result.name).toBe('white');
      expect(result.distance).toBeLessThan(0.01);

      dropColor(white);
    });

    it('should find closest match for custom color', () => {
      const custom = createColor('rgb', [0.5, 0.7, 0.9]);
      const result = findClosestName(custom);

      expect(result.name).toBeDefined();
      expect(typeof result.distance).toBe('number');
      expect(result.distance).toBeGreaterThanOrEqual(0);

      dropColor(custom);
    });
  });

  describe('getExactName', () => {
    it('should return name for exact match', () => {
      const blue = createColor('rgb', [0, 0, 1]);
      const name = getExactName(blue);

      expect(name).toBe('blue');

      dropColor(blue);
    });

    it('should return null for non-exact match', () => {
      const custom = createColor('rgb', [0.123, 0.456, 0.789]);
      const name = getExactName(custom);

      expect(name).toBeNull();

      dropColor(custom);
    });

    it('should handle tolerance parameter', () => {
      const almostRed = createColor('rgb', [0.999, 0.001, 0.001]);
      const strictName = getExactName(almostRed, 0.0001);
      const looseName = getExactName(almostRed, 0.1);

      expect(strictName).toBeNull();
      expect(looseName).toBe('red');

      dropColor(almostRed);
    });
  });

  describe('findSimilarNames', () => {
    it('should return multiple similar colors', () => {
      const color = createColor('rgb', [0.8, 0.2, 0.2]);
      const similar = findSimilarNames(color, 3);

      expect(similar).toHaveLength(3);
      expect(similar[0].distance).toBeLessThanOrEqual(similar[1].distance);
      expect(similar[1].distance).toBeLessThanOrEqual(similar[2].distance);

      dropColor(color);
    });

    it('should respect limit parameter', () => {
      const color = createColor('rgb', [0.5, 0.5, 0.5]);
      const similar = findSimilarNames(color, 10);

      expect(similar).toHaveLength(10);

      dropColor(color);
    });

    it('should return all colors when limit exceeds total', () => {
      const color = createColor('rgb', [0, 0, 0]);
      const similar = findSimilarNames(color, 1000);

      expect(similar.length).toBeGreaterThan(100);

      dropColor(color);
    });
  });

  describe('parseColorName', () => {
    it('should parse valid color name', () => {
      const red = parseColorName('red');

      expect(red).not.toBeNull();
      expect(red!.space).toBe('rgb');
      expect(red!.value[0]).toBe(1);
      expect(red!.value[1]).toBe(0);
      expect(red!.value[2]).toBe(0);

      dropColor(red!);
    });

    it('should handle case insensitivity', () => {
      const blue1 = parseColorName('blue');
      const blue2 = parseColorName('BLUE');
      const blue3 = parseColorName('Blue');

      expect(blue1).not.toBeNull();
      expect(blue2).not.toBeNull();
      expect(blue3).not.toBeNull();

      dropColor(blue1!);
      dropColor(blue2!);
      dropColor(blue3!);
    });

    it('should return null for invalid name', () => {
      const invalid = parseColorName('notacolor');

      expect(invalid).toBeNull();
    });

    it('should parse all standard CSS colors', () => {
      const names = ['black', 'white', 'red', 'green', 'blue', 'yellow', 'cyan', 'magenta'];

      for (const name of names) {
        const color = parseColorName(name);
        expect(color).not.toBeNull();
        dropColor(color!);
      }
    });
  });
});
