import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createMatrix, dropMatrix } from '~/shared';
import {
  createHarmony,
  createScales,
  createShades,
  mixColor,
} from '~/utils/palette';

describe('Palette Utilities (palette.ts)', () => {
  describe('createHarmony', () => {
    it('should generate complementary colors by rotating hue', () => {
      // Harmonic rotations require polar coordinate systems.
      // This test ensures the base hue is shifted correctly across the wheel.
      const v = createMatrix('hsl');
      v.set([0, 1, 0.5]); // Pure Red
      const color: Color = { space: 'hsl', value: v };

      // Complementary harmony is a 180-degree offset.
      const harmonies = createHarmony(color, [
        { name: 'complementary', ratios: [180] },
      ]);

      expect(harmonies[0].name).toBe('complementary');
      const resultColor = harmonies[0].colors[0];

      // Red (0deg) + 180deg = Cyan (180deg)
      expect(resultColor.value[0]).toBe(180);
      expect(resultColor.space).toBe('hsl');

      dropMatrix(v);
      dropMatrix(resultColor.value);
    });

    it('should use Oklch for polar rotation when input is Oklab', () => {
      // Oklab/LCH use perceptual lightness and chroma.
      // Rotating in Oklch preserves the perceived intensity of the harmony.
      const v = createMatrix('oklab');
      v.set([0.5, 0.4, 0]);
      const color: Color = { space: 'oklab', value: v };

      const harmonies = createHarmony(color, [
        { name: 'triadic', ratios: [120, 240] },
      ]);

      expect(harmonies[0].colors).toHaveLength(2);
      expect(harmonies[0].colors[0].space).toBe('oklab');

      dropMatrix(v);
      for (const c of harmonies[0].colors) {
        dropMatrix(c.value);
      }
    });

    it('should use LCH for polar rotation when input is Lab', () => {
      // Lab to LCH conversion logic for polar hue rotation
      const v = createMatrix('lab');
      v.set([50, 20, 20]); // A mid-tone brownish-red
      const color: Color = { space: 'lab', value: v };

      const harmonies = createHarmony(color, [
        { name: 'analogous', ratios: [30] },
      ]);

      expect(harmonies[0].colors[0].space).toBe('lab');
      // Verify conversion changed a/b values based on rotation
      expect(harmonies[0].colors[0].value[1]).not.toBe(20);

      dropMatrix(v);
      dropMatrix(harmonies[0].colors[0].value);
    });

    it('should handle negative hue wrap-around', () => {
      // Ensures rotations resulting in negative values (10° - 30°) wrap to 340°
      const v = createMatrix('hsl');
      v.set([10, 1, 0.5]); // 10 degrees (Red/Orange)
      const color: Color = { space: 'hsl', value: v };

      const harmonies = createHarmony(color, [
        { name: 'negative-rotation', ratios: [-30] },
      ]);

      const resultColor = harmonies[0].colors[0];
      expect(resultColor.value[0]).toBeCloseTo(340);

      dropMatrix(v);
      dropMatrix(resultColor.value);
    });
  });

  describe('mixColor', () => {
    it('should linearly interpolate between two colors', () => {
      // Standard linear interpolation (lerp) for rectangular color spaces.
      const start = { space: 'rgb' as const, value: createMatrix('rgb') };
      const end = { space: 'rgb' as const, value: createMatrix('rgb') };
      start.value.set([0, 0, 0]);
      end.value.set([1, 1, 1]);

      const middle = mixColor(start, end, 0.5);
      expect(middle.value[0]).toBeCloseTo(0.5);
      expect(middle.value[1]).toBeCloseTo(0.5);
      expect(middle.value[2]).toBeCloseTo(0.5);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(middle.value);
    });

    it('should take the shortest path for hue interpolation', () => {
      // Cylindrical interpolation: 350° to 10° should cross 0°
      const start = { space: 'hsl' as const, value: createMatrix('hsl') };
      const end = { space: 'hsl' as const, value: createMatrix('hsl') };

      start.value.set([350, 1, 0.5]);
      end.value.set([10, 1, 0.5]);

      const middle = mixColor(start, end, 0.5);

      expect(middle.value[0]).toBeCloseTo(0);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(middle.value);
    });

    it('should interpolate alpha values', () => {
      // Standard linear weight for opacity regardless of color space
      const start = {
        space: 'rgb' as const,
        value: createMatrix('rgb'),
        alpha: 0,
      };
      const end = {
        space: 'rgb' as const,
        value: createMatrix('rgb'),
        alpha: 1,
      };

      const res = mixColor(start, end, 0.2);
      expect(res.alpha).toBeCloseTo(0.2);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(res.value);
    });

    it('should clamp weights outside the 0-1 range', () => {
      // Weight clamping logic: t < 0 => 0; t > 1 => 1
      const start = { space: 'rgb' as const, value: createMatrix('rgb') };
      const end = { space: 'rgb' as const, value: createMatrix('rgb') };
      start.value.set([0, 0, 0]);
      end.value.set([1, 1, 1]);

      const under = mixColor(start, end, -0.5);
      const over = mixColor(start, end, 1.5);

      expect(under.value[0]).toBe(0);
      expect(over.value[0]).toBe(1);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(under.value);
      dropMatrix(over.value);
    });

    it('should correctly identify hue index for LCH and Oklch', () => {
      // Oklch/LCH hue is located at index 2
      const start = { space: 'oklch' as const, value: createMatrix('oklch') };
      const end = { space: 'oklch' as const, value: createMatrix('oklch') };

      start.value.set([0.5, 0.1, 10]);
      end.value.set([0.5, 0.1, 350]);

      const res = mixColor(start, end, 0.5);
      expect(res.value[2]).toBeCloseTo(0);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(res.value);
    });

    it('should handle large positive hue differences by wrapping backwards', () => {
      // Hue wrap-around for distances > 180°
      const start = { space: 'hsl' as const, value: createMatrix('hsl') };
      const end = { space: 'hsl' as const, value: createMatrix('hsl') };

      start.value.set([10, 1, 0.5]);
      end.value.set([350, 1, 0.5]);

      const res = mixColor(start, end, 0.5);
      expect(res.value[0]).toBeCloseTo(0);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(res.value);
    });

    it('should skip hue wrapping when difference is less than 180', () => {
      // Regular interpolation when distance <= 180°
      const start = { space: 'hsl' as const, value: createMatrix('hsl') };
      const end = { space: 'hsl' as const, value: createMatrix('hsl') };

      start.value.set([10, 1, 0.5]);
      end.value.set([50, 1, 0.5]);

      const res = mixColor(start, end, 0.5);

      expect(res.value[0]).toBeCloseTo(30);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(res.value);
    });

    it('should ensure hue results are never negative', () => {
      // Post-interpolation normalization to keep hue in [0, 360) range
      const start = { space: 'hsl' as const, value: createMatrix('hsl') };
      const end = { space: 'hsl' as const, value: createMatrix('hsl') };

      start.value.set([5, 1, 0.5]);
      end.value.set([355, 1, 0.5]);

      const res = mixColor(start, end, 0.8);
      expect(res.value[0]).toBe(357);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(res.value);
    });
  });

  describe('createShades and createScales', () => {
    it('should generate a specific number of steps', () => {
      // Shades provide fixed-step interpolation between two colors
      const start = { space: 'rgb' as const, value: createMatrix('rgb') };
      const end = { space: 'rgb' as const, value: createMatrix('rgb') };
      start.value.set([0, 0, 0]);
      end.value.set([1, 1, 1]);

      const steps = createShades(start, end, 5);
      expect(steps).toHaveLength(5);
      expect(steps[0].value[0]).toBe(0);
      expect(steps[4].value[0]).toBe(1);

      dropMatrix(start.value);
      dropMatrix(end.value);
      for (const s of steps) dropMatrix(s.value);
    });

    it('should handle multi-stop scales correctly', () => {
      // Scales divide steps across segments defined by multiple stops
      const s1 = { space: 'rgb' as const, value: createMatrix('rgb') };
      const s2 = { space: 'rgb' as const, value: createMatrix('rgb') };
      const s3 = { space: 'rgb' as const, value: createMatrix('rgb') };
      s1.value.set([1, 0, 0]); // Red
      s2.value.set([0, 1, 0]); // Green
      s3.value.set([0, 0, 1]); // Blue

      const scale = createScales([s1, s2, s3], 3);

      expect(scale[0].value[0]).toBe(1);
      expect(scale[1].value[1]).toBe(1);
      expect(scale[2].value[2]).toBe(1);

      dropMatrix(s1.value);
      dropMatrix(s2.value);
      dropMatrix(s3.value);
      for (const s of scale) dropMatrix(s.value);
    });

    it('should handle shades with zero or one step', () => {
      const start = { space: 'rgb' as const, value: createMatrix('rgb') };
      const end = { space: 'rgb' as const, value: createMatrix('rgb') };

      // Case: steps <= 0
      expect(createShades(start, end, 0)).toEqual([]);

      // Case: steps === 1 (Clone path)
      const result = createShades(start, end, 1);
      expect(result).toHaveLength(1);
      expect(result[0].value).not.toBe(start.value);

      dropMatrix(start.value);
      dropMatrix(end.value);
      dropMatrix(result[0].value);
    });

    it('should handle scales with zero steps or minimal stops', () => {
      const s1 = { space: 'rgb' as const, value: createMatrix('rgb') };

      // Case: steps <= 0
      expect(createScales([s1], 0)).toEqual([]);

      // Case: stops.length < 2
      const result = createScales([s1], 5);
      expect(result).toHaveLength(1);
      expect(result[0].value).not.toBe(s1.value);

      dropMatrix(s1.value);
      dropMatrix(result[0].value);
    });
  });
});
