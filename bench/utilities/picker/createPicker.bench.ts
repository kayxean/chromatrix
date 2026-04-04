import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createPicker } from '~/utils/picker';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('createPicker()', () => {
  bench('picker', () => {
    const picker = createPicker(RED_COLOR);
    picker.dispose();
  });
});
