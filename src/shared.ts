import type { Color, ColorSpace } from './types';
import { convertColor } from './convert';
import { createMatrix, cloneColor } from './matrix';

export function mutateColor<S extends ColorSpace>(color: Color, to: S): void {
  const from = color.space;
  if (from === (to as ColorSpace)) return;

  convertColor(color.value, color.value, from, to);

  (color as { space: ColorSpace }).space = to;
}

export function deriveColor<S extends ColorSpace>(color: Color, to: S): Color<S> {
  if (color.space === (to as ColorSpace)) {
    return cloneColor(color as Color<S>);
  }

  const newValue = createMatrix(to);
  convertColor(color.value, newValue, color.space, to);

  return {
    space: to,
    value: newValue,
    alpha: color.alpha,
  };
}
