import type { Space } from '../lib/types';
import { MATRICES } from '../lib/map';

const SCRATCH = new Float32Array(3);

export function convertColor<S extends Space, T extends Space>(
  input: Float32Array,
  output: Float32Array,
  from: S,
  to: T,
): void {
  if (from === (to as string)) {
    if (input !== output) output.set(input);
    return;
  }

  const fromMatrix = MATRICES[from];
  const shortcut = fromMatrix.direct?.[to];
  if (shortcut) {
    shortcut(input, output);
    return;
  }

  let current: Space = from;

  fromMatrix.source(input, SCRATCH);
  current = fromMatrix.hub;

  while (current !== (to as string)) {
    const m = MATRICES[current];

    const jump = m.direct?.[to];
    if (jump) {
      jump(SCRATCH, output);
      return;
    }

    if (MATRICES[to].hub === current) {
      MATRICES[to].target(SCRATCH, output);
      return;
    }

    if (
      (current === 'xyz50' && MATRICES[to].hub === 'xyz65') ||
      (current === 'xyz65' && MATRICES[to].hub === 'xyz50')
    ) {
      m.source(SCRATCH, SCRATCH);
      current = m.hub;
      continue;
    }

    m.source(SCRATCH, SCRATCH);
    current = m.hub;
  }

  output.set(SCRATCH);
}
