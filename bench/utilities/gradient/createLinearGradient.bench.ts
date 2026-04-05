import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { createLinearGradient } from '~/utils/gradient';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const BLUE_COLOR = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;

describe('createLinearGradient()', () => {
  bench('gradient (linear)', () => {
    createLinearGradient({ stops: [{ color: RED_COLOR }, { color: BLUE_COLOR }] });
  });
});
