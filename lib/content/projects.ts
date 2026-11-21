import fs from "node:fs";
import path from "node:path";
import { splitFrontmatter } from "./frontmatter";
import {
  projectFrontmatter,
  type Category,
  type RepoSnapshot,
  type Snapshot,
} from "./schema";
import { getSnapshot } from "./github";

export type ProjectStatus = "active" | "maintained" | "archived" | "private";

export type Project = {
  slug: string;
  name: string;
  repo: string;
  /** GitHub page, or null for private repositories. */
  url: string | null;
  private: boolean;
  category: Category;
  /** Featured rank (1 = first), or null when not featured. */
  featured: number | null;
  tagline: string | null;
  summary: string;
  logo: string | null;
  /** Whether print artwork exists under /art/projects/<slug>/. */
  art: boolean;
  demo: string | null;
  homepage: string | null;
  screenshots: string[];
  stars: number | null;
  forks: number | null;
  language: string | null;
  languages: { name: string; color: string; share: number }[];
  topics: string[];
  releases: RepoSnapshot["releases"];
  commits: RepoSnapshot["commits"];
  createdAt: string | null;
  pushedAt: string | null;
  status: ProjectStatus;
  /** The project's own write-up (Markdown body of its content file). */
  writeup: string;
  hasReadme: boolean;
  readmePath: string | null;
  defaultBranch: string | null;
  /** "content" when a file in content/projects names it, "discovered" when found by GitHub topic. */
  source: "content" | "discovered";
};

const DAY = 864e5;

/** Active: pushed within 90 days. Maintained: within a year. Otherwise, or when archived on GitHub: archived. */
export function statusOf(
  repo: Pick<RepoSnapshot, "archived" | "pushedAt"> | null,
  now: Date,
): ProjectStatus {
  if (!repo) return "private";
  if (repo.archived) return "archived";
  const age = (now.getTime() - new Date(repo.pushedAt).getTime()) / DAY;
  if (age <= 90) return "active";
  if (age <= 365) return "maintained";
  return "archived";
}

/** Featured projects first by rank, then by stars, then by name. */
export function compareProjects(a: Project, b: Project) {
  if (a.featured !== null || b.featured !== null) {
    if (a.featured === null) return 1;
    if (b.featured === null) return -1;
    if (a.featured !== b.featured) return a.featured - b.featured;
  }
  const stars = (b.stars ?? -1) - (a.stars ?? -1);
  return stars !== 0 ? stars : a.name.localeCompare(b.name);
}

function shares(repo: RepoSnapshot) {
  const total = repo.languages.reduce((s, l) => s + l.bytes, 0) || 1;
  return repo.languages.map((l) => ({
    name: l.name,
    color: l.color,
    share: Math.round((l.bytes / total) * 1000) / 10,
  }));
}

const root = process.cwd();
const contentDir = path.join(root, "content/projects");

function artManifest(): Record<string, string> {
  const file = path.join(root, "data/art-manifest.json");
  return fs.existsSync(file)
    ? (JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, string>)
    : {};
}

/** Builds the project list from content files, the GitHub snapshot and the art manifest. */
export function buildProjects(input: {
  files: { slug: string; text: string }[];
  snapshot: Snapshot;
  art: Record<string, string>;
  now: Date;
}): Project[] {
  const { files, snapshot, art, now } = input;
  const named = new Set<string>();
  const projects: Project[] = files.map(({ slug, text }) => {
    const { data, body } = splitFrontmatter(text);
    const parsed = projectFrontmatter.safeParse(data);
    if (!parsed.success)
      throw new Error(
        `content/projects/${slug}.md: ${parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`,
      );
    const fm = parsed.data;
    const repo = fm.private
      ? null
      : (snapshot.repos[fm.repo.split("/")[1]!.toLowerCase()] ?? null);
    named.add(fm.repo.toLowerCase());
    return {
      slug,
      name: fm.name,
      repo: fm.repo,
      url: fm.private ? null : `https://github.com/${fm.repo}`,
      private: fm.private,
      category: fm.category,
      featured: fm.featured ?? null,
      tagline: fm.tagline ?? null,
      summary: fm.summary ?? repo?.description ?? "",
      logo: fm.logo ?? null,
      art: fm.artwork !== false && `project:${slug}` in art,
      demo: fm.demo ?? null,
      homepage: repo?.homepage || null,
      screenshots: fm.screenshots,
      stars: repo?.stars ?? null,
      forks: repo?.forks ?? null,
      language: repo?.language || null,
      languages: repo ? shares(repo) : [],
      topics: repo?.topics ?? [],
      releases: repo?.releases ?? [],
      commits: repo?.commits ?? [],
      createdAt: repo?.createdAt ?? null,
      pushedAt: repo?.pushedAt ?? null,
      status: statusOf(repo, now),
      writeup: body,
      hasReadme: repo?.hasReadme ?? false,
      readmePath: repo?.readmePath ?? null,
      defaultBranch: repo?.defaultBranch ?? null,
      source: "content",
    };
  });

  // Repos tagged `portfolio` on GitHub that no content file names yet.
  for (const repo of Object.values(snapshot.repos)) {
    if (named.has(repo.repo.toLowerCase())) continue;
    projects.push({
      slug: repo.slug,
      name: repo.name,
      repo: repo.repo,
      url: repo.url,
      private: false,
      category: "Other",
      featured: null,
      tagline: null,
      summary: repo.description,
      logo: null,
      art: false,
      demo: null,
      homepage: repo.homepage || null,
      screenshots: [],
      stars: repo.stars,
      forks: repo.forks,
      language: repo.language || null,
      languages: shares(repo),
      topics: repo.topics,
      releases: repo.releases,
      commits: repo.commits,
      createdAt: repo.createdAt,
      pushedAt: repo.pushedAt,
      status: statusOf(repo, now),
      writeup: "",
      hasReadme: repo.hasReadme,
      readmePath: repo.readmePath,
      defaultBranch: repo.defaultBranch,
      source: "discovered",
    });
  }
  return projects.sort(compareProjects);
}

let cached: Project[] | null = null;

/** All projects, sorted. Cached for the life of a production server process. */
export function getProjects(): Project[] {
  if (cached && process.env.NODE_ENV === "production") return cached;
  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => ({
      slug: f.replace(/\.md$/, ""),
      text: fs.readFileSync(path.join(contentDir, f), "utf8"),
    }));
  cached = buildProjects({
    files,
    snapshot: getSnapshot(),
    art: artManifest(),
    now: new Date(),
  });
  return cached;
}

export function getProject(slug: string): Project | null {
  return getProjects().find((p) => p.slug === slug) ?? null;
}

export function getReadme(slug: string): string | null {
  if (!/^[a-z0-9._-]+$/.test(slug)) return null;
  const file = path.join(root, "data/readme", slug + ".md");
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}
