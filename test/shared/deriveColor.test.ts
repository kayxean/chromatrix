import { beforeEach, describe, expect, it } from 'vitest';
import { clearPool, createColor } from '~/matrix';
import { deriveColor } from '~/shared';
import { expectColorCloseTo } from '../expect';

describe('deriveColor()', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should convert to a new color space and preserve original', () => {
    const original = createColor('rgb', [1, 0, 0]);
    const derived = deriveColor(original, 'oklab');

    expect(derived.space).toBe('oklab');
    expect(original.space).toBe('rgb');

    expect(derived).not.toBe(original);
    expect(derived.value).not.toBe(original.value);
    expectColorCloseTo(derived.value, [0.6279, 0.2248, 0.1258]);
  });

  it('should preserve alpha channel', () => {
    const original = createColor('rgb', [1, 0, 0], 0.5);
    const derived = deriveColor(original, 'hsl');

    expect(derived.alpha).toBe(0.5);
    expectColorCloseTo(derived.value, [0, 1, 0.5]);
  });

  it('should return a deep clone if target space matches', () => {
    const original = createColor('rgb', [0.5, 0.5, 0.5]);
    const derived = deriveColor(original, 'rgb');

    expect(derived.space).toBe('rgb');

    expect(derived).not.toBe(original);
    expect(derived.value).not.toBe(original.value);

    expectColorCloseTo(derived.value, [0.5, 0.5, 0.5]);
  });
});
