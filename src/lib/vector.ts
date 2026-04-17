/**
 * Multiplies a 3x3 matrix by a 3D vector.
 * @param m The 3x3 matrix (Row-Major).
 * @param input The input Float32Array[3].
 * @param output The output Float32Array[3].
 */
export function multiplyVector(m: Float32Array, input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  output[0] = m[0] * x + m[1] * y + m[2] * z;
  output[1] = m[3] * x + m[4] * y + m[5] * z;
  output[2] = m[6] * x + m[7] * y + m[8] * z;
}

/**
 * Applies a function to each component of a vector.
 */
export function applyFn(
  input: Float32Array,
  output: Float32Array,
  fn: (v: number) => number,
): void {
  output[0] = fn(input[0]);
  output[1] = fn(input[1]);
  output[2] = fn(input[2]);
}

/**
 * Global scratch buffer for multi-step conversions.
 */
export const SCRATCH_BUFFER = new Float32Array(3);

/**
 * Chromatic Adaptation: D65 -> D50
 * Method: Bradford Transformation
 * Used in:
 * - xyz65ToXyz50 (Direct)
 * - xyz65ToLab (Intermediate Step)
 * - xyz65ToLch (Intermediate Step)
 * Source: src/adapters/cat.ts
 */
export const D65_TO_D50 = new Float32Array([
  1.047811232, 0.022886617, -0.050126998, 0.029542403, 0.990484391, -0.017049096, -0.009234479,
  0.015043586, 0.752131626,
]);

/**
 * Chromatic Adaptation: D50 -> D65
 * Method: Bradford Transformation
 * Used in:
 * - xyz50ToXyz65 (Direct)
 * - labToXyz65 (Intermediate Step)
 * - lchToXyz65 (Intermediate Step)
 * Source: src/adapters/cat.ts
 */
export const D50_TO_D65 = new Float32Array([
  0.9555766, -0.0230393, 0.0631636, -0.0282895, 1.0099416, 0.0210077, 0.0122982, -0.020483,
  1.3299098,
]);

/**
 * Linear Transformation: XYZ (D65) -> Linear sRGB (LRGB)
 * White Point: D65 [0.9505, 1.0, 1.0890]
 * Used in:
 * - xyz65ToLrgb (Direct)
 * - xyz65ToHsv/Hsl/Hwb (Initial Step)
 * Source: src/adapters/d65.ts
 */
export const D65_TO_SRGB = new Float32Array([
  3.2404541621, -1.5371385127, -0.4985314096, -0.9692660305, 1.8760108448, 0.0415560175,
  0.055643431, -0.2040259135, 1.0572251835,
]);

/**
 * Linear Transformation: Linear sRGB (LRGB) -> XYZ (D65)
 * Used in:
 * - lrgbToXyz65 (Direct)
 * - hsvToXyz65 (Final Step via LRGB)
 * Source: src/adapters/d65.ts
 */
export const SRGB_TO_D65 = new Float32Array([
  0.412456439, 0.3575760777, 0.1804374826, 0.2126728512, 0.7151521552, 0.0721749936, 0.0193338956,
  0.1191920259, 0.9503040785,
]);

/**
 * Linear Transformation: Linear sRGB (LRGB) -> XYZ (D50)
 * Used in:
 * - lrgbToXyz50 (Direct)
 * - lrgbToLab (via lrgbToXyz50)
 * Source: src/adapters/d50.ts
 */
export const SRGB_TO_D50 = new Float32Array([
  0.4360747, 0.3850648, 0.1430804, 0.2225045, 0.7168786, 0.0606169, 0.0139322, 0.0971045, 0.7141733,
]);

/**
 * Linear Transformation: XYZ (D50) -> Linear sRGB (LRGB)
 * Used in:
 * - xyz50ToLrgb (Direct)
 * - labToLrgb (via labToXyz50)
 * Source: src/adapters/d50.ts
 */
export const D50_TO_SRGB = new Float32Array([
  3.133856114, -1.6168667104, -0.4906146316, -0.9787684065, 1.916141541, 0.033454019, 0.0719453278,
  -0.2289914488, 1.4052427306,
]);

/**
 * Linear Transformation: XYZ (D65) -> Oklab LMS (Cone Response)
 * Used in:
 * - xyz65ToOklab (Direct)
 * - lrgbToOklab (Initial Step)
 * Source: src/adapters/d65.ts
 */
export const D65_TO_LMS = new Float32Array([
  0.8189330101, 0.3618667424, -0.1288597137, 0.0329845436, 0.9293118715, 0.0361456387, 0.0482003018,
  0.2643662691, 0.633851707,
]);

/**
 * Linear Transformation: Oklab LMS -> XYZ (D65)
 * Used in:
 * - oklabToXyz65 (Final Step)
 * Source: src/adapters/d65.ts
 */
export const LMS_TO_D65 = new Float32Array([
  1.2270138511, -0.5577999807, 0.281256149, -0.0405801784, 1.1122568696, -0.0716766787,
  -0.0763812845, -0.4214819784, 1.5861632204,
]);

/**
 * Matrix: Modified LMS -> Oklab Axes (L, a, b)
 * Used in:
 * - All forward Oklab conversions
 * Source: src/adapters/d65.ts
 */
export const LMS_TO_OKLAB = new Float32Array([
  0.2104542553, 0.7936177046, -0.0040704681, 1.9779984951, -2.4285921822, 0.4505936871,
  0.0259040371, 0.7827717662, -0.808675766,
]);

/**
 * Matrix: Oklab Axes (L, a, b) -> Modified LMS
 * Used in:
 * - All inverse Oklab conversions
 * Source: src/adapters/d65.ts
 */
export const OKLAB_TO_LMS = new Float32Array([
  1, 0.3963377774, 0.2158037573, 1, -0.1055613458, -0.0638541728, 1, -0.0894841775, -1.291485548,
]);

/**
 * Linear Transformation: XYZ (D50) -> Oklab LMS
 * Used in:
 * - xyz50ToOklab (Direct)
 * Source: Adapted from src/adapters/d65.ts
 */
export const XYZ50_TO_LMS = new Float32Array([
  0.7707314497, 0.349236067, -0.112043051, 0.0056740161, 0.9370504065, 0.0696765667, 0.046375526,
  0.2529008071, 0.8515638287,
]);

/**
 * Linear Transformation: Oklab LMS -> XYZ (D50)
 * Used in:
 * - oklabToXyz50 (Direct)
 * Source: Adapted from src/adapters/d65.ts
 */
export const LMS_TO_XYZ50 = new Float32Array([
  1.2885789296, -0.5378855756, 0.213553253, -0.0026428872, 1.0923802492, -0.089728328,
  -0.0693901215, -0.29512658, 1.1893279304,
]);

/**
 * Linear Transformation: Linear sRGB (LRGB) -> Oklab LMS
 * Used in:
 * - lrgbToOklab (Standard path)
 * Source: src/adapters/d65.ts
 */
export const LRGB_TO_LMS = new Float32Array([
  0.4122215, 0.5363325, 0.051446, 0.2119035, 0.6806995, 0.107397, 0.0883025, 0.2817185, 0.629979,
]);

/**
 * Linear Transformation: Oklab LMS -> Linear sRGB (LRGB)
 * Method: Combined (D65_TO_SRGB * LMS_TO_D65)
 * Used in:
 * - oklabToLrgb (Standard path)
 */
export const LMS_TO_LRGB = new Float32Array([
  4.0767417, -3.3077116, 0.2309699, -1.268438, 2.6097574, -0.3413194, -0.0041961, -0.7034186,
  1.7076147,
]);
