import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../../shared';
import { simulateDeficiency } from '../../utils/simulate';

describe('Simulate Utilities (simulate.ts)', () => {
  describe('simulateDeficiency', () => {
    it('should simulate protanopia', () => {
      const color = createColor('rgb', [1, 0, 0]);

      const result = simulateDeficiency(color, 'protanopia');

      expect(result).toBeDefined();
      expect(result.space).toBe('rgb');

      dropColor(color);
      dropColor(result);
    });

    it('should simulate deuteranopia', () => {
      const color = createColor('rgb', [0, 1, 0]);

      const result = simulateDeficiency(color, 'deuteranopia');

      expect(result).toBeDefined();

      dropColor(color);
      dropColor(result);
    });

    it('should simulate tritanopia', () => {
      const color = createColor('rgb', [0, 0, 1]);

      const result = simulateDeficiency(color, 'tritanopia');

      expect(result).toBeDefined();

      dropColor(color);
      dropColor(result);
    });

    it('should simulate achromatopsia (grayscale)', () => {
      const color = createColor('rgb', [1, 0.5, 0]);

      const result = simulateDeficiency(color, 'achromatopsia');

      expect(result.value[0]).toBe(result.value[1]);
      expect(result.value[1]).toBe(result.value[2]);

      dropColor(color);
      dropColor(result);
    });

    it('should preserve alpha', () => {
      const color = createColor('rgb', [1, 0, 0], 0.5);

      const result = simulateDeficiency(color, 'protanopia');

      expect(result.alpha).toBe(0.5);

      dropColor(color);
      dropColor(result);
    });
  });
});
