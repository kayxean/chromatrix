import { beforeEach, bench, describe } from 'vitest';
import { createColor, mountMatrix } from '~/api/color';
import {
  getContrast,
  getContrastRating,
  getContrastRatio,
  isAccessible,
  matchContrast,
  pickContrast,
} from '~/utils/contrast';

describe('get-contrast', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const white = createColor('rgb', new Float32Array([1, 1, 1]));
  const black = createColor('rgb', new Float32Array([0, 0, 0]));
  bench('contrast (get-contrast-apca)', () => {
    getContrast(black, white);
  });
  bench('contrast (get-contrast-same)', () => {
    getContrast(white, white);
  });
});

describe('get-contrast-ratio', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const white = createColor('rgb', new Float32Array([1, 1, 1]));
  const black = createColor('rgb', new Float32Array([0, 0, 0]));
  bench('contrast (get-contrast-ratio-wcag)', () => {
    getContrastRatio(white, black);
  });
});

describe('get-contrast-rating', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  bench('contrast (get-contrast-rating-levels)', () => {
    getContrastRating(95);
  });
});

describe('is-accessible', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const white = createColor('rgb', new Float32Array([1, 1, 1]));
  const gray = createColor('rgb', new Float32Array([0.45, 0.45, 0.45]));
  bench('contrast (is-accessible-standard)', () => {
    isAccessible(gray, white, 'AA');
  });
  bench('contrast (is-accessible-large-text)', () => {
    isAccessible(gray, white, 'AAA', true);
  });
});

describe('match-contrast', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('oklch', new Float32Array([0.2, 0.1, 180]));
  const background = createColor('rgb', new Float32Array([1, 1, 1]));
  bench('contrast (match-contrast-search)', () => {
    color.value[0] = 0.2;
    matchContrast(color, background, 30);
  });
});

describe('pick-contrast', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const bg = createColor('rgb', new Float32Array([0, 0, 0]));
  const bad = createColor('rgb', new Float32Array([0.1, 0.1, 0.1]));
  const good = createColor('rgb', new Float32Array([0.9, 0.9, 0.9]));
  const options = [bad, good];
  bench('contrast (pick-contrast-best)', () => {
    pickContrast(bg, options);
  });
});
