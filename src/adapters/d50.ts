const E = 216 / 24389;
const K = 24389 / 27;

const X50 = 0.96422;
const Z50 = 0.82521;

const INV_X50 = 1 / X50;
const INV_Z50 = 1 / Z50;

const INV_K = 1 / K;
const INV_116 = 1 / 116;
const K_116 = K / 116;
const O_116 = 16 / 116;

export function xyz50ToLab(input: Float32Array, output: Float32Array): void {
  const x = input[0] * INV_X50;
  const y = input[1];
  const z = input[2] * INV_Z50;

  const fx = x > E ? Math.cbrt(x) : K_116 * x + O_116;
  const fy = y > E ? Math.cbrt(y) : K_116 * y + O_116;
  const fz = z > E ? Math.cbrt(z) : K_116 * z + O_116;

  output[0] = 116 * fy - 16;
  output[1] = 500 * (fx - fy);
  output[2] = 200 * (fy - fz);
}

export function labToXyz50(input: Float32Array, output: Float32Array): void {
  const l = input[0];
  const a = input[1];
  const b = input[2];

  const fy = (l + 16) * INV_116;
  const fx = a * 0.002 + fy;
  const fz = fy - b * 0.005;

  const x3 = fx * fx * fx;
  const z3 = fz * fz * fz;

  output[0] = (x3 > E ? x3 : (116 * fx - 16) * INV_K) * X50;
  output[1] = l > 8 ? fy * fy * fy : l * INV_K;
  output[2] = (z3 > E ? z3 : (116 * fz - 16) * INV_K) * Z50;
}
