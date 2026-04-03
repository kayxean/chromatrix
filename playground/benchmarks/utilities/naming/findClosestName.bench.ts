import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { findClosestName } from '../../../utils/naming';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('findClosestName', () => {
  bench('findClosestName', () => {
    findClosestName(RED_COLOR);
  });
});

dropColor(RED_COLOR);
