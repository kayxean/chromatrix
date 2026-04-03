import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { matchScales } from '../../../utils/contrast';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);
const BG_COLOR = createColor('rgb', [0.13, 0.13, 0.13]);

describe('matchScales', () => {
  bench('matchScales', () => {
    const scale = matchScales([RED_COLOR, BLUE_COLOR], BG_COLOR, 60, 5);
    scale.forEach(dropColor);
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
dropColor(BG_COLOR);
