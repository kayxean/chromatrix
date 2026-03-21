import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { createMatrix, dropMatrix } from '~/shared';
import { simulateDeficiency } from '~/utils/simulate';

describe('CVD Simulation Utilities (simulate.ts)', () => {
  it('should reduce color to grayscale for achromatopsia', () => {
    const v = createMatrix('rgb');
    v.set([1, 0, 0]);
    const color: Color = { space: 'rgb', value: v };

    const simulated = simulateDeficiency(color, 'achromatopsia');

    expect(simulated.value[0]).toBeCloseTo(simulated.value[1], 3);
    expect(simulated.value[1]).toBeCloseTo(simulated.value[2], 3);

    expect(simulated.value[0]).toBeCloseTo(0.498, 2);

    dropMatrix(v);
    dropMatrix(simulated.value);
  });

  it('should collapse red and green for deuteranopia', () => {
    const red = { space: 'rgb' as const, value: createMatrix('rgb') };
    const green = { space: 'rgb' as const, value: createMatrix('rgb') };
    red.value.set([1, 0, 0]);
    green.value.set([0, 1, 0]);

    const simRed = simulateDeficiency(red, 'deuteranopia');
    const simGreen = simulateDeficiency(green, 'deuteranopia');

    expect(simRed.value[0]).toBeGreaterThan(0.5);
    expect(simRed.value[1]).toBeGreaterThan(0.5);

    dropMatrix(red.value);
    dropMatrix(green.value);
    dropMatrix(simRed.value);
    dropMatrix(simGreen.value);
  });

  it('should handle tritanopia (blue-yellow deficiency)', () => {
    const blue = { space: 'rgb' as const, value: createMatrix('rgb') };
    blue.value.set([0, 0, 1]);

    const simulated = simulateDeficiency(blue, 'tritanopia');

    expect(simulated.value[2]).toBeLessThan(1);
    expect(simulated.value[1]).toBeGreaterThan(0.4);

    dropMatrix(blue.value);
    dropMatrix(simulated.value);
  });

  it('should preserve alpha through simulation', () => {
    const v = createMatrix('rgb');
    v.set([0.8, 0.2, 0.1]);
    const color: Color = { space: 'rgb', value: v, alpha: 0.42 };

    const simulated = simulateDeficiency(color, 'protanopia');
    expect(simulated.alpha).toBe(0.42);

    dropMatrix(v);
    dropMatrix(simulated.value);
  });

  it('should return the original color if type is not recognized', () => {
    const v = createMatrix('rgb');
    v.set([0.1, 0.2, 0.3]);
    const color: Color = { space: 'rgb', value: v };

    const simulated = simulateDeficiency(color, 'normal' as any);

    expect(simulated.value[0]).toBeCloseTo(0.1, 7);
    expect(simulated.value[1]).toBeCloseTo(0.2, 7);
    expect(simulated.value[2]).toBeCloseTo(0.3, 7);

    dropMatrix(v);
    dropMatrix(simulated.value);
  });
});
