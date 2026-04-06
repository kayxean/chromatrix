import type { Color } from '~/types';
import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { createScales } from '~/utils/palette';

const RGB_RED = { space: 'rgb', value: new Float32Array([1, 0, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_GREEN = { space: 'rgb', value: new Float32Array([0, 1, 0]), alpha: 1 } as Color<'rgb'>;
const RGB_BLUE = { space: 'rgb', value: new Float32Array([0, 0, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_WHITE = { space: 'rgb', value: new Float32Array([1, 1, 1]), alpha: 1 } as Color<'rgb'>;
const RGB_BLACK = { space: 'rgb', value: new Float32Array([0, 0, 0]), alpha: 1 } as Color<'rgb'>;

describe('createScales()', () => {
  bench('palette (scales-two-stops)', () => {
    const result = createScales([RGB_RED, RGB_BLUE], 5);
    for (const c of result) dropColor(c);
  });

  bench('palette (scales-multi-stop-segmented)', () => {
    const result = createScales([RGB_RED, RGB_GREEN, RGB_BLUE], 11);
    for (const c of result) dropColor(c);
  });

  bench('palette (scales-high-resolution)', () => {
    const result = createScales([RGB_WHITE, RGB_BLACK], 100);
    for (const c of result) dropColor(c);
  });

  bench('palette (scales-single-stop-edge)', () => {
    const result = createScales([RGB_RED], 5);
    for (const c of result) dropColor(c);
  });

  bench('palette (scales-empty-steps)', () => {
    createScales([RGB_RED, RGB_BLUE], 0);
  });
});
