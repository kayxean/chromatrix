import { beforeEach, describe, expect, test } from 'vitest';
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
  test('gradient (create-linear-gradient)', () => {
    const c1 = createColor('rgb', new Float32Array([1, 0, 0]));
    const c2 = createColor('rgb', new Float32Array([0, 0, 1]));
    const grad = createLinearGradient(
      [
        { color: c1, position: 0 },
        { color: c2, position: 100 },
      ],
      90,
    );
    expect(grad).toBe('linear-gradient(90deg, rgb(255 0 0) 0%, rgb(0 0 255) 100%)');
  });
});

describe('create-radial-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gradient (create-radial-gradient)', () => {
    const c1 = createColor('rgb', new Float32Array([1, 1, 1]));
    const c2 = createColor('rgb', new Float32Array([0, 0, 0]));
    const grad = createRadialGradient([{ color: c1 }, { color: c2 }], 'circle', 'top left');
    expect(grad).toBe('radial-gradient(circle at top left, rgb(255 255 255), rgb(0 0 0))');
  });
});

describe('create-conic-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gradient (create-conic-gradient)', () => {
    const c1 = createColor('rgb', new Float32Array([1, 0, 0]));
    const grad = createConicGradient([{ color: c1, position: 50 }], 45);
    expect(grad).toBe('conic-gradient(from 45deg at center, rgb(255 0 0) 50%)');
  });
});

describe('create-smooth-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gradient (create-smooth-gradient-steps)', () => {
    const start = createColor('rgb', new Float32Array([0, 0, 0]));
    const end = createColor('rgb', new Float32Array([1, 1, 1]));
    const grad = createSmoothGradient(start, end, 3, 'linear');
    expect(grad).toContain('0%');
    expect(grad).toContain('50%');
    expect(grad).toContain('100%');
    expect(grad).toMatch(/linear-gradient\(180deg, .+\)/);
  });
});

describe('create-multi-color-gradient', () => {
  beforeEach(() => {
    mountMatrix(2048);
  });
  test('gradient (create-multi-color-gradient-logic)', () => {
    const c1 = createColor('rgb', new Float32Array([1, 0, 0]));
    const c2 = createColor('rgb', new Float32Array([0, 1, 0]));
    const c3 = createColor('rgb', new Float32Array([0, 0, 1]));
    const grad = createMultiColorGradient([c1, c2, c3], 'linear');
    expect(grad).toContain('0%');
    expect(grad).toContain('50%');
    expect(grad).toContain('100%');
  });
  test('gradient (create-multi-color-gradient-single)', () => {
    const c1 = createColor('rgb', new Float32Array([1, 0, 0]));
    const grad = createMultiColorGradient([c1]);
    expect(grad).toBe('rgb(255 0 0)');
  });
});
