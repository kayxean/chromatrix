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

const BUFFER_A = new Float32Array(3);
const BUFFER_B = new Float32Array(3);

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

const OPTIMIZED_PLANS: ConvertFn[] = Array.from(
  { length: COUNT * COUNT },
  () => (input, output) => {
    output[0] = input[0];
    output[1] = input[1];
    output[2] = input[2];
  },
);

function resolvePath(from: Space, to: Space): ConvertFn[] {
  const queue: { space: Space; path: ConvertFn[] }[] = [{ space: from, path: [] }];
  const visited = new Set<Space>([from]);
  let head = 0;

  while (head < queue.length) {
    const { space, path } = queue[head++];
    if (space === to) return path;

    const matrix = MATRICES[space];
    const connections: [Space, ConvertFn][] = [];

    if (matrix.direct) {
      for (const target in matrix.direct) {
        connections.push([target as Space, matrix.direct[target as Space]!]);
      }
    }

    connections.push([matrix.hub, matrix.source]);

    for (let i = 0; i < COUNT; i++) {
      const key = SPACES[i];
      if (MATRICES[key].hub === space) {
        connections.push([key, MATRICES[key].target]);
      }
    }

    for (let i = 0; i < connections.length; i++) {
      const [next, fn] = connections[i];
      if (!visited.has(next)) {
        visited.add(next);
        queue.push({ space: next, path: [...path, fn] });
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

      const to = SPACES[j];
      const idx = i * COUNT + j;
      const path = resolvePath(from, to);
      const len = path.length;

      if (len === 1) {
        OPTIMIZED_PLANS[idx] = path[0];
      } else if (len === 2) {
        const f0 = path[0];
        const f1 = path[1];
        OPTIMIZED_PLANS[idx] = (input, output) => {
          f0(input, BUFFER_A);
          f1(BUFFER_A, output);
        };
      } else if (len === 3) {
        const f0 = path[0];
        const f1 = path[1];
        const f2 = path[2];
        OPTIMIZED_PLANS[idx] = (input, output) => {
          f0(input, BUFFER_A);
          f1(BUFFER_A, BUFFER_B);
          f2(BUFFER_B, output);
        };
      } else {
        OPTIMIZED_PLANS[idx] = (input, output) => {
          let currentIn = input;
          for (let k = 0; k < len - 1; k++) {
            const currentOut = k % 2 === 0 ? BUFFER_A : BUFFER_B;
            path[k](currentIn, currentOut);
            currentIn = currentOut;
          }
          path[len - 1](currentIn, output);
        };
      }
    }
  }
  Object.seal(OPTIMIZED_PLANS);
})();

export function convertColor<S extends Space, T extends Space>(
  input: Float32Array,
  output: Float32Array,
  from: S,
  to: T,
): void {
  OPTIMIZED_PLANS[IDS[from] * COUNT + IDS[to]](input, output);
}
