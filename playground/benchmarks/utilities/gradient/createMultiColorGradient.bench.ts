import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { createMultiColorGradient } from '../../../utils/gradient';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);
const GREEN_COLOR = createColor('rgb', [0, 1, 0]);

describe('createMultiColorGradient', () => {
  bench('createMultiColorGradient', () => {
    createMultiColorGradient([RED_COLOR, BLUE_COLOR, GREEN_COLOR]);
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
dropColor(GREEN_COLOR);
