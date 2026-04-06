import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { checkContrastBulk } from '~/utils/contrast';

const RGB_BLACK = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_GRAY = { space: 'rgb', value: new Float32Array([0.5, 0.5, 0.5]), alpha: 1 } as Color<'rgb'>;
const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;

describe('checkContrastBulk()', () => {
  bench('contrast (bulk)', () => {
    checkContrastBulk(RGB_BLACK, [RGB_WHITE, RGB_GRAY]);
  });

  bench('contrast (bulk-larger-set)', () => {
    checkContrastBulk(RGB_BLACK, [RGB_WHITE, RGB_GRAY, RGB_RED, RGB_BLUE]);
  });

  bench('contrast (bulk-empty)', () => {
    checkContrastBulk(RGB_BLACK, []);
  });
});
