import type { Color, ColorSpace } from '../types';
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
  const hsv = createMatrix('hsv');
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

export function fromPicker<S extends ColorSpace>(val: PickerValue, space: S): Color {
  const hsv = createMatrix('hsv');
  hsv[0] = val.h;
  hsv[1] = val.s;
  hsv[2] = val.v;

  const dest = createMatrix(space);
  convertColor(hsv, dest, 'hsv', space);
  dropMatrix(hsv);

  return { space, value: dest, alpha: val.a };
}

export function createPicker(init: Color, target?: ColorSpace) {
  const val: PickerValue = toPicker(init);
  let space: ColorSpace = target ?? init.space;
  const subs = new Set<PickerSubscriber>();

  const workerHsv = createMatrix('hsv');
  const sharedColor: Color = {
    space,
    value: createMatrix(space),
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

    for (const fn of subs) {
      fn(snap, sharedColor);
    }
  };

  notify();

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

      const isAchromatic = nextVal.s < 0.001 || nextVal.v < 0.001;
      if (isAchromatic) {
        nextVal.h = val.h;
      }

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
      fn({ ...val }, sharedColor);
      return () => subs.delete(fn);
    },

    setSpace: (nextSpace: ColorSpace) => {
      if (nextSpace === space) return;

      if (nextSpace !== space) {
        dropMatrix(sharedColor.value);
        sharedColor.value = createMatrix(nextSpace);
      }

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
