import { describe, expect, it } from 'vitest';
import { checkGamut } from '~/utils/gamut';
import { createMockColor } from '../../factory';

describe('checkGamut()', () => {
  it('should return true for in-gamut RGB color', () => {
    const color = createMockColor('rgb', [0.5, 0.5, 0.5]);
    expect(checkGamut(color)).toBe(true);
  });

  it('should return false for out-of-gamut RGB color', () => {
    const color = createMockColor('rgb', [1.1, 0.5, 0.5]);
    expect(checkGamut(color)).toBe(false);
  });

  it('should respect the tolerance parameter', () => {
    const color = createMockColor('rgb', [1.00005, 0, 0]);
    expect(checkGamut(color)).toBe(true);
    expect(checkGamut(color, 0.00001)).toBe(false);
  });

  it('should return false for out-of-gamut OKLCH (Chroma > 0.4)', () => {
    const color = createMockColor('oklch', [0.5, 0.5, 120]);
    expect(checkGamut(color)).toBe(false);
  });

  it('should return true for any Hue value in LCH/OKLCH', () => {
    const color = createMockColor('oklch', [0.5, 0.2, 400]);
    expect(checkGamut(color)).toBe(true);
  });

  it('should return true for spaces without defined bounds', () => {
    const color = createMockColor('custom' as any, [999, 999, 999]);
    expect(checkGamut(color)).toBe(true);
  });
});
