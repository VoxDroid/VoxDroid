/*
 * Pure image maths for the three print editions. No I/O: every function takes and returns plain
 * arrays, so the results are deterministic and unit-testable. scripts/editions/art.ts does the I/O.
 *
 *   Two Inks   halftoneLayer()   dot screens, one per ink, written as SVG masks
 *   Photocopy  toner()           black toner on transparent, with grit, streaks and a dark copier edge
 *   Sun Print  coat()            brushed emulsion; exposure() turns it into a density mask
 */

/** RGBA pixels, row-major, 0-255. */
export type Pixels = {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
};
/** Single-channel values in 0..1, row-major. */
export type Field = { width: number; height: number; data: Float32Array };

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Park-Miller generator: same seed, same art, on every machine. */
export function prng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

export function luminance(r: number, g: number, b: number) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Smooth value noise for uneven exposure and toner. */
export function valueNoise(
  width: number,
  height: number,
  cell: number,
  rnd: () => number,
) {
  const gw = Math.ceil(width / cell) + 2;
  const gh = Math.ceil(height / cell) + 2;
  const grid = new Float32Array(gw * gh).map(() => rnd());
  const ease = (t: number) => t * t * (3 - 2 * t);
  return (x: number, y: number) => {
    const fx = x / cell,
      fy = y / cell,
      x0 = Math.floor(fx),
      y0 = Math.floor(fy);
    const tx = ease(fx - x0),
      ty = ease(fy - y0);
    const at = (i: number, j: number) => grid[j * gw + i] ?? 0;
    const top = at(x0, y0) + (at(x0 + 1, y0) - at(x0, y0)) * tx;
    const bottom = at(x0, y0 + 1) + (at(x0 + 1, y0 + 1) - at(x0, y0 + 1)) * tx;
    return top + (bottom - top) * ty;
  };
}

export type ImageKind = "transparent" | "solid" | "picture";

function cornerColour(img: Pixels) {
  const { width: w, height: h, data: d } = img;
  const corners = [
    [1, 1],
    [w - 2, 1],
    [1, h - 2],
    [w - 2, h - 2],
  ].map(([x, y]) => (y! * w + x!) * 4);
  const avg = (k: number) =>
    corners.reduce((s, i) => s + (d[i + k] ?? 0), 0) / corners.length;
  return [avg(0), avg(1), avg(2), avg(3)] as const;
}

/**
 * What kind of image a project logo is: a mark on transparency, a mark on a flat background
 * (at least a quarter of the pixels share the corner colour), or a full-bleed picture.
 */
export function classify(img: Pixels): ImageKind {
  const bg = cornerColour(img);
  if (bg[3] < 128) return "transparent";
  const { width: w, height: h, data: d } = img;
  let near = 0;
  for (let i = 0; i < w * h; i++)
    if (
      Math.hypot(
        d[i * 4]! - bg[0],
        d[i * 4 + 1]! - bg[1],
        d[i * 4 + 2]! - bg[2],
      ) < 40
    )
      near++;
  return near / (w * h) >= 0.25 ? "solid" : "picture";
}

/**
 * How much of each pixel would block light. Transparent logos use their alpha; logos on a flat
 * background use the distance from that colour; pictures use their darkness, like a photograph.
 */
export function objectMask(
  img: Pixels,
  kind: ImageKind = classify(img),
): Field {
  const { width: w, height: h, data: d } = img;
  const bg = cornerColour(img);
  const out = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = d[i * 4]!,
      g = d[i * 4 + 1]!,
      b = d[i * 4 + 2]!,
      a = d[i * 4 + 3]! / 255;
    out[i] =
      kind === "transparent"
        ? a * (0.5 + 0.5 * (1 - luminance(r, g, b)))
        : kind === "solid"
          ? a * clamp01(Math.hypot(r - bg[0], g - bg[1], b - bg[2]) / 110)
          : a * Math.pow(clamp01((0.78 - luminance(r, g, b)) / 0.7), 1.1);
  }
  return { width: w, height: h, data: out };
}

/** Logos far from square (screenshots, banners) are not turned into artwork. */
export function isSquareEnough(
  width: number,
  height: number,
  tolerance = 1.25,
) {
  return Math.max(width, height) / Math.min(width, height) <= tolerance;
}

/**
 * One halftone screen as SVG path data, grouped by dot size. Dots are zero-length round-capped
 * strokes, which is far smaller than a <circle> each.
 */
export function halftoneLayer(
  size: number,
  pitch: number,
  angle: number,
  value: (u: number, v: number) => number,
): string {
  const ca = Math.cos(angle),
    sa = Math.sin(angle),
    r = size / 2,
    n = Math.ceil((size * 0.8) / pitch);
  const bins = new Map<number, string[]>();
  for (let i = -n; i <= n; i++)
    for (let j = -n; j <= n; j++) {
      const x = r + i * pitch * ca - j * pitch * sa;
      const y = r + i * pitch * sa + j * pitch * ca;
      if (x < 0 || y < 0 || x > size || y > size) continue;
      const v = value(x / size, y / size);
      if (v <= 0.02) continue;
      const w = Math.round(pitch * 0.62 * Math.sqrt(v) * 2 * 4) / 4;
      if (w < 0.5) continue;
      const list = bins.get(w) ?? [];
      list.push(`M${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10}h.01`);
      bins.set(w, list);
    }
  return [...bins.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([w, dots]) => `<path stroke-width="${w}" d="${dots.join("")}"/>`)
    .join("");
}

export function halftoneSvg(size: number, layer: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><g fill="none" stroke="#000" stroke-linecap="round">${layer}</g></svg>\n`;
}

/** Nearest-pixel sampler over RGBA pixels, in 0..1 coordinates. */
export function sampler(img: Pixels) {
  const { width: w, height: h, data: d } = img;
  return (u: number, v: number) => {
    const x = Math.max(0, Math.min(w - 1, Math.round(u * (w - 1))));
    const y = Math.max(0, Math.min(h - 1, Math.round(v * (h - 1))));
    const i = (y * w + x) * 4;
    const r = d[i]!,
      g = d[i + 1]!,
      b = d[i + 2]!,
      a = d[i + 3]! / 255;
    return {
      lum: luminance(r, g, b),
      warm: clamp01((r - b) / 120),
      cool: clamp01((b - r) / 60),
      sat:
        Math.max(r, g, b) === 0
          ? 0
          : (Math.max(r, g, b) - Math.min(r, g, b)) / Math.max(r, g, b),
      alpha: a,
    };
  };
}

/** Photocopy: black where the toner lands, transparent elsewhere. */
export function toner(
  width: number,
  height: number,
  tone: (x: number, y: number) => number,
  rnd: () => number,
  opts: {
    grit?: number;
    specks?: number;
    edge?: boolean;
    streaks?: number[];
  } = {},
): Uint8Array {
  const grit = opts.grit ?? 0.42,
    specks = opts.specks ?? 0.0016;
  const out = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const edge = opts.edge
        ? Math.max(0, (x - (width - 60)) / 60) * 0.9 +
          Math.max(0, (24 - y) / 24) * 0.7
        : 0;
      let black = tone(x, y) + (rnd() - 0.5) * grit - edge < 0.5;
      if (rnd() < specks) black = true;
      if (opts.streaks?.includes(x) && rnd() < 0.5) black = true;
      out[i * 4] = out[i * 4 + 1] = out[i * 4 + 2] = 17;
      out[i * 4 + 3] = black ? 255 : 0;
    }
  return out;
}

/**
 * Brush-coated emulsion: near-horizontal strokes with ragged, bristly ends. Each stroke is drawn
 * as vertical spans along a sampled curve, then composited source-over like a canvas stroke.
 */
export function coat(
  width: number,
  height: number,
  inset: number,
  rnd: () => number,
  minAlpha = 0.55,
): Field {
  const acc = new Float32Array(width * height);
  const stroke = (
    x0: number,
    x1: number,
    y0: number,
    wobble: [number, number, number],
    lw: number,
    alpha: number,
  ) => {
    const half = lw / 2;
    const [a, b, c] = wobble;
    for (
      let x = Math.max(0, Math.floor(x0));
      x <= Math.min(width - 1, Math.ceil(x1));
      x++
    ) {
      const t = (x - x0) / Math.max(1, x1 - x0);
      // Cubic Bezier in y with x running straight across, close enough for a brush.
      const yc =
        y0 +
        3 * (1 - t) * (1 - t) * t * a +
        3 * (1 - t) * t * t * b +
        t * t * t * c;
      const top = yc - half,
        bottom = yc + half;
      for (
        let y = Math.max(0, Math.floor(top));
        y <= Math.min(height - 1, Math.ceil(bottom));
        y++
      ) {
        const cover = clamp01(Math.min(y + 1, bottom) - Math.max(y, top));
        if (cover <= 0) continue;
        const i = y * width + x,
          s = alpha * cover;
        acc[i] = s + acc[i]! * (1 - s);
      }
    }
  };
  for (let y = inset; y < height - inset; y += 5) {
    const x0 = inset + (rnd() - 0.3) * 46,
      x1 = width - inset + (rnd() - 0.7) * 46;
    stroke(
      x0,
      x1,
      y,
      [(rnd() - 0.5) * 6, (rnd() - 0.5) * 6, (rnd() - 0.5) * 4],
      8 + rnd() * 9,
      minAlpha + rnd() * (1 - minAlpha),
    );
    for (let k = 0; k < 3; k++) {
      const lw = 0.8 + rnd() * 1.6,
        alpha = 0.25 + rnd() * 0.5,
        yy = y + (rnd() - 0.5) * 10;
      stroke(
        x1 - 20,
        x1 + rnd() * 34,
        yy,
        [0, 0, (rnd() - 0.5) * 3],
        lw,
        alpha,
      );
      stroke(
        x0 - rnd() * 34,
        x0 + 20,
        yy,
        [0, 0, (rnd() - 0.5) * 3],
        lw,
        alpha,
      );
    }
  }
  return { width, height, data: acc };
}

/** Smooth threshold: 0 below `a`, 1 above `b`. */
export function smoothstep(a: number, b: number, v: number) {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
}

/** Sun Print: a density mask (white, alpha = how blue that spot turned). */
export function exposure(
  coatField: Field,
  density: (x: number, y: number, i: number) => number,
  rnd: () => number,
  unevenCell = 90,
): Uint8Array {
  const { width: w, height: h, data: c } = coatField;
  const uneven = valueNoise(w, h, unevenCell, rnd);
  const out = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x,
        k = c[i]!;
      const d = clamp01(
        density(x, y, i) * k * (0.88 + 0.12 * uneven(x, y)) +
          (rnd() - 0.5) * 0.06 * k,
      );
      out[i * 4] = out[i * 4 + 1] = out[i * 4 + 2] = 255;
      out[i * 4 + 3] = Math.round(d * 255);
    }
  return out;
}
