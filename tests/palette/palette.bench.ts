import { beforeEach, bench, describe } from 'vite-plus/test';
import { createColor, mountMatrix } from '~/api/color';
import {
  createHarmony,
  createScales,
  createShades,
  createTints,
  createTonal,
  mixColor,
  mixSubtractive,
} from '~/utils/palette';

describe('mix-color', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const colorA = createColor('oklch', new Float32Array([0.5, 0.1, 30]));
  const colorB = createColor('oklch', new Float32Array([0.5, 0.1, 330]));
  const colorAlphaA = createColor('rgb', new Float32Array([1, 1, 1]), 1);
  const colorAlphaB = createColor('rgb', new Float32Array([0, 0, 0]), 0);
  bench('palette (mix-color-shortest-hue)', () => {
    colorA.value[2] = 30;
    mixColor(colorA, colorB, 0.5);
  });
  bench('palette (mix-color-alpha)', () => {
    colorAlphaA.alpha = 1;
    mixColor(colorAlphaA, colorAlphaB, 0.5);
  });
});

describe('mix-subtractive', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const cyan = createColor('rgb', new Float32Array([0, 1, 1]));
  const yellow = createColor('rgb', new Float32Array([1, 1, 0]));
  bench('palette (mix-subtractive-math)', () => {
    cyan.space = 'rgb';
    cyan.value.set([0, 1, 1]);
    yellow.space = 'rgb';
    yellow.value.set([1, 1, 0]);
    mixSubtractive(cyan, yellow, 0.5);
  });
});

describe('create-harmony', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('oklch', new Float32Array([0.5, 0.1, 0]));
  const ratios = [180];
  bench('palette (create-harmony-complementary)', () => {
    createHarmony(color, ratios);
  });
});

describe('create-scales', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const start = createColor('oklch', new Float32Array([0, 0, 0]));
  const end = createColor('oklch', new Float32Array([1, 0, 0]));
  const stops = [start, end];
  bench('palette (create-scales-interpolation)', () => {
    createScales(stops, 3);
  });
});

describe('create-tints', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('oklch', new Float32Array([0.5, 0.1, 180]));
  bench('palette (create-tints-logic)', () => {
    createTints(color, 5);
  });
});

describe('create-shades', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('oklch', new Float32Array([0.5, 0.1, 180]));
  bench('palette (create-shades-logic)', () => {
    createShades(color, 5);
  });
});

describe('create-tonal', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('oklch', new Float32Array([0.5, 0.1, 180]));
  bench('palette (create-tonal-logic)', () => {
    createTonal(color, 3);
  });
});
