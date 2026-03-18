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
  mutateColor,
  deriveColor,
  preallocatePool,
  clearPool,
} from './shared';

export { isEqual, getDistance } from './utils/compare';

export {
  checkContrast,
  matchContrast,
  checkContrastBulk,
  matchScales,
  getContrastRating,
} from './utils/contrast';

export { checkGamut, clampColor } from './utils/gamut';

export { createHarmony, createShades, createScales, mixColor } from './utils/palette';

export { createPicker, fromPicker, toPicker } from './utils/picker';

export { simulateDeficiency } from './utils/simulate';

export {
  findClosestName,
  getExactName,
  findSimilarNames,
  parseColorName,
} from './utils/naming';

export {
  createLinearGradient,
  createRadialGradient,
  createConicGradient,
  createSmoothGradient,
  createMultiColorGradient,
} from './utils/gradient';

export { createTheme, createDualTheme, convertTheme, dropTheme } from './utils/theme';
