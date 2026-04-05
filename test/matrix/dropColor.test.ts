import { beforeEach, describe, expect, it } from 'vitest';
import { clearPool, createColor, createMatrix, dropColor } from '~/matrix';

describe('dropColor()', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should return the color value to the pool', () => {
    const color = createColor('rgb', [0.7, 0.1, 0.9]);
    const originalBuffer = color.value;
    dropColor(color);

    const reused = createMatrix('rgb');
    expect(reused).toBe(originalBuffer);
  });

  it('should not modify the color object', () => {
    const color = createColor('rgb', [1, 0, 0], 0.5);
    dropColor(color);

    expect(color.space).toBe('rgb');
    expect(color.alpha).toBe(0.5);
  });
});
