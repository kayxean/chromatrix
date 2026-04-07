import { describe, expect, it } from 'vitest';
import { createLinearGradient } from '~/utils/gradient';
import { createMockColor } from '../../factory';

describe('createLinearGradient()', () => {
  it('should create a valid linear-gradient CSS string with default angle', () => {
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
    const result = createLinearGradient({ stops });
    expect(result).toContain('linear-gradient(180deg');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should respect a custom angle', () => {
    const stops = [{ color: createMockColor('rgb', [0, 0, 0]) }];
    const result = createLinearGradient({ angle: 90, stops });
    expect(result).toContain('linear-gradient(90deg');
  });

  it('should handle multiple stops without explicit positions', () => {
    const stops = [
      { color: createMockColor('rgb', [1, 1, 1]) },
      { color: createMockColor('rgb', [0, 0, 0]) },
      {
        color: createMockColor('rgb', [0.5, 0.5, 0.5]),
      },
    ];
    const result = createLinearGradient({ stops });
    expect(result).toMatch(/rgb\(255 255 255\), rgb\(0 0 0\), rgb\(128 128 128\)/);
  });
});
