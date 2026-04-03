import { describe, expect, it } from 'vitest';
import { createColor, dropColor } from '../../shared';
import { toPicker, fromPicker, createPicker } from '../../utils/picker';

describe('Picker Utilities (picker.ts)', () => {
  describe('toPicker', () => {
    it('should convert color to HSV picker values', () => {
      const color = createColor('rgb', [1, 0, 0]);

      const result = toPicker(color);

      expect(result.h).toBe(0);
      expect(result.s).toBe(1);
      expect(result.v).toBe(1);
      expect(result.a).toBe(1);

      dropColor(color);
    });

    it('should preserve alpha', () => {
      const color = createColor('rgb', [0.5, 0.5, 0.5], 0.8);

      const result = toPicker(color);

      expect(result.a).toBe(0.8);

      dropColor(color);
    });
  });

  describe('fromPicker', () => {
    it('should create color from HSV picker values', () => {
      const result = fromPicker({ h: 0, s: 1, v: 1, a: 1 }, 'rgb');

      expect(result.value[0]).toBeCloseTo(1);
      expect(result.value[1]).toBeCloseTo(0);
      expect(result.value[2]).toBeCloseTo(0);

      dropColor(result);
    });

    it('should respect target color space', () => {
      const result = fromPicker({ h: 120, s: 1, v: 1, a: 1 }, 'oklch');

      expect(result.space).toBe('oklch');

      dropColor(result);
    });
  });

  describe('createPicker', () => {
    it('should create picker with initial color', () => {
      const color = createColor('rgb', [1, 0, 0]);
      const picker = createPicker(color);

      expect(picker.getValue().h).toBe(0);
      expect(picker.getValue().s).toBe(1);
      expect(picker.getValue().v).toBe(1);

      dropColor(color);
      picker.dispose();
    });

    it('should update hue', () => {
      const color = createColor('rgb', [1, 1, 1]);
      const picker = createPicker(color);

      picker.update(0.5, 0, 'h');

      expect(picker.getHue()).toBe(180);

      dropColor(color);
      picker.dispose();
    });

    it('should update saturation and value', () => {
      const color = createColor('rgb', [1, 1, 1]);
      const picker = createPicker(color);

      picker.update(0.5, 0.5, 'sv');

      expect(picker.getSaturation()).toBe(0.5);
      expect(picker.getBrightness()).toBe(0.5);

      dropColor(color);
      picker.dispose();
    });

    it('should notify subscribers on change', () => {
      const color = createColor('rgb', [1, 0, 0]);
      const picker = createPicker(color);

      let called = false;
      picker.subscribe(() => {
        called = true;
      });

      picker.update(0.5, 0.5, 'sv');

      expect(called).toBe(true);

      dropColor(color);
      picker.dispose();
    });
  });
});
