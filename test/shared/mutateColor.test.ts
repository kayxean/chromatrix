import { beforeEach, describe, expect, it } from 'vitest';
import { clearPool, createColor } from '~/matrix';
import { mutateColor } from '~/shared';
import { expectColorCloseTo } from '../expect';

describe('mutateColor()', () => {
  beforeEach(() => {
    clearPool();
  });

  it('should change color space in-place', () => {
    const color = createColor('rgb', [1, 1, 1]);
    const originalValue = color.value;

    mutateColor(color, 'oklab');

    expect(color.space).toBe('oklab');
    expect(color.value).toBe(originalValue);

    expectColorCloseTo(color.value, [1, 0, 0]);
  });

  it('should do nothing if space is the same', () => {
    const color = createColor('rgb', [1, 0, 0]);
    const originalValue = color.value;

    mutateColor(color, 'rgb');

    expect(color.space).toBe('rgb');
    expect(color.value).toBe(originalValue);
    expectColorCloseTo(color.value, [1, 0, 0]);
  });

  it('should preserve alpha channel during mutation', () => {
    const color = createColor('rgb', [1, 0, 0], 0.5);

    mutateColor(color, 'hsl');

    expect(color.alpha).toBe(0.5);
    expect(color.space).toBe('hsl');

    expectColorCloseTo(color.value, [0, 1, 0.5]);
  });

  it('should handle sequential mutations on the same object', () => {
    const color = createColor('rgb', [1, 0, 0]);

    mutateColor(color, 'hsl');
    mutateColor(color, 'oklab');

    expect(color.space).toBe('oklab');
    expectColorCloseTo(color.value, [0.6279, 0.2248, 0.1258]);
  });
});
