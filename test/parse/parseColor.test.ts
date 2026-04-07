import { describe, expect, it } from 'vitest';
import { parseColor } from '~/parse';
import { expectColorCloseTo } from '../factory';

describe('parseColor()', () => {
  it('should parse HEX', () => {
    const result = parseColor('#ff8000');
    expect(result.space).toBe('rgb');
    expect(result.alpha).toBe(1);
    expectColorCloseTo(result.value, [1, 0.5019, 0]);
  });

  it('should parse RGB', () => {
    const result = parseColor('rgb(255 128 0)');
    expect(result.space).toBe('rgb');
    expectColorCloseTo(result.value, [1, 0.5019, 0]);
  });

  it('should parse HSL', () => {
    const result = parseColor('hsl(180deg 50% 50%)');
    expect(result.space).toBe('hsl');
    expectColorCloseTo(result.value, [180, 0.5, 0.5]);
  });

  it('should parse HWB', () => {
    const result = parseColor('hwb(180deg 50% 50%)');
    expect(result.space).toBe('hwb');
    expectColorCloseTo(result.value, [180, 0.5, 0.5]);
  });

  it('should parse LAB', () => {
    const result = parseColor('lab(50% 20 30)');
    expect(result.space).toBe('lab');
    expectColorCloseTo(result.value, [0.5, 20, 30]);
  });

  it('should parse LCH', () => {
    const result = parseColor('lch(50% 30 120deg)');
    expect(result.space).toBe('lch');
    expectColorCloseTo(result.value, [0.5, 30, 120]);
  });

  it('should parse OKLAB', () => {
    const result = parseColor('oklab(50% 0.15 0.1)');
    expect(result.space).toBe('oklab');
    expectColorCloseTo(result.value, [0.5, 0.0015, 0.001]);
  });

  it('should parse OKLCH', () => {
    const result = parseColor('oklch(60% 0.2 120deg)');
    expect(result.space).toBe('oklch');
    expectColorCloseTo(result.value, [0.6, 0.002, 1.2]);
  });
});
