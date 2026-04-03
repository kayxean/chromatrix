import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../../shared';
import {
  createLinearGradient,
  createRadialGradient,
  createConicGradient,
  createSmoothGradient,
  createMultiColorGradient,
} from '../../utils/gradient';

describe('Gradient Utilities (gradient.ts)', () => {
  describe('createLinearGradient', () => {
    it('should create linear gradient with default angle', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 1, 1]);

      const result = createLinearGradient({
        stops: [
          { color: start, position: 0 },
          { color: end, position: 100 },
        ],
      });

      expect(result).toContain('linear-gradient');
      expect(result).toContain('180deg');

      dropColor(start);
      dropColor(end);
    });

    it('should create linear gradient with custom angle', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 1, 1]);

      const result = createLinearGradient({
        angle: 90,
        stops: [{ color: start }, { color: end }],
      });

      expect(result).toContain('90deg');

      dropColor(start);
      dropColor(end);
    });
  });

  describe('createRadialGradient', () => {
    it('should create radial gradient with default shape', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 0, 0]);

      const result = createRadialGradient({
        stops: [{ color: start }, { color: end }],
      });

      expect(result).toContain('radial-gradient');
      expect(result).toContain('ellipse at center');

      dropColor(start);
      dropColor(end);
    });
  });

  describe('createConicGradient', () => {
    it('should create conic gradient with default angle', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 0, 0]);

      const result = createConicGradient({
        stops: [{ color: start }, { color: end }],
      });

      expect(result).toContain('conic-gradient');
      expect(result).toContain('0deg at center');

      dropColor(start);
      dropColor(end);
    });
  });

  describe('createSmoothGradient', () => {
    it('should create smooth gradient with specified steps', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 1, 1]);

      const result = createSmoothGradient(start, end, 5);

      expect(result).toContain('linear-gradient');

      dropColor(start);
      dropColor(end);
    });
  });

  describe('createMultiColorGradient', () => {
    it('should create gradient from multiple colors', () => {
      const colors = [
        createColor('rgb', [1, 0, 0]),
        createColor('rgb', [0, 1, 0]),
        createColor('rgb', [0, 0, 1]),
      ];

      const result = createMultiColorGradient(colors);

      expect(result).toContain('linear-gradient');

      for (const c of colors) dropColor(c);
    });

    it('should throw on empty array', () => {
      expect(() => createMultiColorGradient([])).toThrow('At least two colors are required');
    });

    it('should return single color for single input', () => {
      const color = createColor('rgb', [1, 0, 0]);

      const result = createMultiColorGradient([color]);

      expect(result).toBe('rgb(255 0 0)');

      dropColor(color);
    });
  });
});
