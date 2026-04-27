import { beforeEach, bench, describe } from 'vitest';
import { createColor, dropColor, mountMatrix } from '~/api/color';
import { createPicker } from '~/utils/picker';

describe('create-picker-actions', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('hsv', new Float32Array([0, 1, 1]));
  const picker = createPicker(color);
  const nextColor = createColor('rgb', new Float32Array([0, 0, 1]));
  bench('picker (action-update)', () => {
    picker.update(0.5, 0.5, 'sv');
  });
  bench('picker (action-assign)', () => {
    picker.assign(nextColor);
  });
  bench('picker (action-subscribe)', () => {
    const unsub = picker.subscribe(() => {});
    unsub();
  });
  bench('picker (action-dispose)', () => {
    const p = createPicker(color);
    p.dispose();
  });
});

describe('create-picker-setters', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('hsv', new Float32Array([0, 1, 1]));
  const picker = createPicker(color);
  bench('picker (set-hue)', () => {
    picker.setHue(120);
  });
  bench('picker (set-saturation)', () => {
    picker.setSaturation(0.5);
  });
  bench('picker (set-value)', () => {
    picker.setValue(0.2);
  });
  bench('picker (set-alpha)', () => {
    picker.setAlpha(0.1);
  });
});

describe('create-picker-getters', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('hsv', new Float32Array([180, 0.4, 0.6]), 0.5);
  const picker = createPicker(color);
  bench('picker (get-state)', () => {
    picker.getState();
  });
  bench('picker (get-value)', () => {
    picker.getValue();
  });
  bench('picker (get-hue)', () => {
    picker.getHue();
  });
  bench('picker (get-saturation)', () => {
    picker.getSaturation();
  });
  bench('picker (get-brightness)', () => {
    picker.getBrightness();
  });
  bench('picker (get-alpha)', () => {
    picker.getAlpha();
  });
  bench('picker (get-color)', () => {
    const c = picker.getColor();
    dropColor(c);
  });
  bench('picker (get-solid)', () => {
    const s = picker.getSolid();
    dropColor(s);
  });
});
