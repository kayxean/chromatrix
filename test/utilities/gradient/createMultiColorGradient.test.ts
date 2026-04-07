import { describe, expect, it } from 'vitest';
import { createMultiColorGradient } from '~/utils/gradient';
import { createMockColor } from '../../factory';

describe('createMultiColorGradient()', () => {
  it('should create a linear gradient with evenly distributed stops', () => {
    const colors = [
      createMockColor('rgb', [1, 0, 0]),
      createMockColor('rgb', [0, 1, 0]),
      createMockColor('rgb', [0, 0, 1]),
    ];
    const result = createMultiColorGradient(colors);
    expect(result).toContain('linear-gradient(180deg');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 255 0) 50%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });

  it('should return a single color string if only one color is provided', () => {
    const colors = [createMockColor('rgb', [1, 1, 1])];
    const result = createMultiColorGradient(colors);
    expect(result).toBe('rgb(255 255 255)');
  });

  it('should throw an error if no colors are provided', () => {
    expect(() => createMultiColorGradient([])).toThrow('at least two colors are required');
  });

  it('should support switching to radial type with options', () => {
    const colors = [createMockColor('rgb', [1, 0, 0]), createMockColor('rgb', [0, 0, 1])];
    const result = createMultiColorGradient(colors, 'radial', {
      shape: 'circle',
      position: 'top left',
    });
    expect(result).toContain('radial-gradient(circle at top left');
    expect(result).toContain('rgb(255 0 0) 0%');
    expect(result).toContain('rgb(0 0 255) 100%');
  });
});
