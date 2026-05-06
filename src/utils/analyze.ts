import { cloneColor, createMatrix, deriveColor, dropColor, mutateColor } from '../api/color';
import { convertColor } from '../api/convert';
import type { Color, Space } from '../lib/types';

const pq = (v: number): number => {
  const v_pow = v ** (1 / 78.84375);
  const num = Math.max(v_pow - 0.8359375, 0);
  const den = 18.8515625 - 18.6875 * v_pow;
  return (num / den) ** (1 / 0.1593017578125);
};

const calculateItp = (xyz: Float32Array): [number, number, number] => {
  const X = xyz[0];
  const Y = xyz[1];
  const Z = xyz[2];

  const L = 0.3522 * X + 0.758 * Y - 0.1102 * Z;
  const M = -0.2637 * X + 1.1163 * Y + 0.1474 * Z;
  const S = 0.0433 * X + 0.1909 * Y + 1.0263 * Z;

  const l_pq = pq(Math.max(L, 0));
  const m_pq = pq(Math.max(M, 0));
  const s_pq = pq(Math.max(S, 0));

  const I = 0.5 * l_pq + 0.5 * m_pq;
  const Ct = 1.6137 * l_pq - 3.3234 * m_pq + 1.7097 * s_pq;
  const Cp = 4.3781 * l_pq - 4.2455 * m_pq - 0.1325 * s_pq;

  return [I, Ct, Cp];
};

const getItpDistance = (colorA: Color<Space>, colorB: Color<Space>): number => {
  mutateColor(colorA, 'xyz65');
  mutateColor(colorB, 'xyz65');

  const v1 = colorA.value;
  const v2 = colorB.value;

  const c1 = calculateItp(v1);
  const c2 = calculateItp(v2);

  const dI = c1[0] - c2[0];
  const dCt = c1[1] - c2[1];
  const dCp = c1[2] - c2[2];

  return 720 * Math.sqrt(dI * dI + 0.25 * (dCt * dCt) + dCp * dCp);
};

const getDeltaE = (colorA: Color<Space>, colorB: Color<Space>): number => {
  mutateColor(colorA, 'lab');
  mutateColor(colorB, 'lab');

  const v1 = colorA.value;
  const v2 = colorB.value;

  const L1 = v1[0];
  const a1 = v1[1];
  const b1 = v1[2];
  const L2 = v2[0];
  const a2 = v2[1];
  const b2 = v2[2];

  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const mC7 = ((C1 + C2) / 2) ** 7;
  const G = 0.5 * (1 - Math.sqrt(mC7 / (mC7 + 6103515625)));

  const a1p = a1 * (1 + G);
  const a2p = a2 * (1 + G);
  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);

  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const h1p = (Math.atan2(b1, a1p) * deg + 360) % 360;
  const h2p = (Math.atan2(b2, a2p) * deg + 360) % 360;

  const dLp = L2 - L1;
  const dCp = C2p - C1p;
  let dhp = 0;
  const C1pC2p = C1p * C2p;

  if (C1pC2p > 0) {
    dhp = h2p - h1p;
    if (Math.abs(dhp) > 180) {
      dhp += h2p <= h1p ? 360 : -360;
    }
  }

  const dHp = 2 * Math.sqrt(C1pC2p) * Math.sin((dhp * rad) / 2);
  const mLp = (L1 + L2) / 2;
  const mCp = (C1p + C2p) / 2;
  let mHp = h1p + h2p;

  if (C1pC2p > 0) {
    if (Math.abs(h1p - h2p) > 180) {
      mHp += h1p + h2p < 360 ? 360 : -360;
    }
    mHp /= 2;
  }

  const T =
    1 -
    0.17 * Math.cos((mHp - 30) * rad) +
    0.24 * Math.cos(2 * mHp * rad) +
    0.32 * Math.cos((3 * mHp + 6) * rad) -
    0.2 * Math.cos((4 * mHp - 63) * rad);

  const SL = 1 + (0.015 * (mLp - 50) ** 2) / Math.sqrt(20 + (mLp - 50) ** 2);
  const SC = 1 + 0.045 * mCp;
  const SH = 1 + 0.015 * mCp * T;
  const mCp7 = mCp ** 7;
  const RC = 2 * Math.sqrt(mCp7 / (mCp7 + 6103515625));
  const RT = -RC * Math.sin(2 * (30 * Math.exp(-(((mHp - 275) / 25) ** 2))) * rad);

  return Math.sqrt(
    (dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH),
  );
};

const getOklabDistance = (colorA: Color<Space>, colorB: Color<Space>): number => {
  mutateColor(colorA, 'oklab');
  mutateColor(colorB, 'oklab');

  const a = colorA.value;
  const b = colorB.value;
  const dL = a[0] - b[0];
  const da = a[1] - b[1];
  const db = a[2] - b[2];

  return Math.sqrt(dL * dL + da * da + db * db);
};

export function getDistance(
  colorA: Color<Space>,
  colorB: Color<Space>,
  method: 'oklab' | 'deltaE2000' | 'itp' = 'oklab',
): number {
  if (method === 'oklab') {
    return getOklabDistance(colorA, colorB);
  }
  if (method === 'itp') {
    return getItpDistance(colorA, colorB);
  }
  return getDeltaE(colorA, colorB);
}

export function sortColors(
  colors: Readonly<Color<Space>[]>,
  by: 'luminance' | 'hue' | 'chroma' | 'distance',
  target?: Color<Space>,
): Color<Space>[] {
  if (by === 'distance' && !target) {
    return [...colors];
  }

  const space = by === 'distance' ? 'oklab' : 'oklch';
  const propIdx = by === 'luminance' ? 0 : by === 'chroma' ? 1 : 2;

  let t0 = 0;
  let t1 = 0;
  let t2 = 0;
  if (by === 'distance' && target) {
    mutateColor(target, 'oklab');
    t0 = target.value[0];
    t1 = target.value[1];
    t2 = target.value[2];
  }

  const map = [];
  for (let i = 0; i < colors.length; i++) {
    const c = colors[i];
    mutateColor(c, space);

    let key = 0;
    if (by === 'distance') {
      const v = c.value;
      key = (v[0] - t0) ** 2 + (v[1] - t1) ** 2 + (v[2] - t2) ** 2;
    } else {
      key = c.value[propIdx];
    }

    map.push({ key, color: c });
  }

  map.sort((a, b) => a.key - b.key);

  const result: Color<Space>[] = [];
  for (let i = 0; i < map.length; i++) {
    result.push(map[i].color);
  }

  return result;
}

export function averageColor(colors: Readonly<Color<Space>[]>): Color<Space> {
  const count = colors.length;
  if (count === 0) {
    return { space: 'oklab', value: createMatrix(), alpha: 1 };
  }

  let L = 0;
  let a = 0;
  let b = 0;
  let alpha = 0;

  for (let i = 0; i < count; i++) {
    const c = colors[i];
    mutateColor(c, 'oklab');

    const v = c.value;
    L += v[0];
    a += v[1];
    b += v[2];
    alpha += c.alpha;
  }

  const resValue = createMatrix();
  resValue[0] = L / count;
  resValue[1] = a / count;
  resValue[2] = b / count;

  return {
    space: 'oklab',
    value: resValue,
    alpha: alpha / count,
  };
}

export function adaptColor(
  color: Color<Space>,
  from: 'd65' | 'd50',
  to: 'd65' | 'd50',
): Color<Space> {
  if (from === to) {
    return cloneColor(color);
  }
  const target = to === 'd50' ? 'xyz50' : 'xyz65';

  const adapted = deriveColor(color, target);
  const result = deriveColor(adapted, color.space);

  dropColor(adapted);
  return result;
}

export function isEqual<S extends Space, T extends Space>(
  a: Color<S>,
  b: Color<T>,
  tolerance = 0.001,
): boolean {
  if ((a as unknown) === (b as unknown)) return true;

  if (Math.abs(a.alpha - b.alpha) > tolerance) return false;

  const vA = a.value;
  const vB = b.value;

  if ((a.space as string) === (b.space as string)) {
    const isPolar =
      a.space === 'oklch' || a.space === 'lch' || a.space === 'hsl' || a.space === 'hwb';

    if (isPolar) {
      const hIdx = a.space === 'hwb' ? 0 : 2;
      const dH = Math.abs(vA[hIdx] - vB[hIdx]) % 360;
      const hueDist = dH > 180 ? 360 - dH : dH;
      if (hueDist > 0.1) return false;

      for (let i = 0; i < 3; i++) {
        if (i === hIdx) continue;
        if (Math.abs(vA[i] - vB[i]) > tolerance) return false;
      }
      return true;
    }

    return (
      Math.abs(vA[0] - vB[0]) <= tolerance &&
      Math.abs(vA[1] - vB[1]) <= tolerance &&
      Math.abs(vA[2] - vB[2]) <= tolerance
    );
  }

  const temp = new Float32Array(3);
  convertColor(vB, temp, b.space, a.space);

  return (
    Math.abs(vA[0] - temp[0]) <= tolerance &&
    Math.abs(vA[1] - temp[1]) <= tolerance &&
    Math.abs(vA[2] - temp[2]) <= tolerance
  );
}
