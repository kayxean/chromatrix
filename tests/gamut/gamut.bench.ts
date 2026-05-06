import { beforeEach, bench, describe } from 'vite-plus/test';
import { createColor, mountMatrix } from '~/api/color';
import { clampCartesian, clampHsv, clampPolar, clampRgb, inGamut, toGamut } from '~/utils/gamut';

describe('clamp-rgb', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('rgb', new Float32Array([1.5, -0.2, 0.5]));
  bench('gamut (clamp-rgb-boundaries)', () => {
    clampRgb(color);
  });
});

describe('clamp-hsv', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('hsv', new Float32Array([400, 1.2, -0.5]));
  bench('gamut (clamp-hsv-boundaries)', () => {
    clampHsv(color);
  });
});

describe('clamp-cartesian', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('lab', new Float32Array([110, 50, 50]));
  bench('gamut (clamp-cartesian-boundaries)', () => {
    clampCartesian(color);
  });
});

describe('clamp-polar', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('oklch', new Float32Array([-0.1, -0.2, -10]));
  bench('gamut (clamp-polar-boundaries)', () => {
    clampPolar(color);
  });
});

describe('in-gamut', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const inside = createColor('rgb', new Float32Array([0.5, 0.5, 0.5]));
  const barelyOutside = createColor('rgb', new Float32Array([1.00001, 0, 0]));
  bench('gamut (in-gamut-check)', () => {
    inGamut(inside);
  });
  bench('gamut (in-gamut-epsilon)', () => {
    inGamut(barelyOutside, 0.0001);
  });
});

describe('to-gamut', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('oklch', new Float32Array([0.7, 0.4, 30]));
  const rgb = createColor('rgb', new Float32Array([0.5, 0.5, 0.5]));
  bench('gamut (to-gamut-mapping)', () => {
    color.value[1] = 0.4;
    toGamut(color);
  });
  bench('gamut (to-gamut-noop)', () => {
    toGamut(rgb);
  });
});
