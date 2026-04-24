import type { Color, Space } from '../lib/types';

const I255 = 1 / 255;
const SCRATCH = new Uint8Array(256);
let cur = 0;

export function parseHex(b: Readonly<Uint8Array>, slen: number): Color<'rgb'> {
  const v = new Float32Array(3);
  const start = ++cur;

  while (
    cur < slen &&
    ((b[cur] >= 48 && b[cur] <= 57) || ((b[cur] | 32) >= 97 && (b[cur] | 32) <= 102))
  ) {
    cur++;
  }

  const hLen = cur - start;
  const wide = hLen >= 6;
  const step = wide ? 2 : 1;

  for (let i = 0; i < 3; i++) {
    const p = start + i * step;
    const c1 = b[p];
    const c2 = wide ? b[p + 1] : c1;
    v[i] = ((((c1 & 0xf) + (c1 > 64 ? 9 : 0)) << 4) | ((c2 & 0xf) + (c2 > 64 ? 9 : 0))) * I255;
  }

  let a = 1;
  if (hLen === 4 || hLen === 8) {
    const p = start + hLen - step;
    const c1 = b[p];
    const c2 = wide ? b[p + 1] : c1;
    a = ((((c1 & 0xf) + (c1 > 64 ? 9 : 0)) << 4) | ((c2 & 0xf) + (c2 > 64 ? 9 : 0))) * I255;
  }

  return { space: 'rgb', value: v, alpha: a };
}

export function parseCss(b: Readonly<Uint8Array>, slen: number, space: Space): Color<Space> {
  const v = new Float32Array(3);
  let alpha = 1;

  for (let idx = 0; idx < 4; idx++) {
    while (cur < slen && (b[cur] <= 32 || b[cur] === 44 || b[cur] === 47)) {
      cur++;
    }
    if (cur >= slen || b[cur] === 41) {
      break;
    }

    if (b[cur] === 110) {
      cur += 4;
      if (idx < 3) {
        v[idx] = NaN;
      } else {
        alpha = NaN;
      }
      continue;
    }

    let val = 0;
    let div = 1;
    let dot = false;
    const sign = b[cur] === 45 ? -1 : 1;
    if (b[cur] === 45 || b[cur] === 43) {
      cur++;
    }
    while (cur < slen) {
      const c = b[cur];
      if (c >= 48 && c <= 57) {
        if (dot) {
          val = val + (c - 48) / (div *= 10);
        } else {
          val = val * 10 + (c - 48);
        }
      } else if (c === 46) {
        dot = true;
      } else {
        break;
      }
      cur++;
    }

    const res = val * sign;
    const isPct = b[cur] === 37;
    while (cur < slen && b[cur] > 32 && b[cur] !== 44 && b[cur] !== 47 && b[cur] !== 41) {
      cur++;
    }

    if (idx === 3) {
      alpha = isPct ? res * 0.01 : res;
    } else if (idx === 0) {
      if (space === 'rgb') {
        v[0] = Number.isNaN(res) ? NaN : isPct ? res * 0.01 : res * I255;
      } else if (space === 'hsl' || space === 'hwb') {
        v[0] = res === 360 ? 360 : ((res % 360) + 360) % 360;
      } else if (space === 'oklch' || space === 'oklab') {
        v[0] = res * 0.01;
      } else if (isPct && space !== 'lab' && space !== 'lch') {
        v[0] = res * 0.01;
      } else {
        v[0] = res;
      }
    } else if (idx === 1) {
      if (space === 'rgb') {
        v[1] = Number.isNaN(res) ? NaN : isPct ? res * 0.01 : res * I255;
      } else if (
        space === 'hsl' ||
        space === 'hwb' ||
        (isPct && space !== 'lab' && space !== 'lch')
      ) {
        v[1] = res * 0.01;
      } else if (space === 'oklab' && isPct) {
        v[1] = res * 0.01;
      } else {
        v[1] = res;
      }
    } else {
      if (space === 'rgb') {
        v[2] = Number.isNaN(res) ? NaN : isPct ? res * 0.01 : res * I255;
      } else if (
        space === 'hsl' ||
        space === 'hwb' ||
        (isPct && space !== 'lab' && space !== 'lch')
      ) {
        v[2] = res * 0.01;
      } else if (space === 'oklch' || space === 'lch') {
        v[2] = res === 360 ? 360 : ((res % 360) + 360) % 360;
      } else {
        v[2] = res;
      }
    }
  }
  return { space, value: v, alpha };
}

export function parseColor(s: string): Color<Space> {
  const slen = s.length;
  const b = slen <= 256 ? SCRATCH : new Uint8Array(slen);
  for (let k = 0; k < slen; k++) {
    b[k] = s.codePointAt(k) ?? 0;
  }

  cur = 0;
  while (cur < slen && b[cur] <= 32) {
    cur++;
  }
  if (b[cur] === 35) {
    return parseHex(b, slen);
  }

  const nS = cur;
  while (cur < slen && b[cur] !== 40 && b[cur] > 32) {
    cur++;
  }
  const c0 = b[nS];
  const c1 = b[nS + 1];
  const c2 = b[nS + 2];

  while (cur < slen && b[cur] !== 40) {
    cur++;
  }
  cur++;

  if (c0 === 114) {
    return parseCss(b, slen, 'rgb');
  }
  if (c0 === 104) {
    return parseCss(b, slen, c2 === 98 ? 'hwb' : 'hsl');
  }
  if (c0 === 108) {
    return parseCss(b, slen, c1 === 99 ? 'lch' : 'lab');
  }
  if (c0 === 111) {
    const space = b[nS + 4] === 104 ? 'oklch' : 'oklab';
    return parseCss(b, slen, space);
  }
  if (c0 === 99) {
    while (cur < slen && b[cur] <= 32) {
      cur++;
    }
    const tS = cur;
    while (cur < slen && b[cur] > 32) {
      cur++;
    }
    const char0 = b[tS];
    while (cur < slen && b[cur] <= 32) {
      cur++;
    }
    if (char0 === 115) {
      const space = b[tS + 4] === 45 ? 'lrgb' : 'rgb';
      return parseCss(b, slen, space);
    }
    if (char0 === 120) {
      const space = b[tS + 5] === 53 ? 'xyz50' : 'xyz65';
      return parseCss(b, slen, space);
    }
  }

  return { space: 'rgb', value: new Float32Array(3), alpha: 1 };
}
