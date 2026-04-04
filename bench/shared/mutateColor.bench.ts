import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { mutateColor } from '~/shared';

const COLOR = { space: 'rgb', value: new Float32Array([0.7, 0.1, 0.9]), alpha: 1 } as Color<'rgb'>;

describe('mutateColor()', () => {
  bench('matrix', () => {
    mutateColor(COLOR, 'hsl');
    mutateColor(COLOR, 'rgb');
  });
});
