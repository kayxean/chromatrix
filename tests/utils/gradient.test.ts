import { describe, expect, it } from 'vitest';
import {
  createConicGradient,
  createLinearGradient,
  createMultiColorGradient,
  createRadialGradient,
  createSmoothGradient,
} from '~/utils/gradient';
import { createColor, dropColor } from '~/shared';

describe('gradient', () => {
  describe('createLinearGradient', () => {
    it('should create basic linear gradient', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createLinearGradient({
        stops: [{ color: red }, { color: blue }],
      });

      expect(gradient).toContain('linear-gradient');
      expect(gradient).toContain('180deg');
      expect(gradient).toContain('rgb(');

      dropColor(red);
      dropColor(blue);
    });

    it('should respect custom angle', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createLinearGradient({
        angle: 45,
        stops: [{ color: red }, { color: blue }],
      });

      expect(gradient).toContain('45deg');

      dropColor(red);
      dropColor(blue);
    });

    it('should include position stops', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createLinearGradient({
        stops: [
          { color: red, position: 0 },
          { color: blue, position: 100 },
        ],
      });

      expect(gradient).toContain('0%');
      expect(gradient).toContain('100%');

      dropColor(red);
      dropColor(blue);
    });
  });

  describe('createRadialGradient', () => {
    it('should create basic radial gradient', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createRadialGradient({
        stops: [{ color: red }, { color: blue }],
      });

      expect(gradient).toContain('radial-gradient');
      expect(gradient).toContain('ellipse');
      expect(gradient).toContain('center');

      dropColor(red);
      dropColor(blue);
    });

    it('should respect shape option', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createRadialGradient({
        shape: 'circle',
        stops: [{ color: red }, { color: blue }],
      });

      expect(gradient).toContain('circle');

      dropColor(red);
      dropColor(blue);
    });

    it('should respect position option', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createRadialGradient({
        position: 'top left',
        stops: [{ color: red }, { color: blue }],
      });

      expect(gradient).toContain('top left');

      dropColor(red);
      dropColor(blue);
    });
  });

  describe('createConicGradient', () => {
    it('should create basic conic gradient', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createConicGradient({
        stops: [{ color: red }, { color: blue }],
      });

      expect(gradient).toContain('conic-gradient');
      expect(gradient).toContain('from 0deg');
      expect(gradient).toContain('center');

      dropColor(red);
      dropColor(blue);
    });

    it('should respect angle option', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createConicGradient({
        angle: 90,
        stops: [{ color: red }, { color: blue }],
      });

      expect(gradient).toContain('from 90deg');

      dropColor(red);
      dropColor(blue);
    });
  });

  describe('createSmoothGradient', () => {
    it('should handle steps === 1', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createSmoothGradient(red, blue, 1);

      expect(gradient).toContain('linear-gradient');
      expect(gradient).toContain('50%');

      dropColor(red);
      dropColor(blue);
    });

    it('should create smooth linear gradient', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createSmoothGradient(red, blue, 5);

      expect(gradient).toContain('linear-gradient');
      expect(gradient).toContain('0%');
      expect(gradient).toContain('100%');

      dropColor(red);
      dropColor(blue);
    });

    it('should create smooth radial gradient', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createSmoothGradient(red, blue, 3, 'radial');

      expect(gradient).toContain('radial-gradient');

      dropColor(red);
      dropColor(blue);
    });

    it('should create smooth conic gradient', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createSmoothGradient(red, blue, 4, 'conic');

      expect(gradient).toContain('conic-gradient');

      dropColor(red);
      dropColor(blue);
    });
  });

  describe('createMultiColorGradient', () => {
    it('should create gradient from multiple colors', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const green = createColor('rgb', [0, 1, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const gradient = createMultiColorGradient([red, green, blue]);

      expect(gradient).toContain('linear-gradient');
      expect(gradient).toContain('0%');
      expect(gradient).toContain('50%');
      expect(gradient).toContain('100%');

      dropColor(red);
      dropColor(green);
      dropColor(blue);
    });

    it('should handle single color', () => {
      const red = createColor('rgb', [1, 0, 0]);

      const gradient = createMultiColorGradient([red]);

      expect(gradient).toContain('rgb(');
      expect(gradient).not.toContain('gradient');

      dropColor(red);
    });

    it('should throw for empty array', () => {
      expect(() => createMultiColorGradient([])).toThrow();
    });

    it('should support different gradient types', () => {
      const red = createColor('rgb', [1, 0, 0]);
      const blue = createColor('rgb', [0, 0, 1]);

      const linear = createMultiColorGradient([red, blue], 'linear');
      const radial = createMultiColorGradient([red, blue], 'radial');
      const conic = createMultiColorGradient([red, blue], 'conic');

      expect(linear).toContain('linear-gradient');
      expect(radial).toContain('radial-gradient');
      expect(conic).toContain('conic-gradient');

      dropColor(red);
      dropColor(blue);
    });
  });
});
