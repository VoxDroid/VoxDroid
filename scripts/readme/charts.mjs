/*
 * Redraws the data-driven README images from live GitHub data:
 *
 *   readme/voxel/skyline.svg               contributions per day, last 30 weeks
 *   readme/voice/languages.{light,dark}.svg  share of code by language, public repos
 *   readme/voice/year.{light,dark}.svg       contributions per week, last 52 weeks
 *
 *   GITHUB_TOKEN=... node scripts/readme/charts.mjs
 *
 * No dependencies (Node 18+). The workflow runs this on a schedule; it is safe to run by hand.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "./vox.js";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const login = process.env.README_LOGIN || "VoxDroid";
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const MONO =
  "ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";
const THEMES = {
  light: { fg: "#1f2328", muted: "#59636e", accent: "#4f46e5" },
  dark: { fg: "#f0f6fc", muted: "#9198a1", accent: "#8b8ffb" },
};

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection { contributionCalendar { weeks { contributionDays { contributionCount weekday } } } }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      nodes { languages(first: 12, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name } } } }
    }
  }
}`;

async function load() {
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "User-Agent": "readme-charts",
    },
    body: JSON.stringify({ query, variables: { login } }),
  });
  const json = await res.json();
  if (!res.ok || json.errors || !json.data || !json.data.user)
    throw new Error(
      "GitHub API: " +
        JSON.stringify(json.errors || json.message || res.status),
    );
  return json.data.user;
}

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
const svg = (h, label, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 846 ${h}" width="846" height="${h}" role="img" aria-label="${esc(label)}">${body}</svg>\n`;

/* Level meters: one row per language, 50 segments = 100%. */
function languagesSVG(rows, T) {
  let body = "";
  rows.forEach(([name, pct], i) => {
    const y = i * 24,
      lit = Math.round(pct / 2);
    let on = "",
      off = "";
    for (let k = 0; k < 50; k++) {
      const seg = `M${(118 + k * 13.4).toFixed(1)} ${y + 4}h10v12h-10z`;
      if (k < lit) on += seg;
      else off += seg;
    }
    body +=
      `<text x="0" y="${y + 14.5}">${esc(name)}</text><text x="846" y="${y + 14.5}" text-anchor="end">${pct < 1 ? "&lt;1" : Math.round(pct)}%</text>` +
      `<path fill="${T.accent}" d="${on}"/><path fill="${T.fg}" fill-opacity=".12" d="${off}"/>`;
  });
  const label =
    "Share of code by language across public repositories: " +
    rows.map(([n, p]) => `${n} ${Math.round(p)} percent`).join(", ");
  return svg(
    rows.length * 24,
    label,
    `<g font-family="${MONO}" font-size="12" fill="${T.fg}">${body}</g>`,
  );
}

/* A year of weekly totals as a waveform: bar length is proportional to the week's count. */
function yearSVG(weeks, T) {
  const peak = Math.max(1, ...weeks),
    total = weeks.reduce((a, b) => a + b, 0),
    pitch = 834 / weeks.length;
  let bars = "";
  weeks.forEach((n, i) => {
    const half = n ? Math.max(1.5, (n / peak) * 38) : 0.75,
      x = 6 + i * pitch;
    bars += `<rect x="${x.toFixed(1)}" y="${(42 - half).toFixed(1)}" width="5" height="${(half * 2).toFixed(1)}" rx="${Math.min(2.5, half).toFixed(1)}"/>`;
  });
  return svg(
    104,
    `Contributions per week over the last ${weeks.length} weeks: ${total} in total, ${peak} in the busiest week.`,
    `<g fill="${T.fg}" fill-opacity=".8">${bars}</g>` +
      `<g font-family="${MONO}" font-size="11" letter-spacing="1.5" fill="${T.muted}"><text x="0" y="100">${weeks.length} WEEKS AGO</text>` +
      `<text x="423" y="100" text-anchor="middle">PEAK ${peak} IN A WEEK</text><text x="846" y="100" text-anchor="end">THIS WEEK</text></g>`,
  );
}

function write(file, content) {
  const target = path.join(root, "readme", file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  console.log("wrote readme/" + file);
}

try {
  const user = await load();
  const weeks = user.contributionsCollection.contributionCalendar.weeks.map(
    (w) => {
      const days = [0, 0, 0, 0, 0, 0, 0];
      w.contributionDays.forEach((d) => {
        days[d.weekday] = d.contributionCount;
      });
      return days;
    },
  );

  write("voxel/skyline.svg", globalThis.Vox.skylineSVG(weeks.slice(-30)));

  const bytes = new Map();
  user.repositories.nodes.forEach((r) =>
    r.languages.edges.forEach((e) =>
      bytes.set(e.node.name, (bytes.get(e.node.name) || 0) + e.size),
    ),
  );
  const all = [...bytes.entries()].sort((a, b) => b[1] - a[1]),
    sum = all.reduce((a, b) => a + b[1], 0) || 1;
  const rows = all.slice(0, 5).map(([n, b]) => [n, (b / sum) * 100]);
  const rest = all.slice(5).reduce((a, b) => a + b[1], 0);
  if (rest > 0) rows.push(["Other", (rest / sum) * 100]);

  const perWeek = weeks.slice(-52).map((d) => d.reduce((a, b) => a + b, 0));
  for (const [name, T] of Object.entries(THEMES)) {
    write(`voice/languages.${name}.svg`, languagesSVG(rows, T));
    write(`voice/year.${name}.svg`, yearSVG(perWeek, T));
  }
} catch (err) {
  // Leave the existing images in place rather than failing the whole README update.
  console.error("Charts not updated: " + err.message);
  process.exitCode = 1;
}
