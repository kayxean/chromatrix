import { beforeEach, describe, expect, it } from 'vitest';
import { clearPool, cloneColor, createColor } from '~/matrix';

describe('cloneColor()', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should clone a color with same space and values', () => {
    const original = createColor('oklab', [0.5, 0.1, 0.1]);
    const clone = cloneColor(original);

    expect(clone.space).toBe(original.space);
    expect(clone.value).not.toBe(original.value);
    expect(clone.value[0]).toBeCloseTo(original.value[0], 5);
    expect(clone.value[1]).toBeCloseTo(original.value[1], 5);
    expect(clone.value[2]).toBeCloseTo(original.value[2], 5);
  });

  it('should preserve alpha', () => {
    const original = createColor('rgb', [1, 0, 0], 0.5);
    const clone = cloneColor(original);

    expect(clone.alpha).toBe(0.5);
  });

  it('should create independent buffer', () => {
    const original = createColor('rgb', [1, 0, 0]);
    const clone = cloneColor(original);

    original.value[0] = 0;
    expect(clone.value[0]).toBe(1);
  });
});
