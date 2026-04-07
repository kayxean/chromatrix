import { describe, expect, it } from 'vitest';
import { checkContrast } from '~/utils/contrast';
import { createMockColor } from '../../factory';

describe('checkContrast()', () => {
  it('should return APCA contrast score for white on black', () => {
    const white = createMockColor('rgb', [1, 1, 1]);
    const black = createMockColor('rgb', [0, 0, 0]);
    expect(checkContrast(white, black)).toBe(114);
  });

  it('should return 0 for identical colors', () => {
    const c1 = createMockColor('rgb', [0.5, 0.5, 0.5]);
    const c2 = createMockColor('rgb', [0.5, 0.5, 0.5]);
    expect(checkContrast(c1, c2)).toBe(0);
  });

  it('should return a negative score for dark text on light background', () => {
    const black = createMockColor('rgb', [0, 0, 0]);
    const white = createMockColor('rgb', [1, 1, 1]);
    expect(checkContrast(black, white)).toBe(-114);
  });
});
