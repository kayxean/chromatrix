import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { simulateDeficiency } from '~/utils/simulate';
import { createMockColor } from '../../factory';

describe('simulateDeficiency()', () => {
  it('should simulate protanopia (red-blind)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateDeficiency(color, 'protanopia');
    expect(result.value[0]).toBeCloseTo(0.56667, 4);
    expect(result.value[1]).toBeCloseTo(0.55833, 4);
    expect(result.value[2]).toBeCloseTo(0, 4);
    dropColor(result);
  });

  it('should simulate deuteranopia (green-blind)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateDeficiency(color, 'deuteranopia');
    expect(result.value[0]).toBeCloseTo(0.625, 4);
    expect(result.value[1]).toBeCloseTo(0.7, 4);
    expect(result.value[2]).toBeCloseTo(0, 4);
    dropColor(result);
  });

  it('should simulate tritanopia (blue-blind)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateDeficiency(color, 'tritanopia');
    expect(result.value[0]).toBeCloseTo(0.95, 4);
    expect(result.value[1]).toBeCloseTo(0, 4);
    expect(result.value[2]).toBeCloseTo(0, 4);
    dropColor(result);
  });

  it('should simulate achromatopsia (total color blindness)', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    const result = simulateDeficiency(color, 'achromatopsia');
    const expected = 0.2126;
    expect(result.value[0]).toBeCloseTo(expected, 4);
    expect(result.value[1]).toBeCloseTo(expected, 4);
    expect(result.value[2]).toBeCloseTo(expected, 4);
    dropColor(result);
  });

  it('should handle "none" or undefined types correctly', () => {
    const color = createMockColor('lrgb', [1, 0, 0]);
    // @ts-ignore - testing runtime resilience
    const result = simulateDeficiency(color, 'none');
    expect(result.value[0]).toBe(1);
    expect(result.value).not.toBe(color.value);
    dropColor(result);
  });
});
