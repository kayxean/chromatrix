import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { createPicker } from '~/utils/picker';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_BLACK = createMockColor('rgb', [0, 0, 0]);

describe('createPicker()', () => {
  bench('picker (lifecycle-create-dispose)', () => {
    const picker = createPicker(RGB_RED);
    picker.dispose();
  });

  bench('picker (update-saturation-brightness)', () => {
    const picker = createPicker(RGB_RED);
    picker.update(0.5, 0.8, 'sv');
    picker.dispose();
  });

  bench('picker (update-hue)', () => {
    const picker = createPicker(RGB_RED);
    picker.update(180, 0, 'h');
    picker.dispose();
  });

  bench('picker (assign-achromatic)', () => {
    const picker = createPicker(RGB_RED);
    picker.assign(RGB_BLACK);
    picker.dispose();
  });

  bench('picker (get-pooled-colors)', () => {
    const picker = createPicker(RGB_RED);
    const solid = picker.getSolid();
    const current = picker.getColor();
    dropColor(solid);
    dropColor(current);
    picker.dispose();
  });

  bench('picker (subscription-notify)', () => {
    const picker = createPicker(RGB_RED);
    const cb = () => {};
    picker.subscribe(cb);
    picker.update(0.1, 0.1, 'sv');
    picker.dispose();
  });
});
