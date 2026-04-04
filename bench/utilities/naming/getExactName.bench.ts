import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { getExactName } from '~/utils/naming';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('getExactName()', () => {
  bench('naming', () => {
    getExactName(RED_COLOR);
  });
});
