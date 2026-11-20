/*
 * Redraws the data-driven README images from live GitHub data:
 *
 *   readme/voxel/skyline.svg               contributions per day, last 30 weeks
 *   readme/voice/languages.{light,dark}.svg  share of code by language, public repos
 *   readme/voice/year.{light,dark}.svg       contributions per week, last 52 weeks
 *   readme/poster/numbers.{light,dark}.svg   total stars on public repos and profile views (komarev),
 *                                            set in Anton from readme/poster/digits.json (see build-art.mjs)
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

/* ---- "By the numbers" panel for the poster edition: big Anton figures from pre-traced glyphs ---- */
const POSTER = {
  light: { fg: "#1f2328", a: "#4338ca", b: "#ff5a4f" },
  dark: { fg: "#f0f6fc", a: "#a5a8ff", b: "#ff6f61" },
};
const VIEWS_URL =
  "https://komarev.com/ghpvc/?username=" + encodeURIComponent(login);

async function loadStars() {
  let total = 0,
    repos = 0,
    after = null;
  do {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "User-Agent": "readme-charts",
      },
      body: JSON.stringify({
        query: `query($login: String!, $after: String) { user(login: $login) {
          repositories(first: 100, after: $after, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
            pageInfo { hasNextPage endCursor } nodes { stargazerCount } } } }`,
        variables: { login, after },
      }),
    });
    const json = await res.json();
    const page = json.data && json.data.user && json.data.user.repositories;
    if (!res.ok || json.errors || !page)
      throw new Error("stars: " + JSON.stringify(json.errors || res.status));
    page.nodes.forEach((r) => {
      total += r.stargazerCount;
      repos++;
    });
    after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (after);
  return { stars: total, repos };
}

/* The count comes from the komarev badge that the README embeds; reading it here adds one view. */
async function loadViews() {
  const res = await fetch(VIEWS_URL, {
    headers: { "User-Agent": "readme-charts" },
  });
  if (!res.ok) throw new Error("views: " + res.status);
  const nums = [...(await res.text()).matchAll(/>\s*([\d,.]+)\s*</g)];
  if (!nums.length) throw new Error("views: no number in the badge");
  return Number(nums[nums.length - 1][1].replace(/[^\d]/g, ""));
}

/* The previous figures, read back from the drawn panel, stand in for any source that is down. */
function previousNumbers() {
  try {
    const old = fs.readFileSync(
      path.join(root, "readme/poster/numbers.light.svg"),
      "utf8",
    );
    const pick = (re) => {
      const m = old.match(re);
      return m ? Number(m[1].replace(/,/g, "")) : null;
    };
    return {
      stars: pick(/([\d,]+) stars/),
      repos: pick(/across ([\d,]+) public/),
      views: pick(/([\d,]+) profile views/),
    };
  } catch {
    return {};
  }
}

function numbersSVG({ stars, repos, views }, font, T) {
  const fmt = (n) => n.toLocaleString("en-US");
  const MAX = 104, // tallest the figures get
    COL = 413, // each column's width; there are two with a 20px gutter
    widthAt = (text, size) =>
      [...text].reduce((w, c) => w + font.glyphs[c].w, 0) * (size / font.size);
  const figs = [fmt(stars), fmt(views)];
  // One size for both figures, so they read as a pair; shrink only if one would overflow.
  const size = Math.min(
    MAX,
    ...figs.map((t) => (MAX * (COL - 8)) / widthAt(t, MAX)),
  );
  const k = size / font.size,
    base = Math.ceil(font.top * k) + 2,
    bar = base + 16,
    H = bar + 40;
  // Each glyph is defined once and placed with <use>, which keeps the file small.
  const ids = new Map();
  const word = (text, x, y, attrs) => {
    let out = "",
      cx = 0;
    for (const c of text) {
      if (!ids.has(c)) ids.set(c, "g" + ids.size);
      out += `<use href="#${ids.get(c)}" transform="translate(${(x + cx).toFixed(2)} ${y}) scale(${k.toFixed(4)})"/>`;
      cx += font.glyphs[c].w * k;
    }
    return `<g ${attrs}>${out}</g>`;
  };
  const mono = `font-family="${MONO}" font-size="10.5" letter-spacing="1.5" fill="${T.fg}"`;
  const cols = [
    {
      x: 0,
      fig: figs[0],
      front: T.a,
      back: T.b,
      label: "TOTAL STARS",
      note: `ACROSS ${fmt(repos)} PUBLIC REPOS`,
    },
    {
      x: COL + 20,
      fig: figs[1],
      front: T.b,
      back: T.a,
      label: "PROFILE VIEWS",
      note: "ALL TIME",
    },
  ];
  let body = "";
  for (const c of cols) {
    // Ink B (or A) offset behind, then the front ink on top, as in the section headings.
    body +=
      word(c.fig, c.x + 4, base + 4, `fill="${c.back}"`) +
      word(c.fig, c.x, base, `fill="${c.front}"`) +
      `<rect fill="${c.front}" x="${c.x}" y="${bar}" width="${COL}" height="6"/>` +
      `<text ${mono} x="${c.x}" y="${bar + 26}">${c.label}</text>` +
      `<text ${mono} x="${c.x + COL}" y="${bar + 26}" text-anchor="end" fill-opacity=".7">${c.note}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 846 ${H}" width="846" height="${H}" role="img" aria-label="${esc(
    `${fmt(stars)} stars across ${fmt(repos)} public repositories. ${fmt(views)} profile views.`,
  )}" style="isolation:isolate"><defs>${[...ids]
    .map(
      ([c, id]) =>
        `<path id="${id}" fill-rule="evenodd" d="${font.glyphs[c].d}"/>`,
    )
    .join("")}</defs>${body}</svg>\n`;
}

async function drawNumbers() {
  const font = JSON.parse(
    fs.readFileSync(path.join(root, "readme/poster/digits.json"), "utf8"),
  );
  const old = previousNumbers(),
    [s, v] = await Promise.allSettled([loadStars(), loadViews()]);
  if (s.status === "rejected")
    console.error("Stars not updated: " + s.reason.message);
  if (v.status === "rejected")
    console.error("Views not updated: " + v.reason.message);
  const n = {
    stars: s.status === "fulfilled" ? s.value.stars : old.stars,
    repos: s.status === "fulfilled" ? s.value.repos : old.repos,
    views: v.status === "fulfilled" ? v.value : old.views,
  };
  if ([n.stars, n.repos, n.views].some((x) => x == null))
    throw new Error("numbers panel: no current or previous figures to draw");
  for (const [name, T] of Object.entries(POSTER))
    write(`poster/numbers.${name}.svg`, numbersSVG(n, font, T));
  if (s.status === "rejected" || v.status === "rejected") process.exitCode = 1;
}

function write(file, content) {
  const target = path.join(root, "readme", file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  console.log("wrote readme/" + file);
}

try {
  await drawNumbers();
} catch (err) {
  console.error("Numbers not updated: " + err.message);
  process.exitCode = 1;
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
