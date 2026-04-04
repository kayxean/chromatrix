import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { findSimilarNames } from '~/utils/naming';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('findSimilarNames()', () => {
  bench('naming', () => {
    findSimilarNames(RED_COLOR, 5);
  });
});
