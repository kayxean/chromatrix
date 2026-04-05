import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { createHarmony } from '~/utils/palette';

describe('createHarmony()', () => {
  it('should create structured color harmonies with correct counts', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1, 0, 0]),
      alpha: 1,
    } as Color<'rgb'>;
    const variants = [
      { name: 'analogous', ratios: [-30, 30] },
      { name: 'complementary', ratios: [180] },
    ];
    const result = createHarmony(color, variants);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('analogous');
    expect(result[0].colors).toHaveLength(2);
    expect(result[1].name).toBe('complementary');
    expect(result[1].colors).toHaveLength(1);
    const compColor = result[1].colors[0];
    expect(compColor.space).toBe('rgb');
    expect(compColor.value[0]).toBeCloseTo(0);
    expect(compColor.value[1]).toBeCloseTo(1);
    expect(compColor.value[2]).toBeCloseTo(1);
    result.forEach((variant) => {
      variant.colors.forEach((c) => dropColor(c));
    });
  });

  it('should maintain the original alpha value across harmonies', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1, 1, 1]),
      alpha: 0.5,
    } as Color<'rgb'>;
    const result = createHarmony(color, [{ name: 'test', ratios: [90] }]);
    expect(result[0].colors[0].alpha).toBe(0.5);
    dropColor(result[0].colors[0]);
  });

  it('should handle hue wrapping correctly (e.g., 350 + 20 = 10)', () => {
    const color = {
      space: 'hsl',
      value: new Float32Array([350, 100, 50]),
      alpha: 1,
    } as Color<'hsl'>;
    const result = createHarmony(color, [{ name: 'wrap', ratios: [20] }]);
    expect(result[0].colors[0].value[0]).toBeCloseTo(10);
    dropColor(result[0].colors[0]);
  });
});
