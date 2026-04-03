import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { createSmoothGradient } from '../../../utils/gradient';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);

describe('createSmoothGradient', () => {
  bench('createSmoothGradient', () => {
    createSmoothGradient(RED_COLOR, BLUE_COLOR, 5);
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
