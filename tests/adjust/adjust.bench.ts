import { beforeEach, bench, describe } from 'vitest';
import { createColor, mountMatrix } from '~/api/color';
import {
  blacken,
  darken,
  desaturate,
  invert,
  lighten,
  matchLuminance,
  rotate,
  saturate,
  whiten,
} from '~/utils/adjust';

describe('adjust-color', () => {
  const values = new Float32Array([0.5, 0.2, 180]);
  beforeEach(() => {
    mountMatrix(2048);
  });
  bench('adjust (lighten)', () => {
    const color = createColor('oklch', values);
    lighten(color, 0.5);
  });
  bench('adjust (darken)', () => {
    const color = createColor('oklch', values);
    darken(color, 0.5);
  });
  bench('adjust (saturate)', () => {
    const color = createColor('oklch', values);
    saturate(color, 0.5);
  });
  bench('adjust (desaturate)', () => {
    const color = createColor('oklch', values);
    desaturate(color, 0.5);
  });
  bench('adjust (whiten)', () => {
    const color = createColor('oklch', values);
    whiten(color, 0.5);
  });
  bench('adjust (blacken)', () => {
    const color = createColor('oklch', values);
    blacken(color, 0.5);
  });
  bench('adjust (rotate)', () => {
    const color = createColor('oklch', values);
    rotate(color, 90);
  });
  bench('adjust (invert)', () => {
    const color = createColor('rgb', new Float32Array([1, 0.5, 0]));
    invert(color);
  });
  bench('adjust (match-luminance)', () => {
    const source = createColor('oklch', new Float32Array([0.8, 0.1, 10]));
    const target = createColor('oklch', new Float32Array([0.2, 0.2, 200]));
    matchLuminance(source, target);
  });
});
