import { D50_TO_D65, D65_TO_D50, multiplyVector } from './vector';

export function xyz65ToXyz50(input: Float32Array, output: Float32Array): void {
  multiplyVector(D65_TO_D50, input, output);
}

export function xyz50ToXyz65(input: Float32Array, output: Float32Array): void {
  multiplyVector(D50_TO_D65, input, output);
}
