import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { checkContrastBulk } from '~/utils/contrast';

const TEXT_COLOR = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const BG_COLOR = {
  space: 'rgb',
  value: new Float32Array([0.13, 0.13, 0.13]),
  alpha: 1,
} as Color<'rgb'>;
const RED_COLOR = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const BLUE_COLOR = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;

describe('checkContrastBulk()', () => {
  bench('contrast (bulk checking)', () => {
    checkContrastBulk(BG_COLOR, [TEXT_COLOR, RED_COLOR, BLUE_COLOR]);
  });
});
