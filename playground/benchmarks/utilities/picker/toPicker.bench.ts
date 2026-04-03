import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { toPicker } from '../../../utils/picker';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('toPicker', () => {
  bench('toPicker', () => {
    toPicker(RED_COLOR);
  });
});

dropColor(RED_COLOR);
