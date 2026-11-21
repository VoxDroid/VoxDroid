// Generates photocopy (black toner on transparent) and cyanotype (density masks) assets
// by running canvas code in headless Chrome. Inputs are embedded as data URLs.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const P = "C:/Users/jandr/Documents/GitHub/VoxDroid/public/";
const src = {
  avatar: P + "profile/VoxDroid.jpg",
  kemono: P + "project_images/KemonoDownloader.png",
  krnr: P + "project_images/krnr.png",
  eventra: P + "project_images/Eventra.png",
  cycleone: P + "project_images/CycleOne.png",
  ttp: P + "project_images/TaskTrackerPro.png",
  bldrx: P + "project_images/bldrx.png",
  autotable: P + "project_images/AutoTable.png",
  codestash: P + "project_images/CodeStash.png",
};
const urls = {};
for (const [k, f] of Object.entries(src))
  urls[k] =
    "data:" + (f.endsWith(".png") ? "image/png" : "image/jpeg") + ";base64," +
    fs.readFileSync(f).toString("base64");

const page = String.raw`<!doctype html><meta charset="utf-8"><body><pre id="out"></pre><script>
const SRC = __SRC__;
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
const load = (u) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = u; });
const canvas = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
const clamp = (v) => Math.max(0, Math.min(1, v));
function vnoise(w, h, cell) {
  const gw = Math.ceil(w / cell) + 2, g = []; for (let i = 0; i < gw * (Math.ceil(h / cell) + 2); i++) g.push(rnd());
  const s = (t) => t * t * (3 - 2 * t);
  return (x, y) => { const fx = x / cell, fy = y / cell, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = s(fx - x0), ty = s(fy - y0);
    const a = g[y0 * gw + x0], b = g[y0 * gw + x0 + 1], c = g[(y0 + 1) * gw + x0], d = g[(y0 + 1) * gw + x0 + 1];
    return (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty; };
}
function coat(w, h, inset) {
  const c = canvas(w, h), g = c.getContext("2d"); g.lineCap = "round";
  for (let y = inset; y < h - inset; y += 5) {
    const x0 = inset + (rnd() - 0.3) * 46, x1 = w - inset + (rnd() - 0.7) * 46;
    g.strokeStyle = "rgba(0,0,0," + (0.55 + rnd() * 0.45) + ")"; g.lineWidth = 8 + rnd() * 9;
    g.beginPath(); g.moveTo(x0, y); g.bezierCurveTo(w * 0.33, y + (rnd() - 0.5) * 6, w * 0.66, y + (rnd() - 0.5) * 6, x1, y + (rnd() - 0.5) * 4); g.stroke();
    for (let k = 0; k < 3; k++) {
      g.lineWidth = 0.8 + rnd() * 1.6; g.strokeStyle = "rgba(0,0,0," + (0.25 + rnd() * 0.5) + ")"; const yy = y + (rnd() - 0.5) * 10;
      g.beginPath(); g.moveTo(x1 - 20, yy); g.lineTo(x1 + rnd() * 34, yy + (rnd() - 0.5) * 3); g.stroke();
      g.beginPath(); g.moveTo(x0 + 20, yy); g.lineTo(x0 - rnd() * 34, yy + (rnd() - 0.5) * 3); g.stroke();
    }
  }
  const top = canvas(w, h), tg = top.getContext("2d"); tg.filter = "blur(0.6px)"; tg.drawImage(c, 0, 0);
  const d = tg.getImageData(0, 0, w, h).data, a = new Float32Array(w * h); for (let i = 0; i < w * h; i++) a[i] = d[i * 4 + 3] / 255; return a;
}
function pixels(img, w, h, fit) { const c = canvas(w, h), g = c.getContext("2d"); if (fit) g.drawImage(img, fit[0], fit[1], fit[2], fit[3]); else g.drawImage(img, 0, 0, w, h); return g.getImageData(0, 0, w, h).data; }
function out(w, h, fn) {
  const c = canvas(w, h), g = c.getContext("2d"), im = g.createImageData(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = y * w + x, p = fn(x, y, i); im.data[i * 4] = p[0]; im.data[i * 4 + 1] = p[1]; im.data[i * 4 + 2] = p[2]; im.data[i * 4 + 3] = p[3]; }
  g.putImageData(im, 0, 0); return c.toDataURL("image/webp", 0.9);
}
function logoMask(img, S) {
  const d = pixels(img, S, S), m = new Float32Array(S * S);
  const cs = [[2, 2], [S - 3, 2], [2, S - 3], [S - 3, S - 3]].map(([x, y]) => { const i = (y * S + x) * 4; return [d[i], d[i + 1], d[i + 2], d[i + 3]]; });
  const bg = [0, 1, 2, 3].map((k) => cs.reduce((s, c) => s + c[k], 0) / 4), transparent = bg[3] < 128;
  for (let i = 0; i < S * S; i++) {
    const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2], a = d[i * 4 + 3] / 255, lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    m[i] = transparent ? a * (0.5 + 0.5 * (1 - lum)) : a * clamp(Math.hypot(r - bg[0], g - bg[1], b - bg[2]) / 110);
  }
  return m;
}
(async () => {
  const R = {};
  const av = await load(SRC.avatar);
  {
    const S = 900, d = pixels(av, S, S), n = vnoise(S, S, 140);
    R["xerox-avatar"] = out(S, S, (x, y, i) => {
      const lum = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
      const v = clamp((lum - 0.3) / 0.42) + (n(x, y) - 0.5) * 0.18;
      const edge = Math.max(0, (x - (S - 60)) / 60) * 0.9 + Math.max(0, (24 - y) / 24) * 0.7;
      let black = v + (rnd() - 0.5) * 0.42 - edge < 0.5;
      if (rnd() < 0.0016) black = true;
      if ((x === 212 || x === 213 || x === 655) && rnd() < 0.5) black = true;
      return [17, 17, 17, black ? 255 : 0];
    });
  }
  {
    const W = 820, H = 960, ix = 90, iy = 150, IS = 640, d = pixels(av, W, H, [ix, iy, IS, IS]), c = coat(W, H, 46), n = vnoise(W, H, 90);
    R["cyan-avatar"] = out(W, H, (x, y, i) => {
      const inside = x >= ix && x < ix + IS && y >= iy && y < iy + IS;
      let dens = 0.97;
      if (inside) { const lum = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255; dens = 1 - Math.pow(clamp((lum - 0.06) / 0.82), 0.85) * 0.96; }
      dens = clamp(dens * c[i] * (0.88 + 0.12 * n(x, y)) + (rnd() - 0.5) * 0.06 * c[i]);
      return [255, 255, 255, dens * 255];
    });
  }
  for (const k of ["kemono", "krnr", "eventra", "cycleone", "ttp", "bldrx", "autotable", "codestash"]) {
    const img = await load(SRC[k]), S = 360, m = logoMask(img, S);
    R["xerox-" + k] = out(S, S, (x, y, i) => [17, 17, 17, (m[i] + (rnd() - 0.5) * 0.34 > 0.52 || rnd() < 0.0012) ? 255 : 0]);
    const T = 420, off = 30, big = canvas(T, T), bg = big.getContext("2d"), tmp = canvas(S, S), tg = tmp.getContext("2d"), im = tg.createImageData(S, S);
    for (let i = 0; i < S * S; i++) im.data[i * 4 + 3] = m[i] * 255;
    tg.putImageData(im, 0, 0); bg.filter = "blur(1.4px)"; bg.drawImage(tmp, off, off);
    const md = bg.getImageData(0, 0, T, T).data, c = coat(T, T, 14), n = vnoise(T, T, 70);
    R["cyan-" + k] = out(T, T, (x, y, i) => { const obj = md[i * 4 + 3] / 255; return [255, 255, 255, clamp(c[i] * (1 - 0.95 * obj) * (0.86 + 0.14 * n(x, y)) + (rnd() - 0.5) * 0.06 * c[i]) * 255]; });
  }
  {
    const W = 1200, H = 700, c = coat(W, H, 30), n = vnoise(W, H, 160);
    R["cyan-panel"] = out(W, H, (x, y, i) => [255, 255, 255, clamp(c[i] * (0.9 + 0.1 * n(x, y)) + (rnd() - 0.5) * 0.05 * c[i]) * 255]);
  }
  document.getElementById("out").textContent = JSON.stringify(R);
})();
</script>`.replace("__SRC__", JSON.stringify(urls));

fs.writeFileSync("print-assets.html", page);
const here = process.cwd().replace(/\\/g, "/");
const dom = execFileSync(
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  ["--headless=new", "--disable-gpu", "--virtual-time-budget=60000", "--dump-dom", "file:///" + here + "/print-assets.html"],
  { maxBuffer: 1 << 30, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
);
const m = dom.match(/<pre id="out">([\s\S]*?)<\/pre>/);
if (!m || !m[1]) throw new Error("no output from the page");
const R = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
fs.mkdirSync("../assets", { recursive: true });
for (const [k, v] of Object.entries(R))
  fs.writeFileSync("../assets/" + k + ".webp", Buffer.from(v.split(",")[1], "base64"));
console.log(Object.keys(R).length + " files written");
