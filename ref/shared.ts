import type { Color, ColorArray, ColorMatrix, ColorSpace } from './types';

const MAX_POOL_SIZE = 256;
const pool: ColorArray[] = [];

export function createMatrix<S extends ColorSpace>(space: S): ColorMatrix<S>;
export function createMatrix<S extends ColorSpace>(): ColorMatrix<S> {
  return (pool.pop() ?? (new Float32Array(3) as ColorArray)) as ColorMatrix<S>;
}

export function dropMatrix(arr: ColorArray): void {
  if (pool.length < MAX_POOL_SIZE) {
    arr.fill(0);
    pool.push(arr);
  }
}

export function createColor<S extends ColorSpace>(
  space: S,
  values: [number, number, number] | Float32Array,
  alpha?: number,
): Color<S> {
  const value = createMatrix(space);
  value.set(values);
  return { space, value, alpha };
}

export function dropColor(color: Color): void {
  dropMatrix(color.value);
}

export function cloneColor<S extends ColorSpace>(color: Color<S>): Color<S> {
  const copy = createMatrix(color.space);
  copy.set(color.value);
  return {
    space: color.space,
    value: copy,
    alpha: color.alpha,
  };
}

export function updateColor(
  color: Color,
  values: [number, number, number] | Float32Array,
): void {
  color.value.set(values);
}

export function preallocatePool(size: number): void {
  const count = Math.min(size, MAX_POOL_SIZE - pool.length);
  for (let i = 0; i < count; i++) {
    pool.push(new Float32Array(3) as ColorArray);
  }
}

export function clearPool(): void {
  pool.length = 0;
}

export function getPoolSize(): number {
  return pool.length;
}
