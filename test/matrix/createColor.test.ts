import { beforeEach, describe, expect, it } from 'vitest';
import { clearPool, createColor } from '~/matrix';

describe('createColor()', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should create a color object with given space and values', () => {
    const color = createColor('rgb', [1, 0.5, 0]);
    expect(color.space).toBe('rgb');
    expect(color.value[0]).toBe(1);
    expect(color.value[1]).toBe(0.5);
    expect(color.value[2]).toBe(0);
  });

  it('should default alpha to 1', () => {
    const color = createColor('rgb', [1, 0, 0]);
    expect(color.alpha).toBe(1);
  });

  it('should accept custom alpha', () => {
    const color = createColor('rgb', [1, 0, 0], 0.5);
    expect(color.alpha).toBe(0.5);
  });

  it('should reuse buffers from pool', () => {
    const c1 = createColor('rgb', [1, 0, 0]);
    const buf = c1.value;
    const c2 = createColor('hsl', [180, 0.5, 0.5]);
    expect(c2.value).not.toBe(buf);
  });
});
