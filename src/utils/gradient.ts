import type { Color, Space } from '../lib/types';
import { dropColor } from '../api/color';
import { formatCss } from '../api/format';
import { createScales } from './palette';

export type GradientType = 'linear' | 'radial' | 'conic';

export type GradientStop = Readonly<{
  color: Color<Space>;
  position?: number;
}>;

const buildStops = (stops: ReadonlyArray<GradientStop | Color<Space>>, steps?: number): string => {
  const len = stops.length;
  if (len === 0) return '';

  let result = '';
  for (let i = 0; i < len; i++) {
    const item = stops[i];

    const isStop = 'color' in item;
    const color = isStop ? item.color : item;
    let pos = isStop ? item.position : undefined;

    if (pos === undefined && steps !== undefined) {
      pos = steps === 1 ? 50 : (i / (steps - 1)) * 100;
    }

    const colorStr = formatCss(color);
    result += colorStr;

    if (pos !== undefined) {
      result += ` ${Number.isInteger(pos) ? pos : pos.toFixed(2)}%`;
    }

    if (i < len - 1) result += ', ';
  }
  return result;
};

export function createLinearGradient(stops: ReadonlyArray<GradientStop>, angle = 180): string {
  return `linear-gradient(${angle}deg, ${buildStops(stops)})`;
}

export function createRadialGradient(
  stops: ReadonlyArray<GradientStop>,
  shape = 'ellipse',
  position = 'center',
): string {
  return `radial-gradient(${shape} at ${position}, ${buildStops(stops)})`;
}

export function createConicGradient(
  stops: ReadonlyArray<GradientStop>,
  angle = 0,
  position = 'center',
): string {
  return `conic-gradient(from ${angle}deg at ${position}, ${buildStops(stops)})`;
}

export function createSmoothGradient(
  start: Color<Space>,
  end: Color<Space>,
  steps: number,
  type: GradientType = 'linear',
  options?: Readonly<{ angle?: number; shape?: 'circle' | 'ellipse'; position?: string }>,
): string {
  if (steps <= 0) return '';

  const shades = createScales([start, end], steps);
  const stopsStr = buildStops(shades, steps);

  let result = '';
  const { angle = 180, shape = 'ellipse', position = 'center' } = options ?? {};

  switch (type) {
    case 'linear':
      result = `linear-gradient(${angle}deg, ${stopsStr})`;
      break;
    case 'radial':
      result = `radial-gradient(${shape} at ${position}, ${stopsStr})`;
      break;
    case 'conic':
      result = `conic-gradient(from ${angle}deg at ${position}, ${stopsStr})`;
      break;
  }

  for (let i = 0; i < shades.length; i++) {
    dropColor(shades[i]);
  }

  return result;
}

export function createMultiColorGradient(
  colors: ReadonlyArray<Color<Space>>,
  type: GradientType = 'linear',
  options?: Readonly<{ angle?: number; shape?: 'circle' | 'ellipse'; position?: string }>,
): string {
  const len = colors.length;
  if (len === 0) throw new Error('at least two colors are required');
  if (len === 1) return formatCss(colors[0]);

  const stopsStr = buildStops(colors, len);
  const { angle = 180, shape = 'ellipse', position = 'center' } = options ?? {};

  switch (type) {
    case 'linear':
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    case 'radial':
      return `radial-gradient(${shape} at ${position}, ${stopsStr})`;
    case 'conic':
      return `conic-gradient(from ${angle}deg at ${position}, ${stopsStr})`;
    default:
      return '';
  }
}
