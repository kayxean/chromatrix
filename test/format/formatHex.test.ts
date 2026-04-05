import { describe, expect, it } from 'vitest';
import { formatHex } from '~/format';

describe('formatHex()', () => {
  it('should format rgb to hex string', () => {
    const result = formatHex(255, 128, 0);
    expect(result).toBe('#ff8000');
  });

  it('should format black', () => {
    const result = formatHex(0, 0, 0);
    expect(result).toBe('#000000');
  });

  it('should format white', () => {
    const result = formatHex(255, 255, 255);
    expect(result).toBe('#ffffff');
  });

  it('should include alpha when provided', () => {
    const result = formatHex(255, 0, 0, 128);
    expect(result).toBe('#ff000080');
  });

  it('should omit alpha when fully opaque', () => {
    const result = formatHex(255, 0, 0, 255);
    expect(result).toBe('#ff0000');
  });
});
