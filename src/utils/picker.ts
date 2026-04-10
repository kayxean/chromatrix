import type { Color, Space } from '../types';
import { convertColor } from '../convert';
import { createMatrix, dropMatrix } from '../matrix';

export interface PickerValue {
  h: number;
  s: number;
  v: number;
  a: number;
}

export type PickerSubscriber = (val: PickerValue, color: Color) => void;

export function toPicker(color: Color): PickerValue {
  const hsv = createMatrix();
  try {
    convertColor(color.value, hsv, color.space, 'hsv');
    return {
      h: hsv[0],
      s: hsv[1],
      v: hsv[2],
      a: color.alpha ?? 1,
    };
  } finally {
    dropMatrix(hsv);
  }
}

export function fromPicker<S extends Space>(val: PickerValue, space: S): Color {
  const hsv = createMatrix();
  hsv[0] = val.h;
  hsv[1] = val.s;
  hsv[2] = val.v;

  const dest = createMatrix();
  convertColor(hsv, dest, 'hsv', space);
  dropMatrix(hsv);

  return { space, value: dest, alpha: val.a };
}

export function createPicker(init: Color, target?: Space) {
  const val: PickerValue = toPicker(init);
  let space: Space = target ?? init.space;
  const subs = new Set<PickerSubscriber>();
  const workerHsv = createMatrix();
  const sharedColor: Color = {
    space,
    value: createMatrix(),
    alpha: val.a,
  };

  const notify = () => {
    workerHsv[0] = val.h;
    workerHsv[1] = val.s;
    workerHsv[2] = val.v;

    convertColor(workerHsv, sharedColor.value, 'hsv', space);
    sharedColor.space = space;
    sharedColor.alpha = val.a;

    const snap: PickerValue = { ...val };
    subs.forEach((fn) => {
      fn(snap, sharedColor);
    });
  };
  notify();

  return {
    update: (x: number, y: number, type: 'sv' | 'h' | 'a') => {
      let changed = false;
      if (type === 'sv' && (val.s !== x || val.v !== y)) {
        val.s = x;
        val.v = y;
        changed = true;
      } else if (type === 'h' && val.h !== x * 360) {
        val.h = x * 360;
        changed = true;
      } else if (type === 'a' && val.a !== x) {
        val.a = x;
        changed = true;
      }
      if (changed) notify();
    },

    assign: (next: Color) => {
      const nextVal = toPicker(next);

      if (nextVal.s < 0.001 || nextVal.v < 0.001) {
        nextVal.h = val.h;
      }

      const hasChanged =
        Math.abs(nextVal.h - val.h) > 0.01 ||
        Math.abs(nextVal.s - val.s) > 0.001 ||
        Math.abs(nextVal.v - val.v) > 0.001 ||
        nextVal.a !== val.a ||
        next.space !== space;

      if (!hasChanged) return;
      const { space: nextSpace } = next;
      space = nextSpace;
      val.h = nextVal.h;
      val.s = nextVal.s;
      val.v = nextVal.v;
      val.a = nextVal.a;
      notify();
    },

    subscribe: (fn: PickerSubscriber) => {
      subs.add(fn);
      fn({ ...val }, sharedColor);
      return () => subs.delete(fn);
    },

    setSpace: (nextSpace: Space) => {
      if (nextSpace === space) return;
      dropMatrix(sharedColor.value);
      sharedColor.value = createMatrix();
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
      dropMatrix(workerHsv);
      dropMatrix(sharedColor.value);
      subs.clear();
    },
  };
}
