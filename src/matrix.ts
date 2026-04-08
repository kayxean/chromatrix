import type { Color, ColorArray, ColorMatrix, ColorSpace } from './types';

const POOL_SIZE = 2048;
const SENTINEL = new Float32Array(3);

const pool: Float32Array[] = Array.from({ length: POOL_SIZE }, () => new Float32Array(3));
let poolPtr: number = POOL_SIZE - 1;

export function createMatrix<S extends ColorSpace>(_space?: S): ColorMatrix<S> {
  const ptr = poolPtr;
  if (ptr < 0) return SENTINEL as ColorMatrix<S>;

  const res = pool[ptr];
  poolPtr = ptr - 1;
  return res as ColorMatrix<S>;
}

export function dropMatrix(arr: ColorArray): void {
  const ptr = poolPtr;
  if (ptr < 2047) {
    const next = ptr + 1;
    pool[next] = arr as Float32Array;
    poolPtr = next;
  }
}

export function createColor<S extends ColorSpace>(
  space: S,
  values: [number, number, number] | Float32Array | ColorArray,
  alpha = 1,
): Color<S> {
  const ptr = poolPtr;
  let value: Float32Array;

  if (ptr < 0) {
    value = SENTINEL;
  } else {
    value = pool[ptr];
    poolPtr = ptr - 1;
  }

  value[0] = values[0];
  value[1] = values[1];
  value[2] = values[2];

  return { space, value: value as ColorMatrix<S>, alpha };
}

export function dropColor(color: Color): void {
  const ptr = poolPtr;
  if (ptr < 2047) {
    const next = ptr + 1;
    pool[next] = color.value as Float32Array;
    poolPtr = next;
  }
}

export function cloneColor<S extends ColorSpace>(color: Color<S>): Color<S> {
  const ptr = poolPtr;
  const src = color.value as Float32Array;
  let res: Float32Array;

  if (ptr < 0) {
    res = SENTINEL;
  } else {
    res = pool[ptr];
    poolPtr = ptr - 1;
  }

  res[0] = src[0];
  res[1] = src[1];
  res[2] = src[2];

  return {
    space: color.space,
    value: res as ColorMatrix<S>,
    alpha: color.alpha,
  };
}

export function preallocatePool(size: number): void {
  const target = size > 2048 ? 2048 : size;
  poolPtr = target - 1;
}

export function clearPool(): void {
  poolPtr = -1;
}

export function poolSize(): number {
  return poolPtr + 1;
}
