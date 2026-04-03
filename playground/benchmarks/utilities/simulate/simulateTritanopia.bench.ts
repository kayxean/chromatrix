import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { simulateDeficiency } from '../../../utils/simulate';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('simulateDeficiency tritanopia', () => {
  bench('simulateDeficiency tritanopia', () => {
    const c = simulateDeficiency(RED_COLOR, 'tritanopia');
    dropColor(c);
  });
});

dropColor(RED_COLOR);
