import { beforeEach, bench, describe } from 'vite-plus/test';
import { createColor, mountMatrix } from '~/api/color';
import { adaptColor, averageColor, getDistance, isEqual, sortColors } from '~/utils/analyze';

describe('get-distance', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const oklabA = createColor('oklab', new Float32Array([1, 0, 0]));
  const oklabB = createColor('oklab', new Float32Array([0.5, 0, 0]));
  const rgbA = createColor('rgb', new Float32Array([1, 0, 0]));
  const rgbB = createColor('rgb', new Float32Array([0, 1, 0]));
  const rgbC = createColor('rgb', new Float32Array([0, 0, 1]));
  bench('analyze (get-distance-oklab)', () => {
    getDistance(oklabA, oklabB, 'oklab');
  });
  bench('analyze (get-distance-itp)', () => {
    getDistance(rgbA, rgbB, 'itp');
  });
  bench('analyze (get-distance-deltaE2000)', () => {
    getDistance(rgbA, rgbC, 'deltaE2000');
  });
});

describe('sort-colors', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const c1 = createColor('oklch', new Float32Array([0.2, 0.1, 10]));
  const c2 = createColor('oklch', new Float32Array([0.8, 0.1, 10]));
  const c3 = createColor('oklch', new Float32Array([0.5, 0.1, 10]));
  const cChroma1 = createColor('oklch', new Float32Array([0.5, 0.4, 10]));
  const cHue1 = createColor('oklch', new Float32Array([0.5, 0.1, 200]));
  const cHue2 = createColor('oklch', new Float32Array([0.5, 0.1, 50]));
  const target = createColor('oklab', new Float32Array([1, 0, 0]));
  const far = createColor('oklab', new Float32Array([0, 0, 0]));
  const near = createColor('oklab', new Float32Array([0.9, 0, 0]));
  const whiteRgb = createColor('rgb', new Float32Array([1, 1, 1]));
  bench('analyze (sort-colors-luminance)', () => {
    sortColors([c1, c2, c3], 'luminance');
  });
  bench('analyze (sort-colors-chroma)', () => {
    sortColors([cChroma1, c3], 'chroma');
  });
  bench('analyze (sort-colors-hue)', () => {
    sortColors([cHue1, cHue2], 'hue');
  });
  bench('analyze (sort-colors-distance)', () => {
    sortColors([far, near], 'distance', target);
  });
  bench('analyze (sort-colors-distance-noop)', () => {
    sortColors([whiteRgb], 'distance');
  });
});

describe('average-color', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const c1 = createColor('oklab', new Float32Array([1, 0.2, -0.2]));
  const c2 = createColor('oklab', new Float32Array([0, 0.4, 0.2]));
  const cAlpha1 = createColor('oklab', new Float32Array([1, 0, 0]), 1);
  const cAlpha2 = createColor('oklab', new Float32Array([0, 0, 0]), 0.4);
  bench('analyze (average-color)', () => {
    averageColor([c1, c2]);
  });
  bench('analyze (average-color-empty)', () => {
    averageColor([]);
  });
  bench('analyze (average-color-alpha)', () => {
    averageColor([cAlpha1, cAlpha2]);
  });
});

describe('adapt-color', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const color = createColor('rgb', new Float32Array([1, 0.5, 0]));
  bench('analyze (adapt-color)', () => {
    adaptColor(color, 'd65', 'd50');
  });
  bench('analyze (adapt-color-noop)', () => {
    adaptColor(color, 'd65', 'd65');
  });
});

describe('is-equal', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  const rgbA = createColor('rgb', new Float32Array([1, 1, 1]));
  const rgbAlpha1 = createColor('rgb', new Float32Array([1, 1, 1]), 1);
  const rgbAlpha2 = createColor('rgb', new Float32Array([1, 1, 1]), 0.5);
  const oklch1 = createColor('oklch', new Float32Array([0.5, 0.1, 359.95]));
  const oklch2 = createColor('oklch', new Float32Array([0.5, 0.1, 0.01]));
  const hwb1 = createColor('hwb', new Float32Array([359.95, 0.1, 0.1]));
  const hwb2 = createColor('hwb', new Float32Array([0.01, 0.1, 0.1]));
  const oklabA = createColor('oklab', new Float32Array([1, 0, 0]));
  const rgbMid = createColor('rgb', new Float32Array([0.5, 0.5, 0.5]));
  const rgbOffset = createColor('rgb', new Float32Array([0.505, 0.5, 0.5]));
  bench('analyze (is-equal-identity)', () => {
    isEqual(rgbA, rgbA);
  });
  bench('analyze (is-equal-mismatch)', () => {
    isEqual(rgbAlpha1, rgbAlpha2);
  });
  bench('analyze (is-equal-polar-oklch)', () => {
    isEqual(oklch1, oklch2);
  });
  bench('analyze (is-equal-polar-hwb)', () => {
    isEqual(hwb1, hwb2);
  });
  bench('analyze (is-equal-cross-space)', () => {
    isEqual(rgbA, oklabA);
  });
  bench('analyze (is-equal-tolerance)', () => {
    isEqual(rgbMid, rgbOffset, 0.1);
    isEqual(rgbMid, rgbOffset, 0.001);
  });
});
