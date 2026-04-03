import type {
  Color,
  GradientStop,
  LinearGradientOptions,
  RadialGradientOptions,
  ConicGradientOptions,
  GradientType,
} from '../types';
import { formatCss } from '../format';
import { dropColor } from '../shared';
import { createShades } from './palette';

function buildStops(stops: GradientStop[]): string {
  return stops
    .map((stop) => {
      const colorStr = formatCss(stop.color);
      return stop.position !== undefined ? `${colorStr} ${stop.position}%` : colorStr;
    })
    .join(', ');
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
  const shades = createShades(start, end, steps);
  const stops: GradientStop[] = shades.map((color, i) => ({
    color,
    position: steps === 1 ? 50 : (i / (steps - 1)) * 100,
  }));

  let result: string;
  if (type === 'linear') {
    result = createLinearGradient({ angle: options?.angle, stops });
  } else if (type === 'radial') {
    result = createRadialGradient({
      shape: options?.shape,
      position: options?.position,
      stops,
    });
  } else {
    result = createConicGradient({ angle: options?.angle, position: options?.position, stops });
  }

  shades.forEach(dropColor);

  return result;
}

export function createMultiColorGradient(
  colors: Color[],
  type: GradientType = 'linear',
  options?: { angle?: number; shape?: 'circle' | 'ellipse'; position?: string },
): string {
  if (colors.length === 0) {
    throw new Error('at least two colors are required');
  }

  if (colors.length === 1) {
    return formatCss(colors[0]);
  }

  const stops: GradientStop[] = colors.map((color, i) => ({
    color,
    position: (i / (colors.length - 1)) * 100,
  }));

  if (type === 'linear') {
    return createLinearGradient({ angle: options?.angle, stops });
  }

  if (type === 'radial') {
    return createRadialGradient({
      shape: options?.shape,
      position: options?.position,
      stops,
    });
  }

  return createConicGradient({ angle: options?.angle, position: options?.position, stops });
}
