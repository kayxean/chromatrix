const E = 216 / 24389;
const K = 24389 / 27;

const X50 = 0.96422;
const Z50 = 0.82521;

const INV_X50 = 1 / X50;
const INV_Z50 = 1 / Z50;

const INV_K = 1 / K;
const K_116 = K / 116;
const O_116 = 16 / 116;

function cbrt(x: number): number {
  if (x >= 0) return Math.pow(x, 0.3333333333333333);
  return -Math.pow(-x, 0.3333333333333333);
}

export function xyz50ToLab(input: Float32Array, output: Float32Array): void {
  const fx = input[0] * INV_X50;
  const fy = input[1];
  const fz = input[2] * INV_Z50;

  const ox = fx > E ? cbrt(fx) : K_116 * fx + O_116;
  const oy = fy > E ? cbrt(fy) : K_116 * fy + O_116;
  const oz = fz > E ? cbrt(fz) : K_116 * fz + O_116;

  output[0] = 116 * oy - 16;
  output[1] = 500 * (ox - oy);
  output[2] = 200 * (oy - oz);
}

export function labToXyz50(input: Float32Array, output: Float32Array): void {
  const l = input[0];
  const fy = (l + 16) / 116;
  const fx = input[1] * 0.002 + fy;
  const fz = fy - input[2] * 0.005;

  const x3 = fx * fx * fx;
  const y3 = fy * fy * fy;
  const z3 = fz * fz * fz;

  output[0] = (x3 > E ? x3 : (116 * fx - 16) * INV_K) * X50;
  output[1] = y3 > E ? y3 : l * INV_K;
  output[2] = (z3 > E ? z3 : (116 * fz - 16) * INV_K) * Z50;
}

// xyz65 → d50 → lab, fully inlined (D65_TO_D50 × xyz65, then xyz50ToLab)
export function xyz65ToLab(input: Float32Array, output: Float32Array): void {
  const ix = input[0];
  const iy = input[1];
  const iz = input[2];

  const x50 = 1.0478112 * ix + 0.0228866 * iy - 0.050127 * iz;
  const y50 = 0.0295424 * ix + 0.9904844 * iy - 0.0170491 * iz;
  const z50 = -0.0092345 * ix + 0.0150436 * iy + 0.7521316 * iz;

  const fx = x50 * INV_X50;
  const fz = z50 * INV_Z50;

  const ox = fx > E ? cbrt(fx) : K_116 * fx + O_116;
  const oy = y50 > E ? cbrt(y50) : K_116 * y50 + O_116;
  const oz = fz > E ? cbrt(fz) : K_116 * fz + O_116;

  output[0] = 116 * oy - 16;
  output[1] = 500 * (ox - oy);
  output[2] = 200 * (oy - oz);
}

// lab → xyz50 → xyz65, fully inlined (labToXyz50, then D50_TO_D65 × xyz50)
export function labToXyz65(input: Float32Array, output: Float32Array): void {
  const l = input[0];
  const fy = (l + 16) / 116;
  const fx = input[1] * 0.002 + fy;
  const fz = fy - input[2] * 0.005;

  const x3 = fx * fx * fx;
  const y3 = fy * fy * fy;
  const z3 = fz * fz * fz;

  const x50 = (x3 > E ? x3 : (116 * fx - 16) * INV_K) * X50;
  const y50 = y3 > E ? y3 : l * INV_K;
  const z50 = (z3 > E ? z3 : (116 * fz - 16) * INV_K) * Z50;

  output[0] = 0.9555766 * x50 - 0.0230393 * y50 + 0.0631636 * z50;
  output[1] = -0.0282895 * x50 + 1.0099416 * y50 + 0.0210077 * z50;
  output[2] = 0.0122982 * x50 - 0.020483 * y50 + 1.3299098 * z50;
}

// lrgb → xyz50 → lab, fully inlined (SRGB_TO_D50 × lrgb, then xyz50ToLab)
export function lrgbToLab(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  const x50 = 0.4360747 * r + 0.3850648 * g + 0.1430804 * b;
  const y50 = 0.2225045 * r + 0.7168786 * g + 0.0606169 * b;
  const z50 = 0.0139322 * r + 0.0971045 * g + 0.7141733 * b;

  const fx = x50 * INV_X50;
  const fz = z50 * INV_Z50;

  const ox = fx > E ? cbrt(fx) : K_116 * fx + O_116;
  const oy = y50 > E ? cbrt(y50) : K_116 * y50 + O_116;
  const oz = fz > E ? cbrt(fz) : K_116 * fz + O_116;

  output[0] = 116 * oy - 16;
  output[1] = 500 * (ox - oy);
  output[2] = 200 * (oy - oz);
}

// lab → xyz50 → lrgb, fully inlined (labToXyz50, then D50_TO_SRGB × xyz50)
export function labToLrgb(input: Float32Array, output: Float32Array): void {
  const l = input[0];
  const fy = (l + 16) / 116;
  const fx = input[1] * 0.002 + fy;
  const fz = fy - input[2] * 0.005;

  const x3 = fx * fx * fx;
  const y3 = fy * fy * fy;
  const z3 = fz * fz * fz;

  const x50 = (x3 > E ? x3 : (116 * fx - 16) * INV_K) * X50;
  const y50 = y3 > E ? y3 : l * INV_K;
  const z50 = (z3 > E ? z3 : (116 * fz - 16) * INV_K) * Z50;

  output[0] = 3.1338561 * x50 - 1.6168667 * y50 - 0.4906146 * z50;
  output[1] = -0.9787684 * x50 + 1.9161415 * y50 + 0.033454 * z50;
  output[2] = 0.0719453 * x50 - 0.2289914 * y50 + 1.4052427 * z50;
}
