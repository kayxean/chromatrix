import { bench, describe } from 'vitest';
import { mutateColor } from '~/shared';
import { createMockColor } from '../factory';

const RGB_WHITE = createMockColor('rgb', [1, 1, 1]);
const RGB_RED = createMockColor('rgb', [1, 0, 0]);
const RGB_RED_ALPHA = createMockColor('rgb', [1, 0, 0], 0.5);

describe('mutateColor()', () => {
  bench('mutate (rgb-to-oklab)', () => {
    mutateColor(RGB_WHITE, 'oklab');
  });

  bench('mutate (identity-rgb)', () => {
    mutateColor(RGB_RED, 'rgb');
  });

  bench('mutate (preserve-alpha)', () => {
    mutateColor(RGB_RED_ALPHA, 'hsl');
  });

  bench('mutate (sequential-rgb-to-hsl-to-oklab)', () => {
    mutateColor(RGB_RED, 'hsl');
    mutateColor(RGB_RED, 'oklab');
  });
});
