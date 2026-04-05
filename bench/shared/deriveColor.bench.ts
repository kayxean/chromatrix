import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { deriveColor } from '~/shared';

const COLOR = { space: 'rgb', value: new Float32Array([0.7, 0.1, 0.9]), alpha: 1 } as Color<'rgb'>;

describe('deriveColor()', () => {
  bench('shared (derive)', () => {
    deriveColor(COLOR, 'hsl');
  });
});
