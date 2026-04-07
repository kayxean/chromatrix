import { describe, expect, it } from 'vitest';
import { toPicker } from '~/utils/picker';
import { createMockColor } from '../../factory';

describe('toPicker()', () => {
  it('should convert a pure Red RGB color to picker values', () => {
    const color = createMockColor('rgb', [1, 0, 0]);
    const result = toPicker(color);
    expect(result.h).toBe(0);
    expect(result.s).toBe(1);
    expect(result.v).toBe(1);
    expect(result.a).toBe(1);
  });

  it('should convert a semi-transparent Green color', () => {
    const color = createMockColor('rgb', [0, 1, 0], 0.5);
    const result = toPicker(color);
    expect(result.h).toBe(120);
    expect(result.a).toBe(0.5);
  });

  it('should handle conversion from OKLCH (Black)', () => {
    const color = createMockColor('oklch', [0, 0, 0]);
    const result = toPicker(color);
    expect(result.v).toBe(0);
  });

  it('should handle conversion from HSL (White)', () => {
    const color = createMockColor('hsl', [0, 0, 100]);
    const result = toPicker(color);
    expect(result.v).toBe(100);
    expect(result.s).toBe(0);
  });
});
