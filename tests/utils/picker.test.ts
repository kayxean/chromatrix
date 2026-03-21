import type { Color } from '~/types';
import { describe, expect, it, vi } from 'vitest';
import { createMatrix, dropMatrix } from '~/shared';
import { createPicker, fromPicker, toPicker } from '~/utils/picker';

describe('Picker Utilities (picker.ts)', () => {
  describe('toPicker', () => {
    it('should convert a Color matrix to a flat HSVA object', () => {
      const v = createMatrix('hsv');
      v.set([180, 0.5, 0.6]);
      const color = { space: 'hsv', value: v, alpha: 0.9 } as Color;

      const res = toPicker(color);

      expect(res.h).toBeCloseTo(180);
      expect(res.s).toBeCloseTo(0.5);
      expect(res.v).toBeCloseTo(0.6);
      expect(res.a).toBeCloseTo(0.9);

      dropMatrix(v);
    });

    it('should default alpha to 1 if missing', () => {
      const v = createMatrix('hsv');
      const res = toPicker({ space: 'hsv', value: v } as Color);

      expect(res.a).toBe(1);

      dropMatrix(v);
    });
  });

  describe('fromPicker', () => {
    it('should create a new Color matrix from a PickerValue', () => {
      const val = { h: 120, s: 1, v: 1, a: 0.5 };
      const color = fromPicker(val, 'hsv');

      expect(color.space).toBe('hsv');
      expect(color.value[0]).toBeCloseTo(120);
      expect(color.value[1]).toBeCloseTo(1);
      expect(color.value[2]).toBeCloseTo(1);
      expect(color.alpha).toBeCloseTo(0.5);

      dropMatrix(color.value);
    });
  });

  describe('createPicker', () => {
    it('should handle all update branches including alpha and invalid types', () => {
      const v = createMatrix('hsv');
      const picker = createPicker({
        space: 'hsv',
        value: v,
        alpha: 1,
      } as Color);
      const cb = vi.fn();
      picker.subscribe(cb);

      picker.update(0.2, 0.3, 'sv');
      picker.update(0.5, 0, 'h');
      picker.update(0.75, 0, 'a');
      picker.update(0, 0, 'invalid' as any);

      expect(picker.getSaturation()).toBeCloseTo(0.2);
      expect(picker.getBrightness()).toBeCloseTo(0.3);
      expect(picker.getHue()).toBeCloseTo(180);
      expect(picker.getAlpha()).toBeCloseTo(0.75);
      expect(cb).toHaveBeenCalledTimes(3);

      dropMatrix(v);
    });

    it('should handle assign and bail out on identical values', () => {
      const v = createMatrix('hsv');
      v.set([0, 1, 1]);
      const color = { space: 'hsv', value: v, alpha: 1 } as Color;
      const picker = createPicker(color);
      const cb = vi.fn();

      picker.subscribe(cb);

      picker.assign(color);
      expect(cb).not.toHaveBeenCalled();

      const v2 = createMatrix('hsv');
      v2.set([10, 1, 1]);
      picker.assign({ space: 'hsv', value: v2, alpha: 1 } as Color);
      expect(cb).toHaveBeenCalled();

      dropMatrix(v);
      dropMatrix(v2);
    });

    it('should handle all getters, snapshots, and unsubscribing', () => {
      const v = createMatrix('hsv');
      v.set([360, 1, 1]);
      const picker = createPicker({
        space: 'hsv',
        value: v,
        alpha: 0.5,
      } as Color);

      const val = picker.getValue();
      expect(val).toEqual({ h: 360, s: 1, v: 1, a: 0.5 });
      expect(val).not.toBe((picker as any).val);

      const col = picker.getColor();
      const sol = picker.getSolid();
      expect(col.alpha).toBe(0.5);
      expect(sol.alpha).toBe(1);

      const cb = vi.fn();
      const unsub = picker.subscribe(cb);
      unsub();
      picker.update(0, 0, 'h');
      expect(cb).not.toHaveBeenCalled();

      dropMatrix(v);
      dropMatrix(col.value);
      dropMatrix(sol.value);
    });
  });

  it('should preserve hue when assigning achromatic colors (hasNoColorInfo)', () => {
    const v = createMatrix('hsv');
    v.set([240, 1, 1]);
    const picker = createPicker({ space: 'hsv', value: v, alpha: 1 } as Color);

    const white = createMatrix('hsv');
    white.set([0, 0, 1]);
    picker.assign({ space: 'hsv', value: white, alpha: 1 } as Color);

    expect(picker.getHue()).toBe(240);
    expect(picker.getSaturation()).toBe(0);

    const black = createMatrix('hsv');
    black.set([0, 0, 0]);
    picker.assign({ space: 'hsv', value: black, alpha: 1 } as Color);

    expect(picker.getHue()).toBe(240);
    expect(picker.getBrightness()).toBe(0);

    dropMatrix(v);
    dropMatrix(white);
    dropMatrix(black);
  });

  it('should handle color space switching and bail out on identical space', () => {
    const v = createMatrix('rgb');
    v.set([1, 0, 0]);
    const picker = createPicker({ space: 'rgb', value: v, alpha: 1 } as Color);
    const cb = vi.fn();
    picker.subscribe(cb);

    picker.setSpace('rgb');
    expect(cb).not.toHaveBeenCalled();
    expect(picker.getSpace()).toBe('rgb');

    picker.setSpace('oklch');
    expect(cb).toHaveBeenCalledTimes(1);
    expect(picker.getSpace()).toBe('oklch');

    const emittedColor = cb.mock.calls[0][1];
    expect(emittedColor.space).toBe('oklch');

    dropMatrix(v);
    dropMatrix(emittedColor.value);
  });

  it('should dispose and release resources', () => {
    const v = createMatrix('rgb');
    const picker = createPicker({ space: 'rgb', value: v, alpha: 1 } as Color);
    const cb = vi.fn();

    picker.subscribe(cb);
    picker.dispose();

    picker.update(0.5, 0, 'h');
    expect(cb).not.toHaveBeenCalled();

    dropMatrix(v);
  });

  it('should bail out of updates if values are identical', () => {
    const v = createMatrix('hsv');
    const picker = createPicker({ space: 'hsv', value: v, alpha: 1 } as Color);
    const cb = vi.fn();
    picker.subscribe(cb);

    const val = picker.getValue();

    picker.update(val.s, val.v, 'sv');
    picker.update(val.h / 360, 0, 'h');
    picker.update(val.a, 0, 'a');

    expect(cb).not.toHaveBeenCalled();

    dropMatrix(v);
  });
});
