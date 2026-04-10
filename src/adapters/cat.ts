export function xyz65ToXyz50(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  output[0] = 1.0478112 * x + 0.0228866 * y - 0.050127 * z;
  output[1] = 0.0295424 * x + 0.9904844 * y - 0.0170491 * z;
  output[2] = -0.0092345 * x + 0.0150436 * y + 0.7521316 * z;
}

export function xyz50ToXyz65(input: Float32Array, output: Float32Array): void {
  const x = input[0];
  const y = input[1];
  const z = input[2];

  output[0] = 0.9555766 * x - 0.0230393 * y + 0.0631636 * z;
  output[1] = -0.0282895 * x + 1.0099416 * y + 0.0210077 * z;
  output[2] = 0.0122982 * x - 0.020483 * y + 1.3299098 * z;
}
