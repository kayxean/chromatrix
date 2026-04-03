import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { simulateDeficiency } from '../../../utils/simulate';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('simulateDeficiency protanopia', () => {
  bench('simulateDeficiency protanopia', () => {
    const c = simulateDeficiency(RED_COLOR, 'protanopia');
    dropColor(c);
  });
});

dropColor(RED_COLOR);
