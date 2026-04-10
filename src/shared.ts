import type { Color, Space } from './types';
import { convertColor } from './convert';
import { cloneColor, createMatrix } from './matrix';

export function mutateColor<S extends Space>(color: Color<S>, to: S): void {
  const from = color.space;
  if (from === to) return;

  convertColor(color.value, color.value, from, to);
  color.space = to;
}

export function deriveColor<S extends Space>(color: Color<S>, to: S): Color<S> {
  if (color.space === to) {
    return cloneColor(color);
  }

  const newValue = createMatrix();
  convertColor(color.value, newValue, color.space, to);

  return {
    space: to,
    value: newValue,
    alpha: color.alpha,
  };
}
