import { describe, expect, it } from 'vitest';
import { formatCss } from '~/format';
import { createMockColor } from '../factory';

describe('formatCss()', () => {
  it('should format HEX', () => {
    const color = createMockColor('rgb', [1, 0.5, 0]);
    const result = formatCss(color, true);
    expect(result).toBe('#ff8000');
  });

  it('should format RGB', () => {
    const color = createMockColor('rgb', [1, 0.5, 0]);
    const result = formatCss(color);
    expect(result).toBe('rgb(255 128 0)');
  });

  it('should format HSL', () => {
    const color = createMockColor('hsl', [180, 0.5, 0.5]);
    const result = formatCss(color);
    expect(result).toBe('hsl(180deg 50% 50%)');
  });

  it('should format HWB', () => {
    const color = createMockColor('hwb', [180, 0.5, 0.5]);
    const result = formatCss(color);
    expect(result).toBe('hwb(180deg 50% 50%)');
  });

  it('should format LAB', () => {
    const color = createMockColor('lab', [50, 20, 30]);
    const result = formatCss(color);
    expect(result).toBe('lab(50% 20 30)');
  });

  it('should format LCH', () => {
    const color = createMockColor('lch', [50, 30, 120]);
    const result = formatCss(color);
    expect(result).toBe('lch(50% 30 120deg)');
  });

  it('should format OKLAB', () => {
    const color = createMockColor('oklab', [0.5, 0.15, 0.1]);
    const result = formatCss(color);
    expect(result).toBe('oklab(50% 0.15 0.1)');
  });

  it('should format OKLCH', () => {
    const color = createMockColor('oklch', [0.6, 0.2, 120]);
    const result = formatCss(color);
    expect(result).toBe('oklch(60% 0.2 120deg)');
  });
});
