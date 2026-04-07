import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { simulateAmbient } from '~/utils/simulate';
import { createMockColor } from '../../factory';

describe('simulateAmbient()', () => {
  it('should simulate ambient glare at default intensity (0.4)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAmbient(color);
    expect(result.value[0]).toBeCloseTo(1, 4);
    expect(result.value[1]).toBeCloseTo(0.4, 4);
    expect(result.value[2]).toBeCloseTo(0.4, 4);
    dropColor(result);
  });

  it('should simulate high intensity glare (0.8)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAmbient(color, 0.8);
    expect(result.value[0]).toBeCloseTo(1, 4);
    expect(result.value[1]).toBeCloseTo(0.8, 4);
    expect(result.value[2]).toBeCloseTo(0.8, 4);
    dropColor(result);
  });

  it('should handle 0 intensity as original color', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAmbient(color, 0);
    expect(result.value[0]).toBe(1);
    expect(result.value[1]).toBe(0);
    expect(result.value[2]).toBe(0);
    dropColor(result);
  });

  it('should handle 1 intensity as pure white wash', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateAmbient(color, 1);
    expect(result.value[0]).toBe(1);
    expect(result.value[1]).toBe(1);
    expect(result.value[2]).toBe(1);
    dropColor(result);
  });

  it('should maintain alpha transparency', () => {
    const color = createMockColor('lrgb', [1, 0, 0], 0.5);
    const result = simulateAmbient(color, 0.4);
    expect(result.alpha).toBe(0.5);
    dropColor(result);
  });
});
