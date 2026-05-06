import { beforeEach, describe, expect, test, vi } from 'vite-plus/test';
import { createColor, mountMatrix } from '~/api/color';
import { createPicker } from '~/utils/picker';

describe('create-picker-actions', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('hsv', new Float32Array([0, 1, 1]));
  const picker = createPicker(color);
  test('picker (action-update)', () => {
    picker.update(0.5, 0.5, 'sv');
    expect(picker.getSaturation()).toBe(0.5);
  });
  test('picker (action-assign)', () => {
    const next = createColor('rgb', new Float32Array([0, 0, 1]));
    picker.assign(next);
    expect(picker.getHue()).toBe(240);
  });
  test('picker (action-subscribe)', () => {
    const cb = vi.fn<() => void>();
    const unsub = picker.subscribe(cb);
    picker.setAlpha(0.2);
    expect(cb).toHaveBeenCalled();
    unsub();
  });
  test('picker (action-dispose)', () => {
    const p = createPicker(color);
    expect(() => {
      p.dispose();
    }).not.toThrow();
  });
});

describe('create-picker-setters', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('hsv', new Float32Array([0, 1, 1]));
  const picker = createPicker(color);
  test('picker (set-hue)', () => {
    picker.setHue(120);
    expect(picker.getHue()).toBe(120);
  });
  test('picker (set-saturation)', () => {
    picker.setSaturation(0.5);
    expect(picker.getSaturation()).toBe(0.5);
  });
  test('picker (set-value)', () => {
    picker.setValue(0.2);
    expect(picker.getBrightness()).toBeCloseTo(0.2);
  });
  test('picker (set-alpha)', () => {
    picker.setAlpha(0.1);
    expect(picker.getAlpha()).toBe(0.1);
  });
});

describe('create-picker-getters', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('hsv', new Float32Array([180, 0.4, 0.6]), 0.5);
  const picker = createPicker(color);
  test('picker (get-state)', () => {
    expect(picker.getState().space).toBe('hsv');
  });
  test('picker (get-value)', () => {
    expect(picker.getValue().h).toBe(180);
  });
  test('picker (get-hue)', () => {
    expect(picker.getHue()).toBe(180);
  });
  test('picker (get-saturation)', () => {
    expect(picker.getSaturation()).toBeCloseTo(0.4);
  });
  test('picker (get-brightness)', () => {
    expect(picker.getBrightness()).toBeCloseTo(0.6);
  });
  test('picker (get-alpha)', () => {
    expect(picker.getAlpha()).toBe(0.5);
  });
  test('picker (get-color)', () => {
    expect(picker.getColor().alpha).toBe(0.5);
  });
  test('picker (get-solid)', () => {
    expect(picker.getSolid().alpha).toBe(1);
  });
});
