export function xyz65ToLrgb(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  output[0] = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  output[1] = -0.969266 * x + 1.876 * y + 0.041556 * z;
  output[2] = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
}

export function lrgbToXyz65(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  output[0] = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  output[1] = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  output[2] = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
}

export function xyz65ToOklab(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  const l_ = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m_ = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s_ = 0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z;

  output[0] =
    0.2104542553 * Math.cbrt(l_) + 0.7936177046 * Math.cbrt(m_) - 0.0040704681 * Math.cbrt(s_);
  output[1] =
    1.9779984951 * Math.cbrt(l_) - 2.4285921822 * Math.cbrt(m_) + 0.4505936871 * Math.cbrt(s_);
  output[2] =
    0.0259040371 * Math.cbrt(l_) + 0.7827717662 * Math.cbrt(m_) - 0.808675766 * Math.cbrt(s_);
}

export function oklabToXyz65(input: Float32Array, output: Float32Array): void {
  const L = input[0];
  const a = input[1];
  const b = input[2];

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  output[0] = 1.2270138511 * l - 0.5577999807 * m + 0.281256149 * s;
  output[1] = -0.0405801784 * l + 1.1122568696 * m - 0.0716766787 * s;
  output[2] = -0.0763812845 * l - 0.4214819784 * m + 1.5861632204 * s;
}

export function xyz50ToOklab(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  const l_ = 0.7707314497 * x + 0.349236067 * y - 0.112043051 * z;
  const m_ = 0.0056740161 * x + 0.9370504065 * y + 0.0696765667 * z;
  const s_ = 0.046375526 * x + 0.2529008071 * y + 0.8515638287 * z;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  output[0] = 0.2104542553 * l + 0.7936177046 * m - 0.0040704681 * s;
  output[1] = 1.9779984951 * l - 2.4285921822 * m + 0.4505936871 * s;
  output[2] = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
}

export function oklabToXyz50(input: Float32Array, output: Float32Array): void {
  const L = input[0];
  const a = input[1];
  const b = input[2];

  const l_r = L + 0.3963378 * a + 0.2158038 * b;
  const m_r = L - 0.1055613 * a - 0.0638542 * b;
  const s_r = L - 0.0894842 * a - 1.2914855 * b;

  const l = l_r * l_r * l_r;
  const m = m_r * m_r * m_r;
  const s = s_r * s_r * s_r;

  output[0] = 1.2885789296 * l - 0.5378855756 * m + 0.213553253 * s;
  output[1] = -0.0026428872 * l + 1.0923802492 * m - 0.089728328 * s;
  output[2] = -0.0693901215 * l - 0.29512658 * m + 1.1893279304 * s;
}

export function lrgbToOklab(input: Float32Array, output: Float32Array): void {
  const r = input[0];
  const g = input[1];
  const b = input[2];

  const l_ = 0.4122215 * r + 0.5363325 * g + 0.051446 * b;
  const m_ = 0.2119035 * r + 0.6806995 * g + 0.107397 * b;
  const s_ = 0.0883025 * r + 0.2817185 * g + 0.629979 * b;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  output[0] = 0.2104542553 * l + 0.7936177046 * m - 0.0040704681 * s;
  output[1] = 1.9779984951 * l - 2.4285921822 * m + 0.4505936871 * s;
  output[2] = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
}

export function oklabToLrgb(input: Float32Array, output: Float32Array): void {
  const L = input[0];
  const a = input[1];
  const b = input[2];

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  output[0] = 4.0767417 * l - 3.3077116 * m + 0.2309699 * s;
  output[1] = -1.268438 * l + 2.6097574 * m - 0.3413194 * s;
  output[2] = -0.0041961 * l - 0.7034186 * m + 1.7076147 * s;
}
