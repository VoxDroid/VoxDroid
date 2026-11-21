// Builds halftone.html (avatar embedded as a data URL so the canvas is not tainted).
import fs from "node:fs";
const img = fs.readFileSync(process.argv[2]).toString("base64");
const html = `<!doctype html><meta charset="utf-8"><body><pre id="out"></pre><script>
const S = 640, N = 220;
const im = new Image();
im.onload = () => {
  const c = document.createElement("canvas"); c.width = c.height = N;
  const g = c.getContext("2d"); g.drawImage(im, 0, 0, N, N);
  const px = g.getImageData(0, 0, N, N).data;
  const sample = (u, v) => {
    const x = Math.max(0, Math.min(N - 1, Math.round(u * (N - 1)))), y = Math.max(0, Math.min(N - 1, Math.round(v * (N - 1)))), i = (y * N + x) * 4;
    const r = px[i], gg = px[i + 1], b = px[i + 2];
    return { lum: (0.2126 * r + 0.7152 * gg + 0.0722 * b) / 255, warm: Math.max(0, Math.min(1, (r - b) / 120)), cool: Math.max(0, Math.min(1, (b - r) / 60)) };
  };
  const layer = (angle, pitch, value) => {
    const ca = Math.cos(angle), sa = Math.sin(angle), R = S / 2, n = Math.ceil(S * 0.8 / pitch), bins = {};
    for (let i = -n; i <= n; i++) for (let j = -n; j <= n; j++) {
      const x = R + i * pitch * ca - j * pitch * sa, y = R + i * pitch * sa + j * pitch * ca;
      if (x < 0 || y < 0 || x > S || y > S) continue;
      const v = value(sample(x / S, y / S)); if (v <= 0.02) continue;
      const w = Math.round(pitch * 0.62 * Math.sqrt(v) * 2 * 4) / 4; if (w < 0.5) continue;
      (bins[w] = bins[w] || []).push("M" + Math.round(x * 10) / 10 + " " + Math.round(y * 10) / 10 + "h.01");
    }
    return Object.keys(bins).map(w => [w, bins[w].join("")]);
  };
  const key = layer(0.785, 8, s => Math.max(Math.pow(Math.max(0, Math.min(1, (0.5 - s.lum) / 0.42)), 1.8), s.cool * 0.42));
  const warm = layer(0.262, 8, s => Math.min(1, s.warm * (0.25 + 0.9 * s.lum)) * 0.95);
  document.getElementById("out").textContent = JSON.stringify({ key, warm });
};
im.src = "data:image/jpeg;base64,${img}";
</script>`;
fs.writeFileSync("halftone.html", html);
