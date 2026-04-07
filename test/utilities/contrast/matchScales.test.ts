import { describe, expect, it } from 'vitest';
import { matchScales, checkContrast } from '~/utils/contrast';
import { createMockColor } from '../../factory';

describe('matchScales()', () => {
  it('should return an array of interpolated colors that all meet target contrast', () => {
    const fgStart = createMockColor('rgb', [1, 0, 0]);
    const fgEnd = createMockColor('rgb', [1, 1, 1]);
    const bg = createMockColor('rgb', [0.13, 0.13, 0.13]);
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
    const blue = createMockColor('rgb', [0, 0, 1]);
    const red = createMockColor('rgb', [1, 0, 0]);
    const bg = createMockColor('rgb', [1, 1, 1]);
    const steps = 3;
    const target = 45;
    const result = matchScales([blue, red], bg, target, steps);
    const midContrast = checkContrast(result[1], bg);
    expect(Math.abs(midContrast)).toBeGreaterThanOrEqual(target);
  });
});
