export function xyz65ToOklab(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  const l = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
  const m = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
  const s = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z);

  const o0 = 0.2104542553 * l + 0.7936177046 * m - 0.0040704681 * s;
  const o1 = 1.9779984951 * l - 2.4285921822 * m + 0.4505936871 * s;
  const o2 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  output[0] = o0;
  output[1] = o1;
  output[2] = o2;
}

export function oklabToXyz65(input: Float32Array, output: Float32Array): void {
  const L = input[0];
  const a = input[1];
  const b = input[2];

  const l3 = L + 0.3963377774 * a + 0.2158037573 * b;
  const m3 = L - 0.1055613458 * a - 0.0638541728 * b;
  const s3 = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l3 * l3 * l3;
  const m = m3 * m3 * m3;
  const s = s3 * s3 * s3;

  output[0] = 1.2270138511 * l - 0.5577999807 * m + 0.281256149 * s;
  output[1] = -0.0405801784 * l + 1.1122568696 * m - 0.0716766787 * s;
  output[2] = -0.0763812845 * l - 0.4214819784 * m + 1.5861632204 * s;
}

export function xyz50ToOklab(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  const l = Math.cbrt(0.7707314497 * x + 0.349236067 * y - 0.112043051 * z);
  const m = Math.cbrt(0.0056740161 * x + 0.9370504065 * y + 0.0696765667 * z);
  const s = Math.cbrt(0.046375526 * x + 0.2529008071 * y + 0.8515638287 * z);

  const o0 = 0.2104542553 * l + 0.7936177046 * m - 0.0040704681 * s;
  const o1 = 1.9779984951 * l - 2.4285921822 * m + 0.4505936871 * s;
  const o2 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  output[0] = o0;
  output[1] = o1;
  output[2] = o2;
}

export function oklabToXyz50(input: Float32Array, output: Float32Array): void {
  const L = input[0];
  const a = input[1];
  const b = input[2];

  const l3 = L + 0.3963377774 * a + 0.2158037573 * b;
  const m3 = L - 0.1055613458 * a - 0.0638541728 * b;
  const s3 = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l3 * l3 * l3;
  const m = m3 * m3 * m3;
  const s = s3 * s3 * s3;

  output[0] = 1.2885789296 * l - 0.5378855756 * m + 0.213553253 * s;
  output[1] = -0.0026428872 * l + 1.0923802492 * m - 0.089728328 * s;
  output[2] = -0.0693901215 * l - 0.29512658 * m + 1.1893279304 * s;
}

export function lrgbToOklab(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  const l = Math.cbrt(0.4122215 * r + 0.5363325 * g + 0.051446 * b);
  const m = Math.cbrt(0.2119035 * r + 0.6806995 * g + 0.107397 * b);
  const s = Math.cbrt(0.0883025 * r + 0.2817185 * g + 0.629979 * b);

  output[0] = 0.2104542553 * l + 0.7936177046 * m - 0.0040704681 * s;
  output[1] = 1.9779984951 * l - 2.4285921822 * m + 0.4505936871 * s;
  output[2] = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
}

export function oklabToLrgb(input: Float32Array, output: Float32Array): void {
  const L = input[0];
  const a = input[1];
  const b = input[2];

  const l3 = L + 0.3963377774 * a + 0.2158037573 * b;
  const m3 = L - 0.1055613458 * a - 0.0638541728 * b;
  const s3 = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l3 * l3 * l3;
  const m = m3 * m3 * m3;
  const s = s3 * s3 * s3;

  output[0] = 4.0767417 * l - 3.3077116 * m + 0.2309699 * s;
  output[1] = -1.268438 * l + 2.6097574 * m - 0.3413194 * s;
  output[2] = -0.0041961 * l - 0.7034186 * m + 1.7076147 * s;
}
