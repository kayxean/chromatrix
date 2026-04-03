import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { createShades } from '../../../utils/palette';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);

describe('createShades', () => {
  bench('createShades', () => {
    const shades = createShades(RED_COLOR, BLUE_COLOR, 5);
    shades.forEach(dropColor);
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
