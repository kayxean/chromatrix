import type { Space } from '../lib/types';
import { xyz50ToXyz65, xyz65ToXyz50 } from '../lib/chroma';
import {
  labToLrgb,
  labToXyz50,
  labToXyz65,
  lrgbToLab,
  xyz50ToLab,
  xyz65ToLab,
} from '../lib/cielab';
import {
  lrgbToRgb,
  lrgbToXyz50,
  lrgbToXyz65,
  rgbToLrgb,
  xyz50ToLrgb,
  xyz65ToLrgb,
} from '../lib/linear';
import {
  lrgbToOklab,
  oklabToLrgb,
  oklabToXyz50,
  oklabToXyz65,
  xyz50ToOklab,
  xyz65ToOklab,
} from '../lib/oklab';
import { labToLch, lchToLab, oklabToOklch, oklchToOklab } from '../lib/polar';
import { hslToHsv, hsvToHsl, hsvToHwb, hsvToRgb, hwbToHsv, rgbToHsv } from '../lib/srgb';

type ConvertFn = (input: Float32Array, output: Float32Array) => void;

type Edge = readonly [from: number, to: number, fn: ConvertFn];

const SPACES: readonly Space[] = [
  'rgb',
  'hsl',
  'hsv',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'lrgb',
  'xyz50',
  'xyz65',
] as const;

const COUNT = SPACES.length;

const IDS: Readonly<Record<Space, number>> = Object.freeze({
  rgb: 0,
  hsl: 1,
  hsv: 2,
  hwb: 3,
  lab: 4,
  lch: 5,
  oklab: 6,
  oklch: 7,
  lrgb: 8,
  xyz50: 9,
  xyz65: 10,
});

const enum SpaceId {
  rgb = 0,
  hsl = 1,
  hsv = 2,
  hwb = 3,
  lab = 4,
  lch = 5,
  oklab = 6,
  oklch = 7,
  lrgb = 8,
  xyz50 = 9,
  xyz65 = 10,
}

const RGB = SpaceId.rgb;
const HSL = SpaceId.hsl;
const HSV = SpaceId.hsv;
const HWB = SpaceId.hwb;
const LAB = SpaceId.lab;
const LCH = SpaceId.lch;
const OKLAB = SpaceId.oklab;
const OKLCH = SpaceId.oklch;
const LRGB = SpaceId.lrgb;
const XYZ50 = SpaceId.xyz50;
const XYZ65 = SpaceId.xyz65;

const EDGES: readonly Edge[] = [
  [RGB, HSV, rgbToHsv],
  [RGB, LRGB, rgbToLrgb],
  [HSL, HSV, hslToHsv],
  [HSV, RGB, hsvToRgb],
  [HSV, HSL, hsvToHsl],
  [HSV, HWB, hsvToHwb],
  [HWB, HSV, hwbToHsv],
  [LAB, LCH, labToLch],
  [LAB, LRGB, labToLrgb],
  [LAB, XYZ50, labToXyz50],
  [LAB, XYZ65, labToXyz65],
  [LCH, LAB, lchToLab],
  [OKLAB, OKLCH, oklabToOklch],
  [OKLAB, LRGB, oklabToLrgb],
  [OKLAB, XYZ50, oklabToXyz50],
  [OKLAB, XYZ65, oklabToXyz65],
  [OKLCH, OKLAB, oklchToOklab],
  [LRGB, RGB, lrgbToRgb],
  [LRGB, LAB, lrgbToLab],
  [LRGB, OKLAB, lrgbToOklab],
  [LRGB, XYZ50, lrgbToXyz50],
  [LRGB, XYZ65, lrgbToXyz65],
  [XYZ50, LAB, xyz50ToLab],
  [XYZ50, OKLAB, xyz50ToOklab],
  [XYZ50, LRGB, xyz50ToLrgb],
  [XYZ50, XYZ65, xyz50ToXyz65],
  [XYZ65, LAB, xyz65ToLab],
  [XYZ65, OKLAB, xyz65ToOklab],
  [XYZ65, LRGB, xyz65ToLrgb],
  [XYZ65, XYZ50, xyz65ToXyz50],
];

const POOL_SIZE = 8;
const BUFFER_POOL = Array.from({ length: POOL_SIZE }, () => ({
  a: new Float32Array(3),
  b: new Float32Array(3),
}));
const state = { poolIdx: 0 };
const MAX_PATH_LEN = 6;
const PLAN_POINTERS = new Uint32Array(COUNT * COUNT);
const PATH_DATA = new Int32Array(COUNT * COUNT * MAX_PATH_LEN).fill(-1);
const _QUEUE = new Uint32Array(COUNT);
const _PARENTS = new Int32Array(COUNT);
const _EDGE_MAP = new Int32Array(COUNT);

function resolvePathNumerical(from: number, to: number): void {
  if (from === to) return;
  _PARENTS.fill(-1);
  _EDGE_MAP.fill(-1);
  let head = 0;
  let tail = 0;
  _QUEUE[tail++] = from;
  while (head < tail) {
    const curr = _QUEUE[head++];
    if (curr === to) {
      const planIdx = from * COUNT + to;
      PLAN_POINTERS[planIdx] = planIdx * MAX_PATH_LEN;
      let temp = to;
      let depth = 0;
      const tempPath = _QUEUE;
      while (temp !== from) {
        tempPath[depth++] = _EDGE_MAP[temp];
        temp = _PARENTS[temp];
      }
      for (let k = 0; k < depth; k++) {
        PATH_DATA[PLAN_POINTERS[planIdx] + k] = tempPath[depth - 1 - k];
      }
      return;
    }
    for (let i = 0; i < EDGES.length; i++) {
      const e = EDGES[i];
      if (e[0] === curr && _PARENTS[e[1]] === -1 && e[1] !== from) {
        _PARENTS[e[1]] = curr;
        _EDGE_MAP[e[1]] = i;
        _QUEUE[tail++] = e[1];
      }
    }
  }
}

(function init(): void {
  for (let i = 0; i < COUNT; i++) {
    for (let j = 0; j < COUNT; j++) {
      resolvePathNumerical(i, j);
    }
  }
})();

export function convertColorById(
  input: Float32Array,
  output: Float32Array,
  fIdx: number,
  tIdx: number,
): void {
  if (fIdx === tIdx) {
    output[0] = input[0];
    output[1] = input[1];
    output[2] = input[2];
    return;
  }

  const offset = PLAN_POINTERS[fIdx * COUNT + tIdx];
  const pool = BUFFER_POOL[state.poolIdx++ & 7];

  const e0 = PATH_DATA[offset];
  if (e0 === -1) return;

  const e1 = PATH_DATA[offset + 1];
  if (e1 === -1) {
    EDGES[e0][2](input, output);
    return;
  }
  EDGES[e0][2](input, pool.a);

  const e2 = PATH_DATA[offset + 2];
  if (e2 === -1) {
    EDGES[e1][2](pool.a, output);
    return;
  }
  EDGES[e1][2](pool.a, pool.b);

  const e3 = PATH_DATA[offset + 3];
  if (e3 === -1) {
    EDGES[e2][2](pool.b, output);
    return;
  }
  EDGES[e2][2](pool.b, pool.a);

  const e4 = PATH_DATA[offset + 4];
  if (e4 === -1) {
    EDGES[e3][2](pool.a, output);
    return;
  }
  EDGES[e3][2](pool.a, pool.b);

  const e5 = PATH_DATA[offset + 5];
  if (e5 === -1) {
    EDGES[e4][2](pool.b, output);
    return;
  }
  EDGES[e4][2](pool.b, pool.a);
  EDGES[e5][2](pool.a, output);
}

export function convertColor<S extends Space, T extends Space>(
  input: Float32Array,
  output: Float32Array,
  from: S,
  to: T,
): void {
  const fIdx = IDS[from];
  const tIdx = IDS[to];

  if (fIdx === undefined || tIdx === undefined) {
    throw new Error(`Invalid space: ${from} or ${to}`);
  }

  convertColorById(input, output, fIdx, tIdx);
}
