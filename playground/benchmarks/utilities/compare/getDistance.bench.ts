import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { getDistance } from '../../../utils/compare';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);

describe('getDistance', () => {
  bench('getDistance', () => {
    getDistance(RED_COLOR, BLUE_COLOR);
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
