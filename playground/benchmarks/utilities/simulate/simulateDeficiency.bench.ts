import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { simulateDeficiency } from '../../../utils/simulate';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('simulateDeficiency deuteranopia', () => {
  bench('simulateDeficiency deuteranopia', () => {
    const c = simulateDeficiency(RED_COLOR, 'deuteranopia');
    dropColor(c);
  });
});

dropColor(RED_COLOR);
