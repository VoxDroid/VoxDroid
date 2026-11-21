/*
 * Generates the print-edition artwork into public/art/ from the portrait and each project's logo:
 *
 *   public/art/<group>/riso-key.svg, riso-warm.svg   Two Inks halftone screens (CSS masks)
 *   public/art/<group>/xerox.webp                    Photocopy toner
 *   public/art/<group>/cyan.webp                     Sun Print density mask (CSS mask)
 *   public/art/cyan-panel.webp                       a brushed blue field for panels
 *
 *   node scripts/editions/art.mts           # runs before every build (npm "prebuild")
 *
 * Results are cached by a hash of each source and of this generator, recorded in
 * data/art-manifest.json, so unchanged art is not redrawn. Projects with `artwork: false`
 * (for example a logo that is a third party's emblem) get no artwork and render typographically.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { splitFrontmatter } from "../../lib/content/frontmatter.ts";
import {
  clamp01,
  coat,
  exposure,
  halftoneLayer,
  halftoneSvg,
  isSquareEnough,
  objectMask,
  prng,
  sampler,
  smoothstep,
  toner,
  valueNoise,
  type Field,
  type Pixels,
} from "./print.mts";

const GENERATOR_VERSION = "5";
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const artDir = path.join(root, "public/art");
const manifestFile = path.join(root, "data/art-manifest.json");

async function rgba(
  file: string,
  width: number,
  height: number,
  fit: "cover" | "contain",
): Promise<Pixels> {
  const { data, info } = await sharp(file)
    .resize(width, height, { fit, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { width: info.width, height: info.height, data: new Uint8Array(data) };
}

async function blur(field: Field, sigma: number): Promise<Field> {
  const bytes = Uint8Array.from(field.data, (v) =>
    Math.round(clamp01(v) * 255),
  );
  // sharp widens single-channel input to sRGB on output; take one channel back so pixels line up.
  const { data, info } = await sharp(bytes, {
    raw: { width: field.width, height: field.height, channels: 1 },
  })
    .blur(sigma)
    .extractChannel(0)
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (
    info.channels !== 1 ||
    info.width !== field.width ||
    info.height !== field.height
  )
    throw new Error(
      `blur returned ${info.width}x${info.height}x${info.channels}, expected ${field.width}x${field.height}x1`,
    );
  return {
    width: field.width,
    height: field.height,
    data: Float32Array.from(data, (v) => v / 255),
  };
}

function webp(data: Uint8Array, width: number, height: number) {
  return sharp(data, { raw: { width, height, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 90, effort: 6 })
    .toBuffer();
}

function write(file: string, content: string | Buffer) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/** The portrait: tuned so hair, face and shirt stay legible in every process. */
async function portrait(src: string, out: string) {
  const S = 640;
  const sample = sampler(await rgba(src, 220, 220, "cover"));
  const key = halftoneLayer(S, 8, 0.785, (u, v) => {
    const s = sample(u, v);
    return Math.max(
      Math.pow(clamp01((0.5 - s.lum) / 0.42), 1.8),
      s.cool * 0.42,
    );
  });
  const warm = halftoneLayer(S, 8, 0.262, (u, v) => {
    const s = sample(u, v);
    return Math.min(1, s.warm * (0.25 + 0.9 * s.lum)) * 0.95;
  });
  write(path.join(out, "riso-key.svg"), halftoneSvg(S, key));
  write(path.join(out, "riso-warm.svg"), halftoneSvg(S, warm));

  const X = 900,
    photo = await rgba(src, X, X, "cover"),
    rndX = prng(11),
    noise = valueNoise(X, X, 140, rndX);
  const tone = (x: number, y: number) => {
    const i = (y * X + x) * 4;
    const lum =
      (0.2126 * photo.data[i]! +
        0.7152 * photo.data[i + 1]! +
        0.0722 * photo.data[i + 2]!) /
      255;
    return clamp01((lum - 0.3) / 0.42) + (noise(x, y) - 0.5) * 0.18;
  };
  write(
    path.join(out, "xerox.webp"),
    await webp(
      toner(X, X, tone, rndX, { edge: true, streaks: [212, 213, 655] }),
      X,
      X,
    ),
  );

  const W = 820,
    H = 960,
    ix = 90,
    iy = 150,
    IS = 640;
  const inner = await rgba(src, IS, IS, "cover"),
    rndC = prng(23);
  const emulsion = await blur(coat(W, H, 46, rndC), 0.6);
  const density = (x: number, y: number) => {
    if (x < ix || x >= ix + IS || y < iy || y >= iy + IS) return 0.97;
    const i = ((y - iy) * IS + (x - ix)) * 4;
    const lum =
      (0.2126 * inner.data[i]! +
        0.7152 * inner.data[i + 1]! +
        0.0722 * inner.data[i + 2]!) /
      255;
    return 1 - Math.pow(clamp01((lum - 0.06) / 0.82), 0.85) * 0.96;
  };
  write(
    path.join(out, "cyan.webp"),
    await webp(exposure(emulsion, density, rndC), W, H),
  );
}

/** A project logo in all three processes. */
async function logo(src: string, out: string, seed: number) {
  const S = 360;
  const img = await rgba(src, S, S, "contain");
  const mask = objectMask(img);
  const sample = sampler(img);
  const at = (u: number, v: number) =>
    mask.data[
      Math.min(S - 1, Math.round(v * (S - 1))) * S +
        Math.min(S - 1, Math.round(u * (S - 1)))
    ] ?? 0;
  const key = halftoneLayer(
    S,
    7,
    0.785,
    (u, v) => at(u, v) * (0.35 + 0.65 * (1 - sample(u, v).lum)),
  );
  const warm = halftoneLayer(
    S,
    7,
    0.262,
    (u, v) => at(u, v) * sample(u, v).sat * 0.9,
  );
  write(path.join(out, "riso-key.svg"), halftoneSvg(S, key));
  write(path.join(out, "riso-warm.svg"), halftoneSvg(S, warm));

  const rndX = prng(seed);
  write(
    path.join(out, "xerox.webp"),
    await webp(
      toner(S, S, (x, y) => 1 - (mask.data[y * S + x] ?? 0), rndX, {
        grit: 0.34,
        specks: 0.0012,
      }),
      S,
      S,
    ),
  );

  const T = 420,
    off = 30,
    rndC = prng(seed + 1);
  const padded = new Float32Array(T * T);
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++)
      padded[(y + off) * T + x + off] = mask.data[y * S + x] ?? 0;
  const object = await blur({ width: T, height: T, data: padded }, 1.4);
  // A dense coat and a firm silhouette, so the white shape reads like a real photogram. Two tones:
  // the outline prints pale and the darker parts of the mark print fully white, so badges keep their detail.
  const tones = (m: number) =>
    0.62 * smoothstep(0.16, 0.42, m) + 0.38 * smoothstep(0.62, 0.9, m);
  const emulsion = await blur(coat(T, T, 14, rndC, 0.82), 0.6);
  write(
    path.join(out, "cyan.webp"),
    await webp(
      exposure(
        emulsion,
        (_x, _y, i) => 1 - 0.97 * tones(object.data[i] ?? 0),
        rndC,
        70,
      ),
      T,
      T,
    ),
  );
}

async function panel(out: string) {
  const W = 1200,
    H = 700,
    rnd = prng(41);
  const emulsion = await blur(coat(W, H, 30, rnd), 0.6);
  write(
    out,
    await webp(
      exposure(emulsion, () => 1, rnd, 160),
      W,
      H,
    ),
  );
}

function hash(...parts: (string | Buffer)[]) {
  const h = createHash("sha256");
  for (const p of parts) h.update(p);
  return h.digest("hex").slice(0, 16);
}

type Job = {
  id: string;
  sources: string[];
  outputs: string[];
  run: () => Promise<void>;
};

/** Logo files close enough to square to become artwork; wide screenshots and banners stay typographic. */
const squareLogos = new Set<string>();
async function measureLogos() {
  const dir = path.join(root, "content/projects");
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const data = splitFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"))
      .data as { logo?: string };
    if (!data.logo) continue;
    const src = path.join(root, "public", data.logo);
    if (!fs.existsSync(src)) continue;
    const meta = await sharp(src).metadata();
    if (meta.width && meta.height && isSquareEnough(meta.width, meta.height))
      squareLogos.add(src);
  }
}

function jobs(): Job[] {
  const list: Job[] = [];
  const avatar = path.join(root, "public/profile/VoxDroid.jpg");
  const files = (dir: string) =>
    ["riso-key.svg", "riso-warm.svg", "xerox.webp", "cyan.webp"].map((f) =>
      path.join(dir, f),
    );
  list.push({
    id: "portrait",
    sources: [avatar],
    outputs: files(path.join(artDir, "portrait")),
    run: () => portrait(avatar, path.join(artDir, "portrait")),
  });
  list.push({
    id: "cyan-panel",
    sources: [],
    outputs: [path.join(artDir, "cyan-panel.webp")],
    run: () => panel(path.join(artDir, "cyan-panel.webp")),
  });

  const dir = path.join(root, "content/projects");
  for (const file of fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()) {
    const slug = file.replace(/\.md$/, "");
    const data = splitFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"))
      .data as { logo?: string; artwork?: boolean };
    if (!data.logo || data.artwork === false) continue;
    const src = path.join(root, "public", data.logo);
    if (!fs.existsSync(src))
      throw new Error(`${file}: logo ${data.logo} does not exist`);
    if (!squareLogos.has(src)) continue;
    const out = path.join(artDir, "projects", slug);
    const seed = [...slug].reduce(
      (s, c) => (s * 31 + c.charCodeAt(0)) % 100003,
      7,
    );
    list.push({
      id: "project:" + slug,
      sources: [src],
      outputs: files(out),
      run: () => logo(src, out, seed),
    });
  }
  return list;
}

async function main() {
  const generator = hash(
    fs.readFileSync(fileURLToPath(import.meta.url)),
    fs.readFileSync(path.join(root, "scripts/editions/print.mts")),
    GENERATOR_VERSION,
  );
  const previous: Record<string, string> = fs.existsSync(manifestFile)
    ? JSON.parse(fs.readFileSync(manifestFile, "utf8"))
    : {};
  const next: Record<string, string> = {};
  let drawn = 0;
  await measureLogos();
  for (const job of jobs()) {
    const key = hash(generator, ...job.sources.map((s) => fs.readFileSync(s)));
    next[job.id] = key;
    if (previous[job.id] === key && job.outputs.every((o) => fs.existsSync(o)))
      continue;
    await job.run();
    drawn++;
    console.log("drew " + job.id);
  }
  // Remove art for projects that no longer have any.
  const projectsDir = path.join(artDir, "projects");
  if (fs.existsSync(projectsDir))
    for (const slug of fs.readdirSync(projectsDir))
      if (!("project:" + slug in next))
        fs.rmSync(path.join(projectsDir, slug), {
          recursive: true,
          force: true,
        });
  const sorted = Object.fromEntries(
    Object.entries(next).sort(([a], [b]) => a.localeCompare(b)),
  );
  if (JSON.stringify(sorted) !== JSON.stringify(previous))
    write(manifestFile, JSON.stringify(sorted, null, 2) + "\n");
  await recordImageSizes();
  console.log(`Art: ${Object.keys(next).length} groups, ${drawn} redrawn.`);
}

/** Pixel sizes of every logo and screenshot the content names, so pages can reserve their space. */
async function recordImageSizes() {
  const dir = path.join(root, "content/projects");
  const wanted = new Set<string>(["/profile/VoxDroid.jpg"]);
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const data = splitFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"))
      .data as { logo?: string; screenshots?: string[] };
    if (data.logo) wanted.add(data.logo);
    for (const s of data.screenshots ?? []) wanted.add(s);
  }
  const sizes: Record<string, [number, number]> = {};
  for (const p of [...wanted].sort()) {
    const file = path.join(root, "public", p);
    if (!fs.existsSync(file))
      throw new Error(`${p} is named in content but does not exist`);
    const meta = await sharp(file).metadata();
    if (!meta.width || !meta.height)
      throw new Error(`${p} has no readable size`);
    sizes[p] = [meta.width, meta.height];
  }
  const out = path.join(root, "data/image-sizes.json");
  const text = JSON.stringify(sizes, null, 2) + "\n";
  if (!fs.existsSync(out) || fs.readFileSync(out, "utf8") !== text)
    write(out, text);
}

main().catch((err) => {
  console.error(
    "Art generation failed: " +
      (err instanceof Error ? err.message : String(err)),
  );
  process.exitCode = 1;
});
