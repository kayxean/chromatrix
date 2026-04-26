import type { Color, Space } from '../lib/types';
import { cloneColor, dropColor, mutateColor } from '../api/color';

export type PickerFn = <S extends Space>(hsv: Color<S>) => void;

const handleUpdate = <S extends Space>(
  hsv: Color<S>,
  x: number,
  y: number,
  type: 'sv' | 'h' | 'a',
): boolean => {
  const v = hsv.value;
  if (type === 'sv') {
    if (Math.abs(v[1] - x) < 0.001 && Math.abs(v[2] - y) < 0.001) return false;
    v[1] = x;
    v[2] = y;
    return true;
  }
  if (type === 'h') {
    const nextH = x * 360;
    if (Math.abs(v[0] - nextH) < 0.1) return false;
    v[0] = nextH;
    return true;
  }
  if (type === 'a') {
    if (Math.abs(hsv.alpha - x) < 0.001) return false;
    hsv.alpha = x;
    return true;
  }
  return false;
};

const handleChannel = <S extends Space>(
  hsv: Color<S>,
  value: number,
  type: 'h' | 's' | 'v' | 'a',
): boolean => {
  const v = hsv.value;
  const eps = type === 'h' ? 0.1 : 0.001;

  if (type === 'a') {
    if (Math.abs(hsv.alpha - value) < eps) return false;
    hsv.alpha = value;
    return true;
  }

  const idx = type === 'h' ? 0 : type === 's' ? 1 : 2;
  if (Math.abs(v[idx] - value) < eps) return false;
  v[idx] = value;
  return true;
};

const handleAssign = <S extends Space>(hsv: Color<S>, next: Color<Space>): boolean => {
  const temp = cloneColor(next);
  mutateColor(temp, hsv.space);

  const nV = temp.value;
  const hV = hsv.value;

  const hasChanged =
    Math.abs(nV[1] - hV[1]) > 0.001 ||
    Math.abs(nV[2] - hV[2]) > 0.001 ||
    Math.abs(temp.alpha - hsv.alpha) > 0.001;

  const sig = nV[1] > 0.01 && nV[2] > 0.01;
  const hueChanged = sig && Math.abs(nV[0] - hV[0]) > 0.1;

  if (hasChanged || hueChanged) {
    if (sig) hV[0] = nV[0];
    hV[1] = nV[1];
    hV[2] = nV[2];
    hsv.alpha = temp.alpha;
    dropColor(temp);
    return true;
  }

  dropColor(temp);
  return false;
};

export function createPicker(color: Color<Space>) {
  const hsv = cloneColor(color);
  mutateColor(hsv, 'hsv');

  const subs = new Set<PickerFn>();
  const notify = () => {
    subs.forEach((fn) => {
      fn(hsv);
    });
  };

  return {
    update: (x: number, y: number, type: 'sv' | 'h' | 'a') => {
      if (handleUpdate(hsv, x, y, type)) notify();
    },
    assign: (next: Color<Space>) => {
      if (handleAssign(hsv, next)) notify();
    },
    setHue: (h: number) => {
      if (handleChannel(hsv, h, 'h')) notify();
    },
    setSaturation: (s: number) => {
      if (handleChannel(hsv, s, 's')) notify();
    },
    setValue: (v: number) => {
      if (handleChannel(hsv, v, 'v')) notify();
    },
    setAlpha: (a: number) => {
      if (handleChannel(hsv, a, 'a')) notify();
    },
    subscribe: (fn: PickerFn) => {
      subs.add(fn);
      fn(hsv);
      return () => subs.delete(fn);
    },
    getState: () => hsv,
    getValue: () => ({
      h: hsv.value[0],
      s: hsv.value[1],
      v: hsv.value[2],
      a: hsv.alpha,
    }),
    getHue: () => hsv.value[0],
    getSaturation: () => hsv.value[1],
    getBrightness: () => hsv.value[2],
    getAlpha: () => hsv.alpha,
    getColor: () => cloneColor(hsv),
    getSolid: () => {
      const solid = cloneColor(hsv);
      solid.alpha = 1;
      return solid;
    },
    dispose: () => {
      dropColor(hsv);
      subs.clear();
    },
  };
}
