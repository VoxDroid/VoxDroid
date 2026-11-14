/*
 * Writes the "recent activity" digest into every README edition, between
 *   <!--RECENT_ACTIVITY:start-->  and  <!--RECENT_ACTIVITY:end-->
 *
 *   GITHUB_TOKEN=... node scripts/readme/activity.mjs
 *
 * It reads public activity only, so private repositories never show up. Events are
 * grouped (six merged pull requests become one line), and commit counts come from the
 * contributions API because push events no longer list their commits.
 * The "Updated" stamp carries the time, so every run changes the files and produces a commit.
 * No dependencies (Node 18+).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WINDOW_DAYS = 14; // how far back to look
const MAX_ROWS = 7; // how many lines to show
const TITLE_LIMIT = 72; // longer titles are cut with an ellipsis
const QUIET = "Building quietly."; // shown when there is nothing in the window

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const login = process.env.README_LOGIN || "VoxDroid";
const zone = process.env.README_TZ || "Asia/Tokyo";
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const since = new Date(Date.now() - WINDOW_DAYS * 864e5);

const headers = {
  Authorization: "Bearer " + token,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "readme-activity",
};

async function rest(route) {
  const res = await fetch("https://api.github.com/" + route, { headers });
  if (!res.ok) throw new Error(`GET ${route} returned ${res.status}`);
  return res.json();
}

async function graphql(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors)
    throw new Error("GraphQL: " + JSON.stringify(json.errors || res.status));
  return json.data;
}

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const link = (text, url) => `<a href="${esc(url)}">${esc(text)}</a>`;
const clip = (s) =>
  s.length > TITLE_LIMIT ? s.slice(0, TITLE_LIMIT - 1).trimEnd() + "…" : s;
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const repoLink = (name) =>
  link(
    name.startsWith(login + "/") ? name.slice(login.length + 1) : name,
    "https://github.com/" + name,
  );
const day = new Intl.DateTimeFormat("en-US", {
  timeZone: zone,
  month: "short",
  day: "numeric",
});
const fullDay = new Intl.DateTimeFormat("en-US", {
  timeZone: zone,
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

/* ---- collect ---- */

async function publicEvents() {
  const all = [];
  for (let page = 1; page <= 3; page++) {
    const batch = await rest(
      `users/${login}/events/public?per_page=100&page=${page}`,
    );
    all.push(...batch);
    if (
      batch.length < 100 ||
      new Date(batch[batch.length - 1].created_at) < since
    )
      break;
  }
  return all.filter((e) => new Date(e.created_at) >= since);
}

async function commitsByRepo() {
  const data = await graphql(
    `
      query ($login: String!, $from: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from) {
            commitContributionsByRepository(maxRepositories: 25) {
              repository {
                nameWithOwner
                isPrivate
              }
              contributions(first: 100) {
                nodes {
                  occurredAt
                  commitCount
                }
              }
            }
          }
        }
      }
    `,
    { login, from: since.toISOString() },
  );
  return data.user.contributionsCollection.commitContributionsByRepository
    .filter(
      (r) =>
        !r.repository.isPrivate &&
        r.contributions.nodes.length &&
        // the profile repository is mostly this workflow committing to itself
        r.repository.nameWithOwner.toLowerCase() !==
          `${login}/${login}`.toLowerCase(),
    )
    .map((r) => ({
      repo: r.repository.nameWithOwner,
      count: r.contributions.nodes.reduce((a, n) => a + n.commitCount, 0),
      when: new Date(
        Math.max(...r.contributions.nodes.map((n) => +new Date(n.occurredAt))),
      ),
    }));
}

/* ---- group ---- */

// kind|repo -> entries, newest first. Each entry: { when, label, url, title? }
const groups = new Map();
function add(kind, repo, entry) {
  const key = kind + "|" + repo;
  if (!groups.has(key)) groups.set(key, { kind, repo, entries: [] });
  groups.get(key).entries.push(entry);
}

function collect(events) {
  const pulls = new Map(); // one pull request can appear as opened, then merged: keep its final state
  for (const e of events) {
    const when = new Date(e.created_at),
      repo = e.repo.name,
      p = e.payload;
    if (e.type === "ReleaseEvent" && p.action === "published") {
      add("release", repo, {
        when,
        label: p.release.tag_name,
        url: p.release.html_url,
      });
    } else if (e.type === "PullRequestEvent") {
      const merged =
        p.action === "merged" ||
        (p.action === "closed" && p.pull_request && p.pull_request.merged);
      const state = merged ? "merged" : p.action === "opened" ? "opened" : null;
      if (!state) continue;
      const key = repo + "#" + p.number,
        seen = pulls.get(key);
      if (!seen || (state === "merged" && seen.state !== "merged"))
        pulls.set(key, {
          state,
          repo,
          when: seen && state !== "merged" ? seen.when : when,
          number: p.number,
        });
    } else if (
      e.type === "IssuesEvent" &&
      (p.action === "opened" || p.action === "closed")
    ) {
      add(p.action === "opened" ? "issueOpened" : "issueClosed", repo, {
        when,
        label: "#" + p.issue.number,
        url: p.issue.html_url,
        title: p.issue.title,
      });
    } else if (e.type === "PullRequestReviewEvent" && p.pull_request) {
      add("reviewed", repo, {
        when,
        label: "#" + p.pull_request.number,
        url: `https://github.com/${repo}/pull/${p.pull_request.number}`,
      });
    } else if (e.type === "CreateEvent" && p.ref_type === "repository") {
      add("created", repo, { when });
    }
  }
  for (const pr of pulls.values())
    add(pr.state === "merged" ? "merged" : "prOpened", pr.repo, {
      when: pr.when,
      label: "#" + pr.number,
      url: `https://github.com/${pr.repo}/pull/${pr.number}`,
      number: pr.number,
    });
  for (const g of groups.values()) g.entries.sort((a, b) => b.when - a.when);
}

/* ---- write ---- */

const WORDING = {
  release: (r, n, first) =>
    n === 1
      ? `Released ${first} of ${r}`
      : `Released ${n} versions of ${r}, latest ${first}`,
  merged: (r, n, first) =>
    n === 1
      ? `Merged ${first} in ${r}`
      : `Merged ${n} pull requests in ${r}, latest ${first}`,
  prOpened: (r, n, first) =>
    n === 1
      ? `Opened ${first} in ${r}`
      : `Opened ${n} pull requests in ${r}, latest ${first}`,
  issueClosed: (r, n, first) =>
    n === 1
      ? `Closed ${first} in ${r}`
      : `Closed ${n} issues in ${r}, latest ${first}`,
  issueOpened: (r, n, first) =>
    n === 1
      ? `Opened ${first} in ${r}`
      : `Opened ${n} issues in ${r}, latest ${first}`,
  reviewed: (r, n, first) =>
    n === 1
      ? `Reviewed ${first} in ${r}`
      : `Reviewed ${n} pull requests in ${r}, latest ${first}`,
  created: (r) => `Created ${r}`,
  commits: (r, n) => `Pushed ${plural(n, "commit", "commits")} to ${r}`,
};

async function describe(g) {
  const first = g.entries[0];
  // Pull request events no longer carry a title, so look up the one that gets shown.
  if (first.number && !first.title) {
    try {
      first.title = (await rest(`repos/${g.repo}/pulls/${first.number}`)).title;
    } catch {
      /* the line still reads fine without a title */
    }
  }
  const ref = first.label
    ? link(first.label, first.url) +
      (first.title ? " " + esc(clip(first.title)) : "")
    : "";
  const n = g.kind === "commits" ? first.count : g.entries.length;
  return {
    when: first.when,
    html: WORDING[g.kind](repoLink(g.repo), n, ref),
  };
}

function summary(total) {
  const parts = [
    total.commits && plural(total.commits, "commit", "commits"),
    total.merged &&
      plural(total.merged, "pull request merged", "pull requests merged"),
    total.issueClosed &&
      plural(total.issueClosed, "issue closed", "issues closed"),
    total.release && plural(total.release, "release", "releases"),
  ].filter(Boolean);
  return parts.length
    ? `Last ${WINDOW_DAYS} days: ${parts.join(", ")}.`
    : `Nothing public in the last ${WINDOW_DAYS} days.`;
}

async function build() {
  collect(await publicEvents());
  try {
    for (const c of await commitsByRepo())
      add("commits", c.repo, { when: c.when, count: c.count });
  } catch (err) {
    console.error("Commit counts skipped: " + err.message);
  }

  const total = { commits: 0, merged: 0, issueClosed: 0, release: 0 };
  for (const g of groups.values())
    if (g.kind in total)
      total[g.kind] +=
        g.kind === "commits" ? g.entries[0].count : g.entries.length;

  const newest = [...groups.values()]
    .sort((a, b) => b.entries[0].when - a.entries[0].when)
    .slice(0, MAX_ROWS);
  const rows = [];
  for (const g of newest) rows.push(await describe(g));

  const body = rows.length
    ? "<table>\n" +
      rows
        .map(
          (r) =>
            `<tr><td>${day.format(r.when).replace(" ", "&nbsp;")}</td><td>${r.html}</td></tr>`,
        )
        .join("\n") +
      "\n</table>"
    : `<p>${QUIET}</p>`;
  return `${body}\n<sub>${summary(total)} Updated ${fullDay.format(new Date())}.</sub>`;
}

const MARKED =
  /(<!--RECENT_ACTIVITY:start-->)([\s\S]*?)(<!--RECENT_ACTIVITY:end-->)/;

function targets() {
  const files = [path.join(root, "README.md")];
  const backups = path.join(root, "readme", "backups");
  if (fs.existsSync(backups))
    for (const f of fs.readdirSync(backups))
      if (f.endsWith(".md")) files.push(path.join(backups, f));
  return files.filter((f) => fs.existsSync(f));
}

try {
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  const block = await build();
  let changed = 0;
  for (const file of targets()) {
    const text = fs.readFileSync(file, "utf8");
    const found = text.match(MARKED);
    if (!found) continue;
    fs.writeFileSync(
      file,
      text.replace(MARKED, (_, a, __, c) => `${a}\n${block}\n${c}`),
    );
    changed++;
    console.log("updated " + path.relative(root, file));
  }
  if (!changed) console.log("No README has the activity markers.");
} catch (err) {
  // Keep whatever is already in the README rather than replacing it with an error.
  console.error("Activity not updated: " + err.message);
  process.exitCode = 1;
}
