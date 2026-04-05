import { describe, expect, it } from 'vitest';
import { dropColor } from '~/matrix';
import { parseColorName } from '~/utils/naming';

describe('parseColorName()', () => {
  it('should parse a known color name and return a pooled Color object', () => {
    const result = parseColorName('red');
    expect(result).not.toBeNull();
    expect(result!.space).toBe('rgb');
    expect(result!.value[0]).toBe(1);
    expect(result!.value[1]).toBe(0);
    expect(result!.value[2]).toBe(0);
    dropColor(result!);
  });

  it('should be case-insensitive', () => {
    const result = parseColorName('ReBeCcAPuRpLe');
    expect(result).not.toBeNull();
    expect(result!.value[0]).toBeCloseTo(0.4);
    expect(result!.value[2]).toBeCloseTo(0.6);
    dropColor(result!);
  });

  it('should return null for an unknown name', () => {
    const result = parseColorName('notacolor');
    expect(result).toBeNull();
  });
});
