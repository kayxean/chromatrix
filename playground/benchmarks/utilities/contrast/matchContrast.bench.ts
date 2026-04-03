import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { matchContrast } from '../../../utils/contrast';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BG_COLOR = createColor('rgb', [0.13, 0.13, 0.13]);

describe('matchContrast', () => {
  bench('matchContrast', () => {
    const c = matchContrast(RED_COLOR, BG_COLOR, 75);
    dropColor(c);
  });
});

dropColor(RED_COLOR);
dropColor(BG_COLOR);
