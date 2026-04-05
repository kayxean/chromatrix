import type {
  Color,
  GradientStop,
  LinearGradientOptions,
  RadialGradientOptions,
  ConicGradientOptions,
  GradientType,
} from '../types';
import { formatCss } from '../format';
import { dropColor } from '../matrix';
import { createShades } from './palette';

function buildStops(stops: GradientStop[]): string {
  const len = stops.length;
  if (len === 0) return '';

  let result = '';
  for (let i = 0; i < len; i++) {
    const { color, position } = stops[i];
    const colorStr = formatCss(color);

    result +=
      position !== undefined
        ? `${colorStr} ${Number.isInteger(position) ? position : position.toFixed(2)}%`
        : colorStr;

    if (i < len - 1) result += ', ';
  }
  return result;
}

export function createLinearGradient(options: LinearGradientOptions): string {
  const { angle = 180, stops } = options;
  return `linear-gradient(${angle}deg, ${buildStops(stops)})`;
}

export function createRadialGradient(options: RadialGradientOptions): string {
  const { shape = 'ellipse', position = 'center', stops } = options;
  return `radial-gradient(${shape} at ${position}, ${buildStops(stops)})`;
}

export function createConicGradient(options: ConicGradientOptions): string {
  const { angle = 0, position = 'center', stops } = options;
  return `conic-gradient(from ${angle}deg at ${position}, ${buildStops(stops)})`;
}

export function createSmoothGradient(
  start: Color,
  end: Color,
  steps: number,
  type: GradientType = 'linear',
  options?: { angle?: number; shape?: 'circle' | 'ellipse'; position?: string },
): string {
  if (steps <= 0) return '';

  const shades = createShades(start, end, steps);

  try {
    const stops: GradientStop[] = shades.map((color, i) => ({
      color,
      position: steps === 1 ? 50 : (i / (steps - 1)) * 100,
    }));

    switch (type) {
      case 'linear':
        return createLinearGradient({ angle: options?.angle ?? 180, stops });
      case 'radial':
        return createRadialGradient({
          shape: options?.shape ?? 'ellipse',
          position: options?.position ?? 'center',
          stops,
        });
      case 'conic':
        return createConicGradient({
          angle: options?.angle ?? 0,
          position: options?.position ?? 'center',
          stops,
        });
      default:
        return '';
    }
  } finally {
    for (const color of shades) {
      dropColor(color);
    }
  }
}

export function createMultiColorGradient(
  colors: Color[],
  type: GradientType = 'linear',
  options?: { angle?: number; shape?: 'circle' | 'ellipse'; position?: string },
): string {
  const len = colors.length;

  if (len === 0) throw new Error('at least two colors are required');
  if (len === 1) return formatCss(colors[0]);

  const stops: GradientStop[] = colors.map((color, i) => ({
    color,
    position: (i / (len - 1)) * 100,
  }));

  switch (type) {
    case 'linear':
      return createLinearGradient({ angle: options?.angle ?? 180, stops });
    case 'radial':
      return createRadialGradient({
        shape: options?.shape ?? 'ellipse',
        position: options?.position ?? 'center',
        stops,
      });
    case 'conic':
      return createConicGradient({
        angle: options?.angle ?? 0,
        position: options?.position ?? 'center',
        stops,
      });
    default:
      return '';
  }
}
