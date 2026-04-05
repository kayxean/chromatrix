import { describe, expect, it } from 'vitest';
import { roundTo } from '~/format';

describe('roundTo()', () => {
  it('should round to 0 decimal places', () => {
    expect(roundTo(3.14159, 0)).toBe(3);
  });

  it('should round to 2 decimal places', () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
  });

  it('should round to 4 decimal places', () => {
    expect(roundTo(3.14159, 4)).toBe(3.1416);
  });

  it('should handle negative precision as 0', () => {
    expect(roundTo(3.7, -1)).toBe(4);
  });

  it('should cap precision at 15', () => {
    expect(roundTo(3.141592653589793, 20)).toBe(3.141592653589793);
  });
});
