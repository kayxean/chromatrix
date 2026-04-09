export * from './types';

export { convertColor, convertHue } from './convert';
export { parseColor } from './parse';
export { formatCss } from './format';

export {
  createMatrix,
  dropMatrix,
  createColor,
  dropColor,
  cloneColor,
  mountMatrix,
  clearMatrix,
  countMatrix,
} from './matrix';

export { mutateColor, deriveColor } from './shared';
