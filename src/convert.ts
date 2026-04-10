import type { Matrix, Space } from './types';
import { xyz50ToXyz65, xyz65ToXyz50 } from './adapters/cat';
import { createMatrix, dropMatrix } from './matrix';
import { HSL } from './spaces/hsl';
import { HSV } from './spaces/hsv';
import { HWB } from './spaces/hwb';
import { LAB } from './spaces/lab';
import { LCH } from './spaces/lch';
import { LRGB } from './spaces/lrgb';
import { OKLAB } from './spaces/oklab';
import { OKLCH } from './spaces/oklch';
import { RGB } from './spaces/rgb';
import { XYZ50 } from './spaces/xyz50';
import { XYZ65 } from './spaces/xyz65';

export const SPACE_MAP: { [S in Space]: Matrix<S> } = {
  rgb: RGB,
  lrgb: LRGB,
  hsl: HSL,
  hsv: HSV,
  hwb: HWB,
  lab: LAB,
  lch: LCH,
  oklab: OKLAB,
  oklch: OKLCH,
  xyz50: XYZ50,
  xyz65: XYZ65,
};

export function convertColor<S extends Space, X extends Space>(
  input: Float32Array,
  output: Float32Array,
  from: S,
  to: X,
): void {
  if (from === (to as string)) {
    if (input !== output) output.set(input);
    return;
  }

  const source = SPACE_MAP[from];

  const { direct } = source;
  if (direct !== undefined) {
    const fn = direct[to];
    if (fn !== undefined) {
      fn(input, output);
      return;
    }
  }

  if (source.polar === to) {
    source.toHub(input, output);
    return;
  }

  const target = SPACE_MAP[to];
  const scratch = createMatrix();

  source.toHub(input, scratch);

  const sHub = source.hub;
  const tHub = target.hub;

  if (sHub !== tHub) {
    if (sHub === 'xyz65') {
      xyz65ToXyz50(scratch, scratch);
    } else {
      xyz50ToXyz65(scratch, scratch);
    }
  }

  target.fromHub(scratch, output);
  dropMatrix(scratch);
}

export function convertHue<S extends Space>(
  input: Float32Array,
  output: Float32Array,
  mode: S,
): void {
  const source = SPACE_MAP[mode];
  const target = source.polar;

  if (!target || mode === target) {
    if (input !== output) output.set(input);
    return;
  }

  convertColor(input, output, mode, target);
}
