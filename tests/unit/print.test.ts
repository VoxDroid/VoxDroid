import { describe, expect, it } from "vitest";
import {
  classify,
  coat,
  exposure,
  halftoneLayer,
  halftoneSvg,
  isSquareEnough,
  objectMask,
  prng,
  smoothstep,
  toner,
  valueNoise,
  type Pixels,
} from "../../scripts/editions/print.mts";

function image(
  size: number,
  paint: (x: number, y: number) => [number, number, number, number],
): Pixels {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const [r, g, b, a] = paint(x, y);
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = a;
    }
  return { width: size, height: size, data };
}
const centreSquare = (x: number, y: number) =>
  x > 6 && x < 14 && y > 6 && y < 14;

describe("prng", () => {
  it("repeats for a seed and stays in [0, 1)", () => {
    const a = prng(42),
      b = prng(42);
    const xs = Array.from({ length: 1000 }, () => a());
    expect(xs).toEqual(Array.from({ length: 1000 }, () => b()));
    expect(xs.every((v) => v >= 0 && v < 1)).toBe(true);
    expect(prng(1)()).not.toBe(prng(2)());
  });
  it("survives seed zero", () => expect(Number.isFinite(prng(0)())).toBe(true));
});

describe("classify and objectMask", () => {
  it("recognises a mark on transparency", () => {
    const img = image(20, (x, y) =>
      centreSquare(x, y) ? [0, 0, 0, 255] : [0, 0, 0, 0],
    );
    expect(classify(img)).toBe("transparent");
    const m = objectMask(img);
    expect(m.data[10 * 20 + 10]).toBeCloseTo(1);
    expect(m.data[0]).toBe(0);
  });
  it("recognises a mark on a flat background", () => {
    const img = image(20, (x, y) =>
      centreSquare(x, y) ? [255, 255, 255, 255] : [20, 20, 30, 255],
    );
    expect(classify(img)).toBe("solid");
    const m = objectMask(img);
    expect(m.data[10 * 20 + 10]).toBeCloseTo(1);
    expect(m.data[0]).toBeCloseTo(0);
  });
  it("treats a full-bleed image as a picture, darkness blocking light", () => {
    const img = image(20, (x, y) => [x * 12, y * 12, 128, 255]);
    expect(classify(img)).toBe("picture");
    const m = objectMask(img);
    expect(m.data[0]!).toBeGreaterThan(m.data[19 * 20 + 19]!);
  });
});

describe("halftone", () => {
  it("draws bigger dots where the value is higher and nothing where it is zero", () => {
    const empty = halftoneLayer(100, 8, 0.5, () => 0);
    expect(empty).toBe("");
    const layer = halftoneLayer(100, 8, 0.5, (u) => (u < 0.5 ? 0.1 : 0.9));
    const widths = [...layer.matchAll(/stroke-width="([\d.]+)"/g)].map((m) =>
      Number(m[1]),
    );
    expect(widths.length).toBe(2);
    expect(Math.max(...widths)).toBeGreaterThan(Math.min(...widths));
    expect(layer).toBe(
      halftoneLayer(100, 8, 0.5, (u) => (u < 0.5 ? 0.1 : 0.9)),
    );
  });
  it("wraps layers in a valid standalone SVG", () => {
    const svg = halftoneSvg(64, '<path stroke-width="1" d="M1 1h.01"/>');
    expect(svg).toMatch(
      /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 64 64"/,
    );
    expect(svg).toContain('stroke-linecap="round"');
  });
});

describe("toner", () => {
  it("is pure black or fully transparent, darker tones taking more toner", () => {
    const out = toner(40, 40, (x) => (x < 20 ? 0 : 1), prng(3), {
      specks: 0,
      grit: 0.2,
    });
    const alpha = (x: number, y: number) => out[(y * 40 + x) * 4 + 3];
    const values = new Set(
      Array.from({ length: 1600 }, (_, i) => out[i * 4 + 3]),
    );
    expect([...values].every((v) => v === 0 || v === 255)).toBe(true);
    let left = 0,
      right = 0;
    for (let y = 0; y < 40; y++)
      for (let x = 0; x < 20; x++) {
        left += alpha(x, y) ? 1 : 0;
        right += alpha(x + 20, y) ? 1 : 0;
      }
    expect(left).toBe(800);
    expect(right).toBe(0);
  });
});

describe("coat and exposure", () => {
  it("covers the inside of the sheet and leaves the margins bare", () => {
    const c = coat(200, 120, 20, prng(7));
    expect(c.data.length).toBe(200 * 120);
    expect(c.data.every((v) => v >= 0 && v <= 1)).toBe(true);
    let inside = 0;
    for (let y = 30; y < 90; y++)
      for (let x = 60; x < 140; x++) inside += c.data[y * 200 + x]!;
    expect(inside / (60 * 80)).toBeGreaterThan(0.85);
    expect(c.data[0]).toBe(0);
  });
  it("turns density into white pixels with matching alpha", () => {
    const c = { width: 10, height: 10, data: new Float32Array(100).fill(1) };
    const out = exposure(c, (x) => (x < 5 ? 1 : 0), prng(1));
    expect(out[0]).toBe(255);
    expect(out[3]!).toBeGreaterThan(200);
    expect(out[(5 * 10 + 9) * 4 + 3]!).toBeLessThan(20);
  });
});

describe("small helpers", () => {
  it("smoothstep clamps and eases", () => {
    expect(smoothstep(0.2, 0.6, 0)).toBe(0);
    expect(smoothstep(0.2, 0.6, 1)).toBe(1);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5);
  });
  it("only square-ish logos become artwork", () => {
    expect(isSquareEnough(512, 512)).toBe(true);
    expect(isSquareEnough(512, 420)).toBe(true);
    expect(isSquareEnough(939, 488)).toBe(false);
  });
  it("value noise is smooth and bounded", () => {
    const n = valueNoise(100, 100, 20, prng(5));
    const a = n(10, 10),
      b = n(10.5, 10);
    expect(a).toBeGreaterThanOrEqual(0);
    expect(a).toBeLessThanOrEqual(1);
    expect(Math.abs(a - b)).toBeLessThan(0.1);
  });
});
