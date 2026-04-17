import type { Space } from '../lib/types';
import { MATRICES } from '../lib/map';

type ConvertFn = (input: Float32Array, output: Float32Array) => void;

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
];

const COUNT = SPACES.length;

const IDS: Record<Space, number> = {
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
};

const JUMP_PLANS: (readonly ConvertFn[])[] = Array.from({ length: COUNT * COUNT }, () => []);

function resolvePath(from: Space, to: Space): ConvertFn[] {
  const queue: { space: Space; path: ConvertFn[] }[] = [{ space: from, path: [] }];
  const visited = new Set<Space>([from]);
  let head = 0;
  let tail = 1;

  while (head < tail) {
    const { space, path } = queue[head++];
    if (space === to) return path;

    const matrix = MATRICES[space];
    const neighbors: Space[] = [];
    const neighborFns: ConvertFn[] = [];
    let nIdx = 0;

    if (matrix.direct) {
      for (const target in matrix.direct) {
        const targetSpace = target as Space;
        neighbors[nIdx] = targetSpace;
        neighborFns[nIdx] = matrix.direct[targetSpace]!;
        nIdx++;
      }
    }

    neighbors[nIdx] = matrix.hub;
    neighborFns[nIdx] = matrix.source;
    nIdx++;

    for (let i = 0; i < COUNT; i++) {
      const key = SPACES[i];
      if (MATRICES[key].hub === space) {
        neighbors[nIdx] = key;
        neighborFns[nIdx] = MATRICES[key].target;
        nIdx++;
      }
    }

    for (let i = 0; i < nIdx; i++) {
      const next = neighbors[i];
      if (!visited.has(next)) {
        visited.add(next);
        queue[tail++] = { space: next, path: [...path, neighborFns[i]] };
      }
    }
  }
  return [];
}

(function compile(): void {
  for (let i = 0; i < COUNT; i++) {
    const from = SPACES[i];
    for (let j = 0; j < COUNT; j++) {
      if (i === j) continue;
      JUMP_PLANS[i * COUNT + j] = resolvePath(from, SPACES[j]);
    }
  }
})();

export function convertColor<S extends Space, T extends Space>(
  input: Float32Array,
  output: Float32Array,
  from: S,
  to: T,
): void {
  if (from === (to as string)) {
    output.set(input);
    return;
  }

  const plan = JUMP_PLANS[IDS[from] * COUNT + IDS[to]];
  const len = plan.length;

  if (len === 1) {
    plan[0](input, output);
    return;
  }

  const bufA = new Float32Array(3);
  const bufB = new Float32Array(3);

  let currentIn = input;
  for (let i = 0; i < len - 1; i++) {
    const currentOut = i % 2 === 0 ? bufA : bufB;
    plan[i](currentIn, currentOut);
    currentIn = currentOut;
  }
  plan[len - 1](currentIn, output);
}
