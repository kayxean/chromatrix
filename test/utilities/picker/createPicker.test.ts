import type { Color } from '~/types';
import type { PickerValue } from '~/utils/picker';
import { describe, expect, it, vi } from 'vitest';
import { dropColor } from '~/matrix';
import { createPicker } from '~/utils/picker';

describe('createPicker()', () => {
  it('should initialize with correct HSV values from an RGB color', () => {
    const color = {
      space: 'rgb',
      value: new Float32Array([1, 0, 0]),
      alpha: 1,
    } as Color<'rgb'>;
    const picker = createPicker(color);
    expect(picker.getHue()).toBe(0);
    expect(picker.getSaturation()).toBe(1);
    expect(picker.getBrightness()).toBe(1);
    picker.dispose();
  });

  it('should notify subscribers when values change', () => {
    const color = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
    const picker = createPicker(color);
    const callback = vi.fn<(val: PickerValue, color: Color) => void>();
    picker.subscribe(callback);
    expect(callback).toHaveBeenCalledTimes(1);
    picker.update(0.5, 0.8, 'sv');
    expect(callback).toHaveBeenCalledTimes(2);
    const [val, sharedColor] = callback.mock.calls[1];
    expect(val.s).toBe(0.5);
    expect(val.v).toBe(0.8);
    expect(sharedColor.space).toBe('rgb');
    picker.dispose();
  });

  it('should preserve hue during achromatic assignments', () => {
    const red = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
    const picker = createPicker(red);
    picker.update(0.5, 0, 'h');
    const black = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
    picker.assign(black);
    expect(picker.getHue()).toBe(180);
    expect(picker.getBrightness()).toBe(0);
    picker.dispose();
  });

  it('should create fresh pooled colors via getSolid and getColor', () => {
    const color = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 0.5 } as Color<'rgb'>;
    const picker = createPicker(color);
    const solid = picker.getSolid();
    const current = picker.getColor();
    expect(solid.alpha).toBe(1);
    expect(current.alpha).toBe(0.5);
    dropColor(solid);
    dropColor(current);
    picker.dispose();
  });
});
