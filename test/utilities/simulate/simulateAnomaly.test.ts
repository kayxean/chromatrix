import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { simulateAnomaly } from '~/utils/simulate';
import { createMockColor } from '../../factory';

describe('simulateAnomaly()', () => {
  it('should simulate protanomaly (red-weak)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAnomaly(color, 'protanopia', 0.5);
    expect(result.value[0]).toBeCloseTo(0.7833, 4);
    expect(result.value[1]).toBeCloseTo(0.2792, 4);
    expect(result.value[2]).toBe(0);
    dropColor(result);
  });

  it('should simulate deuteranomaly (green-weak)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAnomaly(color, 'deuteranopia', 0.5);
    expect(result.value[0]).toBeCloseTo(0.8125, 4);
    expect(result.value[1]).toBeCloseTo(0.35, 4);
    expect(result.value[2]).toBe(0);
    dropColor(result);
  });

  it('should simulate tritanomaly (blue-weak)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAnomaly(color, 'tritanopia', 0.5);
    expect(result.value[0]).toBeCloseTo(0.975, 4);
    expect(result.value[1]).toBe(0);
    expect(result.value[2]).toBe(0);
    dropColor(result);
  });

  it('should handle 0 severity as original color', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAnomaly(color, 'protanopia', 0);
    expect(result.value[0]).toBe(1);
    expect(result.value[1]).toBe(0);
    dropColor(result);
  });

  it('should handle 1 severity as full deficiency', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAnomaly(color, 'protanopia', 1);
    expect(result.value[0]).toBeCloseTo(0.56667, 4);
    dropColor(result);
  });
});
