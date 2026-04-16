import type { Space } from '../lib/types';
import { MATRICES } from '../lib/map';

interface PathStep {
  fn: (input: Float32Array, output: Float32Array) => void;
}

const PATH_CACHE = new Map<string, PathStep[]>();

const SCRATCH_A = new Float32Array(4);
const SCRATCH_B = new Float32Array(4);

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

  const cacheKey = `${from}:${to}`;
  let path = PATH_CACHE.get(cacheKey);

  if (!path) {
    path = computePath(from, to);
    PATH_CACHE.set(cacheKey, path);
  }

  const len = path.length;
  if (len === 1) {
    path[0].fn(input, output);
  } else {
    let src = input;
    for (let i = 0; i < len; i++) {
      const isLast = i === len - 1;
      const dst = isLast ? output : i % 2 === 0 ? SCRATCH_A : SCRATCH_B;

      path[i].fn(src, dst);
      src = dst;
    }
  }
}

function computePath(from: Space, to: Space): PathStep[] {
  const forwardChain = buildChainToHub(from);
  const reverseChain = buildChainToHub(to);

  const forwardSet = new Set<Space>(forwardChain);
  let meetAt: Space | undefined;

  for (const node of reverseChain) {
    if (forwardSet.has(node)) {
      meetAt = node;
      break;
    }
  }

  if (!meetAt) {
    throw new Error(`No conversion path from "${from}" to "${to}"`);
  }

  const upPath = forwardChain.slice(0, forwardChain.indexOf(meetAt) + 1);
  const downPath = reverseChain.slice(0, reverseChain.indexOf(meetAt)).toReversed();
  const fullPath: Space[] = [...upPath, ...downPath];

  const steps: PathStep[] = [];

  for (let i = 0; i < fullPath.length - 1; i++) {
    const curr = fullPath[i];
    const next = fullPath[i + 1];

    const currMatrix = MATRICES[curr];

    const directFn = currMatrix.direct ? currMatrix.direct[next] : undefined;

    if (directFn) {
      steps.push({ fn: directFn });
    } else if (currMatrix.hub === next) {
      steps.push({ fn: currMatrix.source });
    } else {
      const nextMatrix = MATRICES[next];
      if (nextMatrix.hub === curr) {
        steps.push({ fn: nextMatrix.target });
      } else {
        throw new Error(`Gap in conversion graph: ${curr} -> ${next}`);
      }
    }
  }

  return steps;
}

function buildChainToHub(start: Space): Space[] {
  const chain: Space[] = [];
  let current: Space = start;

  while (true) {
    chain.push(current);
    if (current === 'xyz65') break;

    const matrix = MATRICES[current];
    const { hub } = matrix;

    if (!hub || hub === current) break;
    current = hub;
  }

  return chain;
}
