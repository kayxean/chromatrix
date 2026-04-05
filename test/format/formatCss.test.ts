import type { Color } from '~/types';
import { describe, expect, it } from 'vitest';
import { formatCss } from '~/format';

describe('formatCss()', () => {
  it('should format HEX', () => {
    const color = { space: 'rgb', value: new Float32Array([1, 0.5, 0]), alpha: 1 } as Color<'rgb'>;
    const result = formatCss(color, true);
    expect(result).toBe('#ff8000');
  });

  it('should format RGB', () => {
    const color = { space: 'rgb', value: new Float32Array([1, 0.5, 0]), alpha: 1 } as Color<'rgb'>;
    const result = formatCss(color);
    expect(result).toBe('rgb(255 128 0)');
  });

  it('should format HSL', () => {
    const color = {
      space: 'hsl',
      value: new Float32Array([180, 0.5, 0.5]),
      alpha: 1,
    } as Color<'hsl'>;
    const result = formatCss(color);
    expect(result).toBe('hsl(180deg 50% 50%)');
  });

  it('should format HWB', () => {
    const color = {
      space: 'hwb',
      value: new Float32Array([180, 0.5, 0.5]),
      alpha: 1,
    } as Color<'hwb'>;
    const result = formatCss(color);
    expect(result).toBe('hwb(180deg 50% 50%)');
  });

  it('should format LAB', () => {
    const color = { space: 'lab', value: new Float32Array([50, 20, 30]), alpha: 1 } as Color<'lab'>;
    const result = formatCss(color);
    expect(result).toBe('lab(50% 20 30)');
  });

  it('should format LCH', () => {
    const color = {
      space: 'lch',
      value: new Float32Array([50, 30, 120]),
      alpha: 1,
    } as Color<'lch'>;
    const result = formatCss(color);
    expect(result).toBe('lch(50% 30 120deg)');
  });

  it('should format OKLAB', () => {
    const color = {
      space: 'oklab',
      value: new Float32Array([0.5, 0.15, 0.1]),
      alpha: 1,
    } as Color<'oklab'>;
    const result = formatCss(color);
    expect(result).toBe('oklab(50% 0.15 0.1)');
  });

  it('should format OKLCH', () => {
    const color = {
      space: 'oklch',
      value: new Float32Array([0.6, 0.2, 120]),
      alpha: 1,
    } as Color<'oklch'>;
    const result = formatCss(color);
    expect(result).toBe('oklch(60% 0.2 120deg)');
  });
});
