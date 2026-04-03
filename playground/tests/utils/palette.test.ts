import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../../shared';
import { createHarmony, createScales, createShades, mixColor } from '../../utils/palette';

describe('Palette Utilities (palette.ts)', () => {
  describe('createHarmony', () => {
    it('should generate complementary colors by rotating hue', () => {
      const color = createColor('hsl', [0, 1, 0.5]);

      const harmonies = createHarmony(color, [{ name: 'complementary', ratios: [180] }]);

      expect(harmonies[0].name).toBe('complementary');
      const resultColor = harmonies[0].colors[0];

      expect(resultColor.value[0]).toBe(180);
      expect(resultColor.space).toBe('hsl');

      dropColor(color);
      for (const h of harmonies) {
        for (const c of h.colors) {
          dropColor(c);
        }
      }
    });

    it('should use Oklch for polar rotation when input is Oklab', () => {
      const color = createColor('oklab', [0.5, 0.4, 0]);

      const harmonies = createHarmony(color, [{ name: 'triadic', ratios: [120, 240] }]);

      expect(harmonies[0].colors).toHaveLength(2);
      expect(harmonies[0].colors[0].space).toBe('oklab');

      dropColor(color);
      for (const h of harmonies) {
        for (const c of h.colors) {
          dropColor(c);
        }
      }
    });

    it('should use LCH for polar rotation when input is Lab', () => {
      const color = createColor('lab', [0.5, 0.2, 0.2]);

      const harmonies = createHarmony(color, [{ name: 'analogous', ratios: [30] }]);

      expect(harmonies[0].colors[0].space).toBe('lab');

      dropColor(color);
      for (const h of harmonies) {
        for (const c of h.colors) {
          dropColor(c);
        }
      }
    });

    it('should handle negative hue wrap-around', () => {
      const color = createColor('hsl', [10, 1, 0.5]);

      const harmonies = createHarmony(color, [{ name: 'negative-rotation', ratios: [-30] }]);

      const resultColor = harmonies[0].colors[0];
      expect(resultColor.value[0]).toBeCloseTo(340);

      dropColor(color);
      for (const h of harmonies) {
        for (const c of h.colors) {
          dropColor(c);
        }
      }
    });
  });

  describe('mixColor', () => {
    it('should linearly interpolate between two colors', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 1, 1]);

      const middle = mixColor(start, end, 0.5);
      expect(middle.value[0]).toBeCloseTo(0.5);
      expect(middle.value[1]).toBeCloseTo(0.5);
      expect(middle.value[2]).toBeCloseTo(0.5);

      dropColor(start);
      dropColor(end);
      dropColor(middle);
    });

    it('should take the shortest path for hue interpolation', () => {
      const start = createColor('hsl', [350, 1, 0.5]);
      const end = createColor('hsl', [10, 1, 0.5]);

      const middle = mixColor(start, end, 0.5);

      expect(middle.value[0]).toBeCloseTo(0);

      dropColor(start);
      dropColor(end);
      dropColor(middle);
    });

    it('should interpolate alpha values', () => {
      const start = createColor('rgb', [0, 0, 0], 0);
      const end = createColor('rgb', [1, 1, 1], 1);

      const res = mixColor(start, end, 0.2);
      expect(res.alpha).toBeCloseTo(0.2);

      dropColor(start);
      dropColor(end);
      dropColor(res);
    });

    it('should clamp weights outside the 0-1 range', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 1, 1]);

      const under = mixColor(start, end, -0.5);
      const over = mixColor(start, end, 1.5);

      expect(under.value[0]).toBe(0);
      expect(over.value[0]).toBe(1);

      dropColor(start);
      dropColor(end);
      dropColor(under);
      dropColor(over);
    });

    it('should correctly identify hue index for LCH and Oklch', () => {
      const start = createColor('oklch', [0.5, 0.1, 10]);
      const end = createColor('oklch', [0.5, 0.1, 350]);

      const res = mixColor(start, end, 0.5);
      expect(res.value[2]).toBeCloseTo(0);

      dropColor(start);
      dropColor(end);
      dropColor(res);
    });

    it('should handle large positive hue differences by wrapping backwards', () => {
      const start = createColor('hsl', [10, 1, 0.5]);
      const end = createColor('hsl', [350, 1, 0.5]);

      const res = mixColor(start, end, 0.5);
      expect(res.value[0]).toBeCloseTo(0);

      dropColor(start);
      dropColor(end);
      dropColor(res);
    });
  });

  describe('createShades and createScales', () => {
    it('should generate a specific number of steps', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 1, 1]);

      const steps = createShades(start, end, 5);
      expect(steps).toHaveLength(5);
      expect(steps[0].value[0]).toBe(0);
      expect(steps[4].value[0]).toBe(1);

      dropColor(start);
      dropColor(end);
      for (const s of steps) dropColor(s);
    });

    it('should handle multi-stop scales correctly', () => {
      const s1 = createColor('rgb', [1, 0, 0]);
      const s2 = createColor('rgb', [0, 1, 0]);
      const s3 = createColor('rgb', [0, 0, 1]);

      const scale = createScales([s1, s2, s3], 3);

      expect(scale[0].value[0]).toBe(1);
      expect(scale[1].value[1]).toBe(1);
      expect(scale[2].value[2]).toBe(1);

      dropColor(s1);
      dropColor(s2);
      dropColor(s3);
      for (const s of scale) dropColor(s);
    });

    it('should handle shades with zero or one step', () => {
      const start = createColor('rgb', [0, 0, 0]);
      const end = createColor('rgb', [1, 1, 1]);

      expect(createShades(start, end, 0)).toEqual([]);

      const result = createShades(start, end, 1);
      expect(result).toHaveLength(1);

      dropColor(start);
      dropColor(end);
      for (const r of result) dropColor(r);
    });

    it('should handle scales with zero steps or minimal stops', () => {
      const s1 = createColor('rgb', [1, 0, 0]);

      expect(createScales([s1], 0)).toEqual([]);

      const result = createScales([s1], 5);
      expect(result).toHaveLength(1);

      dropColor(s1);
      for (const r of result) dropColor(r);
    });
  });
});
