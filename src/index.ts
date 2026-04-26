export type * from './lib/types';

export { convertColor } from './api/convert';
export { parseColor } from './api/parse';
export { formatCss } from './api/format';
export {
  createMatrix,
  dropMatrix,
  createColor,
  dropColor,
  cloneColor,
  deriveColor,
  mutateColor,
  mountMatrix,
  clearMatrix,
  countMatrix,
} from './api/color';
