import { bench, describe } from 'vitest';
import { createColor, dropColor } from '../../../shared';
import { findSimilarNames } from '../../../utils/naming';

const RED_COLOR = createColor('rgb', [1, 0, 0]);

describe('findSimilarNames', () => {
  bench('findSimilarNames', () => {
    findSimilarNames(RED_COLOR, 5);
  });
});

dropColor(RED_COLOR);
