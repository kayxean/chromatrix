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

      // Use toBeCloseTo to account for Float32 precision loss from matrices
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

      // formPicker allocates a new matrix that must be manually freed
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

      // Test SV (Saturation/Value), H (Hue), A (Alpha), and fallback branches
      picker.update(0.2, 0.3, 'sv'); // v: 1 - 0.3
      picker.update(0.5, 0, 'h'); // h: 180
      picker.update(0.75, 0, 'a'); // a: 0.75
      picker.update(0, 0, 'invalid' as any); // Should still notify even if no state changes

      expect(picker.getSaturation()).toBeCloseTo(0.2);
      expect(picker.getBrightness()).toBeCloseTo(0.3);
      expect(picker.getHue()).toBeCloseTo(180);
      expect(picker.getAlpha()).toBeCloseTo(0.75);
      expect(cb).toHaveBeenCalledTimes(4);

      dropMatrix(v);
    });

    it('should handle assign and bail out on identical values', () => {
      const v = createMatrix('hsv');
      v.set([0, 1, 1]);
      const color = { space: 'hsv', value: v, alpha: 1 } as Color;
      const picker = createPicker(color);
      const cb = vi.fn();

      picker.subscribe(cb);

      // Reference equality or value equality should prevent unnecessary notifications
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

      // getValue should return a clone, not a reference to the internal state
      const val = picker.getValue();
      expect(val).toEqual({ h: 360, s: 1, v: 1, a: 0.5 });
      expect(val).not.toBe((picker as any).val);

      // getColor and getSolid generate fresh Color objects with their own matrices
      const col = picker.getColor();
      const sol = picker.getSolid();
      expect(col.alpha).toBe(0.5);
      expect(sol.alpha).toBe(1);

      // Subscription removal test
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

    // Assign Pure White (S=0, V=1)
    // Most converters return H=0 for white, but we should preserve the current hue
    const white = createMatrix('hsv');
    white.set([0, 0, 1]);
    picker.assign({ space: 'hsv', value: white, alpha: 1 } as Color);

    expect(picker.getHue()).toBe(240);
    expect(picker.getSaturation()).toBe(0);

    // Assign Pure Black (S=0, V=0)
    const black = createMatrix('hsv');
    black.set([0, 0, 0]);
    picker.assign({ space: 'hsv', value: black, alpha: 1 } as Color);

    expect(picker.getHue()).toBe(240);
    expect(picker.getBrightness()).toBe(0);

    dropMatrix(v);
    dropMatrix(white);
    dropMatrix(black);
  });
});
