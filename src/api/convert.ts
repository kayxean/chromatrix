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
import type { Space } from '../lib/types';

type ConvertFn = (input: Float32Array, output: Float32Array) => void;

const GRAPH: Record<Space, Partial<Record<Space, ConvertFn>>> = {
  rgb: { hsv: rgbToHsv, lrgb: rgbToLrgb },
  hsl: { hsv: hslToHsv },
  hsv: { rgb: hsvToRgb, hsl: hsvToHsl, hwb: hsvToHwb },
  hwb: { hsv: hwbToHsv },
  lab: { lch: labToLch, lrgb: labToLrgb, xyz50: labToXyz50, xyz65: labToXyz65 },
  lch: { lab: lchToLab },
  oklab: { oklch: oklabToOklch, lrgb: oklabToLrgb, xyz50: oklabToXyz50, xyz65: oklabToXyz65 },
  oklch: { oklab: oklchToOklab },
  lrgb: {
    rgb: lrgbToRgb,
    lab: lrgbToLab,
    oklab: lrgbToOklab,
    xyz50: lrgbToXyz50,
    xyz65: lrgbToXyz65,
  },
  xyz50: { lab: xyz50ToLab, oklab: xyz50ToOklab, lrgb: xyz50ToLrgb, xyz65: xyz50ToXyz65 },
  xyz65: { lab: xyz65ToLab, oklab: xyz65ToOklab, lrgb: xyz65ToLrgb, xyz50: xyz65ToXyz50 },
};
const SPACES: Space[] = [
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
];
const COUNT = SPACES.length;
const IDS: Record<string, number> = Object.fromEntries(SPACES.map((name, i) => [name, i]));
const ADJACENCY = SPACES.map((name) => {
  const connections = GRAPH[name] as Record<string, ConvertFn>;
  return Object.entries(connections).map(([neighbor, fn]) => ({
    to: IDS[neighbor],
    fn,
  }));
});

function getPath(start: number, target: number): ConvertFn[] {
  if (start === target) return [];
  const queue = new Int16Array(COUNT);
  let head = 0;
  let tail = 0;
  queue[tail++] = start;
  const parents = new Int16Array(COUNT).fill(-1);
  const stepFns = Array.from<unknown, ConvertFn | null>({ length: COUNT }, () => null);
  while (head < tail) {
    const curr = queue[head++];
    if (curr === target) {
      break;
    }
    const neighbors = ADJACENCY[curr];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      const { to, fn } = neighbor;
      if (parents[to] === -1 && to !== start) {
        parents[to] = curr;
        stepFns[to] = fn;
        queue[tail++] = to;
      }
    }
  }
  const path: ConvertFn[] = [];
  let curr = target;
  while (curr !== start) {
    const fn = stepFns[curr]!;
    path.push(fn);
    curr = parents[curr];
  }
  return path.toReversed();
}

const R1 = new Float32Array(3);
const R2 = new Float32Array(3);

function bake(steps: Readonly<ConvertFn[]>): ConvertFn {
  const len = steps.length;
  switch (len) {
    case 0:
      return (i, o) => {
        o[0] = i[0];
        o[1] = i[1];
        o[2] = i[2];
      };
    case 1: {
      const f0 = steps[0];
      return (i, o) => {
        f0(i, o);
      };
    }
    case 2: {
      const f0 = steps[0];
      const f1 = steps[1];
      return (i, o) => {
        f0(i, R1);
        f1(R1, o);
      };
    }
    case 3: {
      const f0 = steps[0];
      const f1 = steps[1];
      const f2 = steps[2];
      return (i, o) => {
        f0(i, R1);
        f1(R1, R2);
        f2(R2, o);
      };
    }
    case 4: {
      const f0 = steps[0];
      const f1 = steps[1];
      const f2 = steps[2];
      const f3 = steps[3];
      return (i, o) => {
        f0(i, R1);
        f1(R1, R2);
        f2(R2, R1);
        f3(R1, o);
      };
    }
    default:
      return (i, o) => {
        let src = i;
        let dst = R1;
        for (let n = 0; n < len - 1; n++) {
          steps[n](src, dst);
          const next = src === R1 ? R2 : R1;
          src = dst;
          dst = next;
        }
        steps[len - 1](src, o);
      };
  }
}

const DISPATCH = Array.from<unknown, ConvertFn>({ length: COUNT * COUNT }, (_, index) => {
  const from = Math.trunc(index / COUNT);
  const to = index % COUNT;
  return bake(getPath(from, to));
});

export function convertColor(
  input: Float32Array,
  output: Float32Array,
  from: Space,
  to: Space,
): void {
  const fromId = IDS[from];
  const toId = IDS[to];
  DISPATCH[fromId * COUNT + toId](input, output);
}
