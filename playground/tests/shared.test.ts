import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../shared';

describe('Shared Utilities & Pooling (shared.ts)', () => {
  describe('Color Lifecycle', () => {
    it('should create and drop colors correctly', () => {
      const color = createColor('rgb', [1, 0, 0], 0.5);
      expect(color.space).toBe('rgb');
      expect(color.value[0]).toBe(1);
      expect(color.alpha).toBe(0.5);

      dropColor(color);
    });

    it('should create color with default alpha', () => {
      const color = createColor('rgb', [0.5, 0.5, 0.5]);
      expect(color.alpha).toBe(1);

      dropColor(color);
    });

    it('should create color without values', () => {
      const color = createColor('oklab');
      expect(color.space).toBe('oklab');
      expect(color.value.length).toBe(3);

      dropColor(color);
    });
  });

  describe('Slot Management', () => {
    it('should reuse slots after dropColor', () => {
      const color1 = createColor('rgb', [1, 0, 0]);
      const index1 = color1.index;

      dropColor(color1);

      const color2 = createColor('rgb', [0, 1, 0]);
      expect(color2.index).toBe(index1);

      dropColor(color2);
    });

    it('should grow storage when slots are exhausted', () => {
      const colors = [];
      for (let i = 0; i < 1024; i++) {
        colors.push(createColor('rgb', [i / 1024, 0, 0]));
      }

      const color = createColor('rgb', [1, 1, 1]);
      expect(color).toBeDefined();

      for (const c of colors) {
        dropColor(c);
      }
      dropColor(color);
    });
  });
});
