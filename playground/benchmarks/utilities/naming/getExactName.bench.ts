import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { getExactName } from '../../../utils/naming';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('getExactName', () => {
  bench('getExactName', () => {
    getExactName(RED_COLOR);
  });
});

dropColor(RED_COLOR);
