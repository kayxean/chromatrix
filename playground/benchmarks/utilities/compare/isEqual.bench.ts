import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { isEqual } from '../../../utils/compare';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);

describe('isEqual', () => {
  bench('isEqual', () => {
    isEqual(RED_COLOR, BLUE_COLOR);
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
