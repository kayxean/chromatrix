import { describe, expect, it } from 'vitest';
import { createRadialGradient } from '~/utils/gradient';
import { createMockColor } from '../../factory';

describe('createRadialGradient()', () => {
  it('should create a valid radial-gradient CSS string', () => {
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
    const result = createRadialGradient({
      shape: 'circle',
      position: 'top right',
      stops,
    });
    expect(result).toContain('radial-gradient(circle at top right');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should use default values for shape and position if not provided', () => {
    const stops = [{ color: createMockColor('rgb', [0, 0, 0]) }];
    const result = createRadialGradient({ stops });
    expect(result).toContain('radial-gradient(ellipse at center');
  });

  it('should handle stops without explicit positions', () => {
    const stops = [
      { color: createMockColor('rgb', [1, 0, 0]) },
      { color: createMockColor('rgb', [0, 0, 1]) },
    ];
    const result = createRadialGradient({ stops });
    expect(result).toMatch(/rgb\(255 0 0\), rgb\(0 0 255\)/);
  });
});
