import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { createRadialGradient } from '../../../utils/gradient';

const RED_COLOR = createColor('rgb', [1, 0, 0]);
const BLUE_COLOR = createColor('rgb', [0, 0, 1]);

describe('createRadialGradient', () => {
  bench('createRadialGradient', () => {
    createRadialGradient({ shape: 'circle', stops: [{ color: RED_COLOR }, { color: BLUE_COLOR }] });
  });
});

dropColor(RED_COLOR);
dropColor(BLUE_COLOR);
