import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { matchScales, checkContrast } from '~/utils/contrast';

describe('matchScales()', () => {
  it('should return an array of interpolated colors that all meet target contrast', () => {
    const fgStart = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const fgEnd = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
    const bg = {
      space: 'rgb',
      value: new Float32Array([0.13, 0.13, 0.13]),
      alpha: 1,
    } as Color<'rgb'>;
    const targetContrast = 60;
    const steps = 5;
    const result = matchScales([fgStart, fgEnd], bg, targetContrast, steps);
    expect(result).toHaveLength(steps);

    result.forEach((color) => {
      const contrast = checkContrast(color, bg);
      expect(Math.abs(contrast)).toBeGreaterThanOrEqual(targetContrast);
    });
  });

  it('should handle multi-stop interpolation before matching contrast', () => {
    const blue = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
    const red = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const bg = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
    const steps = 3;
    const target = 45;
    const result = matchScales([blue, red], bg, target, steps);
    const midContrast = checkContrast(result[1], bg);
    expect(Math.abs(midContrast)).toBeGreaterThanOrEqual(target);
  });
});
