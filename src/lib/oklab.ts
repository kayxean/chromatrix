import {
  D65_TO_LMS,
  LMS_TO_D65,
  LMS_TO_LRGB,
  LMS_TO_OKLAB,
  LMS_TO_XYZ50,
  LRGB_TO_LMS,
  OKLAB_TO_LMS,
  SCRATCH_BUFFER,
  XYZ50_TO_LMS,
  multiplyVector,
} from './vector';

export function xyz65ToOklab(input: Float32Array, output: Float32Array): void {
  multiplyVector(D65_TO_LMS, input, output);

  output[0] = Math.cbrt(output[0]);
  output[1] = Math.cbrt(output[1]);
  output[2] = Math.cbrt(output[2]);

  multiplyVector(LMS_TO_OKLAB, output, output);

  if (output[0] > 0.99 && Math.abs(output[1]) < 1e-4 && Math.abs(output[2]) < 1e-4) {
    output[1] = 0;
    output[2] = 0;
  }
}

export function oklabToXyz65(input: Float32Array, output: Float32Array): void {
  multiplyVector(OKLAB_TO_LMS, input, output);

  output[0] = output[0] * output[0] * output[0];
  output[1] = output[1] * output[1] * output[1];
  output[2] = output[2] * output[2] * output[2];

  multiplyVector(LMS_TO_D65, output, output);
}

export function xyz50ToOklab(input: Float32Array, output: Float32Array): void {
  multiplyVector(XYZ50_TO_LMS, input, SCRATCH_BUFFER);

  SCRATCH_BUFFER[0] = Math.cbrt(SCRATCH_BUFFER[0]);
  SCRATCH_BUFFER[1] = Math.cbrt(SCRATCH_BUFFER[1]);
  SCRATCH_BUFFER[2] = Math.cbrt(SCRATCH_BUFFER[2]);

  multiplyVector(LMS_TO_OKLAB, SCRATCH_BUFFER, output);

  if (output[0] > 0.99 && Math.abs(output[1]) < 1e-4 && Math.abs(output[2]) < 1e-4) {
    output[1] = 0;
    output[2] = 0;
  }
}

export function oklabToXyz50(input: Float32Array, output: Float32Array): void {
  multiplyVector(OKLAB_TO_LMS, input, SCRATCH_BUFFER);

  SCRATCH_BUFFER[0] = SCRATCH_BUFFER[0] * SCRATCH_BUFFER[0] * SCRATCH_BUFFER[0];
  SCRATCH_BUFFER[1] = SCRATCH_BUFFER[1] * SCRATCH_BUFFER[1] * SCRATCH_BUFFER[1];
  SCRATCH_BUFFER[2] = SCRATCH_BUFFER[2] * SCRATCH_BUFFER[2] * SCRATCH_BUFFER[2];

  multiplyVector(LMS_TO_XYZ50, SCRATCH_BUFFER, output);
}

export function lrgbToOklab(input: Float32Array, output: Float32Array): void {
  multiplyVector(LRGB_TO_LMS, input, SCRATCH_BUFFER);

  SCRATCH_BUFFER[0] = Math.cbrt(SCRATCH_BUFFER[0]);
  SCRATCH_BUFFER[1] = Math.cbrt(SCRATCH_BUFFER[1]);
  SCRATCH_BUFFER[2] = Math.cbrt(SCRATCH_BUFFER[2]);

  multiplyVector(LMS_TO_OKLAB, SCRATCH_BUFFER, output);
}

export function oklabToLrgb(input: Float32Array, output: Float32Array): void {
  multiplyVector(OKLAB_TO_LMS, input, SCRATCH_BUFFER);

  SCRATCH_BUFFER[0] = SCRATCH_BUFFER[0] * SCRATCH_BUFFER[0] * SCRATCH_BUFFER[0];
  SCRATCH_BUFFER[1] = SCRATCH_BUFFER[1] * SCRATCH_BUFFER[1] * SCRATCH_BUFFER[1];
  SCRATCH_BUFFER[2] = SCRATCH_BUFFER[2] * SCRATCH_BUFFER[2] * SCRATCH_BUFFER[2];

  multiplyVector(LMS_TO_LRGB, SCRATCH_BUFFER, output);
}
