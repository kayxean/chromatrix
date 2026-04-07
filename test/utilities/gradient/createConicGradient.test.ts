import { describe, expect, it } from 'vitest';
import { createConicGradient } from '~/utils/gradient';
import { createMockColor } from '../../factory';

describe('createConicGradient()', () => {
  it('should create a valid conic-gradient CSS string', () => {
    const stops = [
      {
        color: createMockColor('rgb', [1, 0, 0]),
        position: 0,
      },
      {
        color: createMockColor('rgb', [0, 0, 1]),
        position: 100,
      },
    ];
    const result = createConicGradient({
      angle: 45,
      position: '50% 50%',
      stops,
    });
    expect(result).toContain('conic-gradient(from 45deg at 50% 50%');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should use default values for angle and position if not provided', () => {
    const stops = [{ color: createMockColor('rgb', [1, 1, 1]) }];
    const result = createConicGradient({ stops });
    expect(result).toContain('conic-gradient(from 0deg at center');
  });

  it('should handle stops without explicit positions', () => {
    const stops = [
      { color: createMockColor('rgb', [1, 0, 0]) },
      { color: createMockColor('rgb', [0, 0, 1]) },
    ];
    const result = createConicGradient({ stops });
    expect(result).toMatch(/rgb\(255 0 0\), rgb\(0 0 255\)/);
  });
});
