import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { createScales } from '../../../utils/palette';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);
const GREEN_COLOR = createColor('rgb', [0, 1, 0]);

describe('createScales', () => {
  bench('createScales', () => {
    const scale = createScales([RED_COLOR, BLUE_COLOR, GREEN_COLOR], 5);
    scale.forEach(dropColor);
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
dropColor(GREEN_COLOR);
