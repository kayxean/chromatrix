import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { mixColor } from '../../../utils/palette';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);

describe('mixColor', () => {
  bench('mixColor', () => {
    const c = mixColor(RED_COLOR, BLUE_COLOR, 0.5);
    dropColor(c);
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
