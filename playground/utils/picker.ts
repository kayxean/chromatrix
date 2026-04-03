import type { Color, ColorSpace } from '../types';
import { convertColor } from '../convert';
import { createColor, dropColor, getSharedBuffer } from '../shared';

export interface PickerValue {
  h: number;
  s: number;
  v: number;
  a: number;
}

export type PickerSubscriber = (val: PickerValue, color: Color) => void;

export function toPicker(color: Color): PickerValue {
  const hsv = createColor('hsv', [color.value[0], color.value[1], color.value[2]]);
  convertColor(hsv, 'hsv');

  const buf = getSharedBuffer();
  const idx = hsv.index;

  const res = { h: buf[idx], s: buf[idx + 1], v: buf[idx + 2], a: color.alpha };

  dropColor(hsv);
  return res;
}

export function fromPicker<S extends ColorSpace>(val: PickerValue, space: S): Color {
  const hsv = createColor('hsv', [val.h, val.s, val.v]);
  convertColor(hsv, space);

  const buf = getSharedBuffer();
  const idx = hsv.index;

  const result = createColor(space, [buf[idx], buf[idx + 1], buf[idx + 2]], val.a);

  dropColor(hsv);
  return result;
}

export function createPicker(init: Color, target?: ColorSpace) {
  const val: PickerValue = toPicker(init);
  let space: ColorSpace = target ?? init.space;
  const subs = new Set<PickerSubscriber>();

  const sharedColor = createColor(space, [0, 0, 0], val.a);

  const notify = () => {
    const hsv = createColor('hsv', [val.h, val.s, val.v]);
    convertColor(hsv, space);

    const buf = getSharedBuffer();
    const hIdx = hsv.index;
    const sIdx = sharedColor.index;

    buf[sIdx] = buf[hIdx];
    buf[sIdx + 1] = buf[hIdx + 1];
    buf[sIdx + 2] = buf[hIdx + 2];

    const snap: PickerValue = { h: val.h, s: val.s, v: val.v, a: val.a };

    for (const fn of subs) {
      fn(snap, sharedColor);
    }

    dropColor(hsv);
  };

  return {
    update: (x: number, y: number, type: 'sv' | 'h' | 'a') => {
      let changed = false;
      if (type === 'sv') {
        if (val.s !== x || val.v !== y) {
          val.s = x;
          val.v = y;
          changed = true;
        }
      } else if (type === 'h') {
        const nextH = x * 360;
        if (val.h !== nextH) {
          val.h = nextH;
          changed = true;
        }
      } else if (type === 'a') {
        if (val.a !== x) {
          val.a = x;
          changed = true;
        }
      }

      if (changed) notify();
    },

    assign: (next: Color) => {
      const nextVal = toPicker(next);

      const isAchromatic = nextVal.s < 0.01 || nextVal.v < 0.01;
      if (isAchromatic) nextVal.h = val.h;

      const hasChanged =
        Math.abs(nextVal.h - val.h) > 0.01 ||
        Math.abs(nextVal.s - val.s) > 0.001 ||
        Math.abs(nextVal.v - val.v) > 0.001 ||
        nextVal.a !== val.a ||
        next.space !== space;

      if (!hasChanged) return;

      space = next.space;
      val.h = nextVal.h;
      val.s = nextVal.s;
      val.v = nextVal.v;
      val.a = nextVal.a;

      notify();
    },

    subscribe: (fn: PickerSubscriber) => {
      subs.add(fn);
      return () => {
        subs.delete(fn);
      };
    },

    setSpace: (nextSpace: ColorSpace) => {
      if (nextSpace === space) return;
      space = nextSpace;
      notify();
    },

    getValue: () => ({ ...val }),
    getSpace: () => space,
    getHue: () => val.h,
    getSaturation: () => val.s,
    getBrightness: () => val.v,
    getAlpha: () => val.a,

    getSolid: () => fromPicker({ ...val, a: 1 }, space),
    getColor: () => fromPicker(val, space),

    dispose: () => {
      dropColor(sharedColor);
      subs.clear();
    },
  };
}
