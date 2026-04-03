import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { createPicker } from '../../../utils/picker';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('createPicker', () => {
  bench('createPicker', () => {
    const picker = createPicker(RED_COLOR);
    picker.dispose();
  });
});

dropColor(RED_COLOR);
