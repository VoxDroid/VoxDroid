/*
 * Writes the GitHub data the site renders, so pages never call the GitHub API at request time:
 *
 *   data/github.json          profile totals, contribution history, languages, activity, one entry per repo
 *   data/readme/<slug>.md     each project's README, kept apart so diffs stay readable
 *
 *   GITHUB_TOKEN=... node scripts/github/snapshot.mjs
 *
 * Projects are the repos named in content/projects/*.md plus any public repo tagged with the
 * `portfolio` topic. No dependencies (Node 22+). The scheduled workflow runs it; files are only
 * rewritten when the data changed, so quiet days make no commit. If GitHub is unreachable the
 * existing snapshot is left untouched and the script exits non-zero.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const login = process.env.README_LOGIN || "VoxDroid";
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const DISCOVERY_TOPIC = "portfolio";

const headers = {
  Authorization: "Bearer " + token,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "portfolio-snapshot",
};

async function graphql(query, variables = {}) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors)
    throw new Error("GraphQL: " + JSON.stringify(json.errors || res.status));
  return json.data;
}

async function rest(route) {
  const res = await fetch("https://api.github.com/" + route, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET ${route} returned ${res.status}`);
  return res.json();
}

/** Public repos the content folder names, read from each file's `repo:` line. Private projects are skipped. */
export function contentRepos(dir = path.join(root, "content/projects")) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .flatMap((f) => {
      const text = fs.readFileSync(path.join(dir, f), "utf8");
      const m = text.match(/^repo:\s*"?([\w.-]+\/[\w.-]+)"?\s*$/m);
      if (!m) throw new Error(`${f} has no repo: line`);
      return /^private:\s*true\s*$/m.test(text) ? [] : [m[1]];
    });
}

/** Current and longest runs of consecutive days with at least one contribution. */
export function streaks(days) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let longest = 0,
    run = 0;
  for (const d of sorted) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // The current streak may still be open today: a zero today does not break it yet.
  let current = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) current++;
    else if (i === sorted.length - 1) continue;
    else break;
  }
  return { current, longest };
}

const REPO_FIELDS = `
  name nameWithOwner description url homepageUrl stargazerCount forkCount isArchived isFork
  createdAt pushedAt
  defaultBranchRef { name }
  primaryLanguage { name color }
  languages(first: 8, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name color } } }
  repositoryTopics(first: 20) { nodes { topic { name } } }
  releases(first: 5, orderBy: { field: CREATED_AT, direction: DESC }) { nodes { tagName name publishedAt url isPrerelease } }
`;

async function loadOwnedRepos() {
  const repos = [];
  let after = null;
  do {
    const data = await graphql(
      `query($login: String!, $after: String) { user(login: $login) {
        repositories(first: 100, after: $after, ownerAffiliations: OWNER, privacy: PUBLIC, orderBy: { field: NAME, direction: ASC }) {
          totalCount pageInfo { hasNextPage endCursor }
          nodes { ${REPO_FIELDS} }
        } } }`,
      { login, after },
    );
    const page = data.user.repositories;
    repos.push(...page.nodes);
    after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (after);
  return repos;
}

async function loadRecentCommits(owner, name) {
  const data = await graphql(
    `
      query ($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 8) {
                  nodes {
                    oid
                    messageHeadline
                    committedDate
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    { owner, name },
  );
  const nodes = data.repository?.defaultBranchRef?.target?.history?.nodes ?? [];
  return nodes.map((c) => ({
    sha: c.oid.slice(0, 7),
    message: c.messageHeadline,
    date: c.committedDate,
    url: c.url,
  }));
}

async function loadContributions(createdAt) {
  const days = [];
  const now = new Date();
  for (
    let year = new Date(createdAt).getUTCFullYear();
    year <= now.getUTCFullYear();
    year++
  ) {
    const from = new Date(Date.UTC(year, 0, 1)).toISOString();
    const to =
      year === now.getUTCFullYear()
        ? now.toISOString()
        : new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();
    const data = await graphql(
      `
        query ($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `,
      { login, from, to },
    );
    for (const w of data.user.contributionsCollection.contributionCalendar
      .weeks)
      for (const d of w.contributionDays)
        days.push({ date: d.date, count: d.contributionCount });
  }
  const unique = [...new Map(days.map((d) => [d.date, d])).values()].sort(
    (a, b) => a.date.localeCompare(b.date),
  );
  const cutoff = new Date(now.getTime() - 364 * 864e5)
    .toISOString()
    .slice(0, 10);
  const lastYear = unique.filter((d) => d.date >= cutoff);
  const weeks = [];
  for (let i = 0; i < lastYear.length; i += 7)
    weeks.push(lastYear.slice(i, i + 7).reduce((s, d) => s + d.count, 0));
  return {
    total: unique.reduce((s, d) => s + d.count, 0),
    lastYear: lastYear.reduce((s, d) => s + d.count, 0),
    weeks,
    ...streaks(unique),
  };
}

const EVENT_TEXT = {
  PushEvent: (e) => `Pushed to ${e.repo.name.split("/")[1]}`,
  CreateEvent: (e) =>
    e.payload.ref_type === "repository"
      ? `Created ${e.repo.name.split("/")[1]}`
      : null,
  ReleaseEvent: (e) =>
    `Released ${e.payload.release?.tag_name ?? "a version"} of ${e.repo.name.split("/")[1]}`,
  PullRequestEvent: (e) =>
    e.payload.action === "closed" && e.payload.pull_request?.merged
      ? `Merged #${e.payload.number} in ${e.repo.name.split("/")[1]}`
      : null,
  IssuesEvent: (e) =>
    e.payload.action === "closed"
      ? `Closed issue #${e.payload.issue?.number} in ${e.repo.name.split("/")[1]}`
      : null,
};

async function loadActivity() {
  const events = (await rest(`users/${login}/events/public?per_page=60`)) ?? [];
  const items = [];
  for (const e of events) {
    const text = EVENT_TEXT[e.type]?.(e);
    if (!text) continue;
    const day = e.created_at.slice(0, 10);
    const last = items[items.length - 1];
    if (last && last.text === text && last.date === day) continue; // collapse repeats on the same day
    items.push({ date: day, text, url: `https://github.com/${e.repo.name}` });
    if (items.length >= 10) break;
  }
  return items;
}

function slugOf(name) {
  return name.toLowerCase();
}

function stable(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

async function main() {
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  const user = (
    await graphql(
      `
        query ($login: String!) {
          user(login: $login) {
            login
            name
            createdAt
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      `,
      { login },
    )
  ).user;
  const owned = await loadOwnedRepos();
  const byName = new Map(owned.map((r) => [r.nameWithOwner.toLowerCase(), r]));

  const wanted = new Set(contentRepos().map((r) => r.toLowerCase()));
  for (const r of owned)
    if (
      !r.isFork &&
      r.repositoryTopics.nodes.some((n) => n.topic.name === DISCOVERY_TOPIC)
    )
      wanted.add(r.nameWithOwner.toLowerCase());

  const repos = {};
  const readmes = {};
  for (const key of [...wanted].sort()) {
    const r = byName.get(key);
    if (!r) {
      console.error(`Skipped ${key}: not a public repo owned by ${login}`);
      continue;
    }
    const slug = slugOf(r.name);
    const [owner, name] = r.nameWithOwner.split("/");
    const readme = await rest(`repos/${r.nameWithOwner}/readme`);
    if (readme?.content)
      readmes[slug] = Buffer.from(readme.content, "base64").toString("utf8");
    repos[slug] = {
      slug,
      repo: r.nameWithOwner,
      name: r.name,
      description: r.description ?? "",
      url: r.url,
      homepage: r.homepageUrl || "",
      stars: r.stargazerCount,
      forks: r.forkCount,
      archived: r.isArchived,
      createdAt: r.createdAt,
      pushedAt: r.pushedAt,
      defaultBranch: r.defaultBranchRef?.name ?? "main",
      language: r.primaryLanguage?.name ?? "",
      languages: r.languages.edges.map((e) => ({
        name: e.node.name,
        color: e.node.color ?? "#888888",
        bytes: e.size,
      })),
      topics: r.repositoryTopics.nodes.map((n) => n.topic.name).sort(),
      releases: r.releases.nodes
        .filter((x) => !x.isPrerelease)
        .map((x) => ({
          tag: x.tagName,
          name: x.name || x.tagName,
          date: x.publishedAt,
          url: x.url,
        })),
      commits: await loadRecentCommits(owner, name),
      readmePath: r.nameWithOwner + "/" + (readme?.path ?? "README.md"),
      hasReadme: Boolean(readme?.content),
    };
  }

  const nonFork = owned.filter((r) => !r.isFork);
  const bytes = new Map();
  for (const r of nonFork)
    for (const e of r.languages.edges)
      bytes.set(e.node.name, (bytes.get(e.node.name) ?? 0) + e.size);
  const totalBytes = [...bytes.values()].reduce((a, b) => a + b, 0) || 1;
  const languages = [...bytes.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, b]) => ({
      name,
      share: Math.round((b / totalBytes) * 1000) / 10,
    }));

  const data = {
    login: user.login,
    profile: {
      createdAt: user.createdAt,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      publicRepos: owned.length,
      stars: nonFork.reduce((s, r) => s + r.stargazerCount, 0),
      forks: nonFork.reduce((s, r) => s + r.forkCount, 0),
    },
    contributions: await loadContributions(user.createdAt),
    languages,
    activity: await loadActivity(),
    repos,
  };

  // Write only what changed; the stamp moves only when the data does.
  const dataFile = path.join(root, "data/github.json");
  const previous = fs.existsSync(dataFile)
    ? JSON.parse(fs.readFileSync(dataFile, "utf8"))
    : null;
  const previousData = { ...(previous ?? {}) };
  delete previousData.generatedAt;
  let changed = 0;
  if (!previous || stable(previousData) !== stable(data)) {
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
    fs.writeFileSync(
      dataFile,
      stable({ generatedAt: new Date().toISOString(), ...data }),
    );
    changed++;
  }
  const readmeDir = path.join(root, "data/readme");
  fs.mkdirSync(readmeDir, { recursive: true });
  // Compare with line endings normalised: a Windows checkout turns LF into CRLF, which is not a change.
  const lf = (s) => s.replace(/\r\n/g, "\n");
  for (const [slug, text] of Object.entries(readmes)) {
    const file = path.join(readmeDir, slug + ".md");
    if (
      !fs.existsSync(file) ||
      lf(fs.readFileSync(file, "utf8")) !== lf(text)
    ) {
      fs.writeFileSync(file, text);
      changed++;
    }
  }
  for (const f of fs.readdirSync(readmeDir))
    if (!(f.replace(/\.md$/, "") in readmes))
      fs.rmSync(path.join(readmeDir, f));
  console.log(
    `Snapshot: ${Object.keys(repos).length} repos, ${changed} file(s) updated.`,
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((err) => {
    console.error("Snapshot not updated: " + err.message);
    process.exitCode = 1;
  });
}
