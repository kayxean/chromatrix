import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { mixColor } from '~/utils/palette';

const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const BLUE_COLOR = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;

describe('mixColor()', () => {
  bench('palette (mix)', () => {
    mixColor(RED_COLOR, BLUE_COLOR, 0.5);
  });
});
