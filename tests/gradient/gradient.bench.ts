import { beforeEach, bench, describe } from 'vitest';
import { createColor, mountMatrix } from '~/api/color';
import {
  createConicGradient,
  createLinearGradient,
  createMultiColorGradient,
  createRadialGradient,
  createSmoothGradient,
} from '~/utils/gradient';

describe('create-linear-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const c1 = createColor('rgb', new Float32Array([1, 0, 0]));
  const c2 = createColor('rgb', new Float32Array([0, 0, 1]));
  const stops = [
    { color: c1, position: 0 },
    { color: c2, position: 100 },
  ];
  bench('gradient (create-linear-gradient)', () => {
    createLinearGradient(stops, 90);
  });
});

describe('create-radial-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const c1 = createColor('rgb', new Float32Array([1, 1, 1]));
  const c2 = createColor('rgb', new Float32Array([0, 0, 0]));
  const stops = [{ color: c1 }, { color: c2 }];
  bench('gradient (create-radial-gradient)', () => {
    createRadialGradient(stops, 'circle', 'top left');
  });
});

describe('create-conic-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const c1 = createColor('rgb', new Float32Array([1, 0, 0]));
  const stops = [{ color: c1, position: 50 }];
  bench('gradient (create-conic-gradient)', () => {
    createConicGradient(stops, 45);
  });
});

describe('create-smooth-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const start = createColor('rgb', new Float32Array([0, 0, 0]));
  const end = createColor('rgb', new Float32Array([1, 1, 1]));
  bench('gradient (create-smooth-gradient-steps)', () => {
    createSmoothGradient(start, end, 3, 'linear');
  });
});

describe('create-multi-color-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const c1 = createColor('rgb', new Float32Array([1, 0, 0]));
  const c2 = createColor('rgb', new Float32Array([0, 1, 0]));
  const c3 = createColor('rgb', new Float32Array([0, 0, 1]));
  const colors = [c1, c2, c3];
  const single = [c1];
  bench('gradient (create-multi-color-gradient-logic)', () => {
    createMultiColorGradient(colors, 'linear');
  });
  bench('gradient (create-multi-color-gradient-single)', () => {
    createMultiColorGradient(single);
  });
});
