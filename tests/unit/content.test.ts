import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { splitFrontmatter } from "@/lib/content/frontmatter";
import { getSnapshot } from "@/lib/content/github";
import { getProjects } from "@/lib/content/projects";
import { projectFrontmatter, siteSchema } from "@/lib/content/schema";

const root = process.cwd();
const files = fs
  .readdirSync(path.join(root, "content/projects"))
  .filter((f) => f.endsWith(".md"));
const publicFile = (p: string) => path.join(root, "public", p);

describe("site content", () => {
  it("matches the schema", () => {
    const result = siteSchema.safeParse(site);
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error.issues, null, 2),
    ).toBe(true);
  });

  it("links only to https URLs", () => {
    for (const l of site.links) expect(l.href).toMatch(/^https:\/\//);
    for (const c of site.certifications) expect(c.href).toMatch(/^https:\/\//);
  });
});

describe("project content files", () => {
  it("has at least one project", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s has valid front matter", (file) => {
    const { data } = splitFrontmatter(
      fs.readFileSync(path.join(root, "content/projects", file), "utf8"),
    );
    const result = projectFrontmatter.safeParse(data);
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error.issues),
    ).toBe(true);
  });

  it.each(files)(
    "%s names a slug that matches its repo and only files that exist",
    (file) => {
      const { data } = splitFrontmatter(
        fs.readFileSync(path.join(root, "content/projects", file), "utf8"),
      );
      const fm = projectFrontmatter.parse(data);
      expect(file.replace(/\.md$/, "")).toBe(
        fm.repo.split("/")[1]!.toLowerCase(),
      );
      if (fm.logo)
        expect(fs.existsSync(publicFile(fm.logo)), fm.logo).toBe(true);
      for (const shot of fm.screenshots)
        expect(fs.existsSync(publicFile(shot)), shot).toBe(true);
      if (fm.private)
        expect(
          fm.summary,
          "private projects need their own summary",
        ).toBeTruthy();
    },
  );

  it("ranks featured projects 1..n with no gaps or duplicates", () => {
    const ranks = getProjects()
      .map((p) => p.featured)
      .filter((r): r is number => r !== null)
      .sort((a, b) => a - b);
    expect(ranks).toEqual(ranks.map((_, i) => i + 1));
  });
});

describe("merged projects", () => {
  const projects = getProjects();

  it("have unique slugs", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it("every public project has GitHub data and every private one has none", () => {
    for (const p of projects) {
      if (p.private) {
        expect(p.url).toBeNull();
        expect(p.stars).toBeNull();
        expect(p.status).toBe("private");
      } else {
        expect(p.url, p.slug).toMatch(/^https:\/\/github\.com\//);
        expect(p.stars, p.slug).not.toBeNull();
      }
    }
  });

  it("every project has something to say about itself", () => {
    for (const p of projects)
      expect(p.summary.length, p.slug).toBeGreaterThan(10);
  });

  it("art flags match files on disk", () => {
    for (const p of projects) {
      const dir = publicFile(`/art/projects/${p.slug}`);
      for (const f of [
        "riso-key.svg",
        "riso-warm.svg",
        "xerox.webp",
        "cyan.webp",
      ])
        expect(fs.existsSync(path.join(dir, f)), `${p.slug}/${f}`).toBe(p.art);
    }
  });

  it("third-party emblems are never turned into artwork", () => {
    expect(projects.find((p) => p.slug === "web-inventory")?.art).toBe(false);
  });

  it("every image a page will size is recorded", () => {
    const sizes = JSON.parse(
      fs.readFileSync(path.join(root, "data/image-sizes.json"), "utf8"),
    ) as Record<string, [number, number]>;
    for (const p of projects)
      for (const shot of p.screenshots) expect(sizes[shot], shot).toBeDefined();
  });
});

describe("GitHub snapshot", () => {
  it("is valid and plausible", () => {
    const s = getSnapshot();
    expect(s.profile.publicRepos).toBeGreaterThan(0);
    expect(s.contributions.weeks.length).toBeGreaterThanOrEqual(52);
    expect(s.contributions.longest).toBeGreaterThanOrEqual(
      s.contributions.current,
    );
    expect(Object.keys(s.repos).length).toBeGreaterThan(0);
  });

  it("has a README file for every repo that says it has one", () => {
    for (const r of Object.values(getSnapshot().repos))
      expect(
        fs.existsSync(path.join(root, "data/readme", r.slug + ".md")),
        r.slug,
      ).toBe(r.hasReadme);
  });
});
