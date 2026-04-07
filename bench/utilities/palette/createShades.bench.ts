import { bench, describe } from 'vitest';
import { dropColor } from '~/matrix';
import { createShades } from '~/utils/palette';
import { createMockColor } from '../../factory';

const RGB_RED_OPAQUE = createMockColor('rgb', [1, 0, 0], 1);
const RGB_BLUE_ALPHA = createMockColor('rgb', [0, 0, 1], 0);

describe('createShades()', () => {
  bench('palette (shades-5-steps)', () => {
    const result = createShades(RGB_RED_OPAQUE, RGB_BLUE_ALPHA, 5);
    for (const c of result) dropColor(c);
  });

  bench('palette (shades-high-fidelity-25-steps)', () => {
    const result = createShades(RGB_RED_OPAQUE, RGB_BLUE_ALPHA, 25);
    for (const c of result) dropColor(c);
  });

  bench('palette (shades-alpha-interpolation)', () => {
    const result = createShades(RGB_RED_OPAQUE, RGB_BLUE_ALPHA, 3);
    for (const c of result) dropColor(c);
  });

  bench('palette (shades-single-step-edge)', () => {
    const result = createShades(RGB_RED_OPAQUE, RGB_BLUE_ALPHA, 1);
    for (const c of result) dropColor(c);
  });

  bench('palette (shades-invalid-steps)', () => {
    createShades(RGB_RED_OPAQUE, RGB_BLUE_ALPHA, 0);
    createShades(RGB_RED_OPAQUE, RGB_BLUE_ALPHA, -5);
  });
});
