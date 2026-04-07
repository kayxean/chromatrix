import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { createScales } from '~/utils/palette';
import { createMockColor } from '../../factory';

const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_GREEN = createMockColor('rgb', [0, 1, 0]);
const RGB_BLUE = createMockColor('rgb', [0, 0, 1]);
const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);
const RGB_BLACK = createMockColor('rgb', [0, 0, 0]);

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
