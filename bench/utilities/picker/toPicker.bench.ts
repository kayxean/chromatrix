import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { toPicker } from '~/utils/picker';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('toPicker()', () => {
  bench('picker', () => {
    toPicker(RED_COLOR);
  });
});
