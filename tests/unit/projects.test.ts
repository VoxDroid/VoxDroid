import { describe, expect, it } from "vitest";
import {
  buildProjects,
  compareProjects,
  statusOf,
  type Project,
} from "@/lib/content/projects";
import type { Snapshot } from "@/lib/content/schema";

const NOW = new Date("2026-11-21T00:00:00Z");
const daysAgo = (n: number) =>
  new Date(NOW.getTime() - n * 864e5).toISOString();

function repo(
  name: string,
  overrides: Partial<Snapshot["repos"][string]> = {},
): Snapshot["repos"][string] {
  return {
    slug: name.toLowerCase(),
    repo: `Owner/${name}`,
    name,
    description: `${name} does things.`,
    url: `https://github.com/Owner/${name}`,
    homepage: "",
    stars: 1,
    forks: 0,
    archived: false,
    createdAt: daysAgo(400),
    pushedAt: daysAgo(10),
    defaultBranch: "main",
    language: "Rust",
    languages: [
      { name: "Rust", color: "#dea584", bytes: 750 },
      { name: "Shell", color: "#89e051", bytes: 250 },
    ],
    topics: [],
    releases: [],
    commits: [],
    readmePath: `Owner/${name}/README.md`,
    hasReadme: true,
    ...overrides,
  };
}

function snapshot(repos: Snapshot["repos"][string][]): Snapshot {
  return {
    generatedAt: NOW.toISOString(),
    login: "Owner",
    profile: {
      createdAt: daysAgo(2000),
      followers: 1,
      following: 1,
      publicRepos: 9,
      stars: 3,
      forks: 0,
    },
    contributions: {
      total: 10,
      lastYear: 5,
      weeks: [1, 2],
      current: 1,
      longest: 2,
    },
    languages: [],
    activity: [],
    repos: Object.fromEntries(repos.map((r) => [r.slug, r])),
  };
}

const file = (slug: string, fm: string, body = "") => ({
  slug,
  text: `---\n${fm}\n---\n${body}`,
});

describe("statusOf", () => {
  it("is private without GitHub data", () =>
    expect(statusOf(null, NOW)).toBe("private"));
  it("is archived when GitHub says so, however recent", () =>
    expect(statusOf({ archived: true, pushedAt: daysAgo(1) }, NOW)).toBe(
      "archived",
    ));
  it("is active up to 90 days", () => {
    expect(statusOf({ archived: false, pushedAt: daysAgo(90) }, NOW)).toBe(
      "active",
    );
    expect(statusOf({ archived: false, pushedAt: daysAgo(91) }, NOW)).toBe(
      "maintained",
    );
  });
  it("is maintained up to a year, then archived", () => {
    expect(statusOf({ archived: false, pushedAt: daysAgo(365) }, NOW)).toBe(
      "maintained",
    );
    expect(statusOf({ archived: false, pushedAt: daysAgo(366) }, NOW)).toBe(
      "archived",
    );
  });
});

describe("buildProjects", () => {
  const snap = snapshot([
    repo("Alpha", { stars: 5 }),
    repo("Beta", { stars: 50 }),
    repo("Gamma", { stars: 7, topics: ["portfolio"] }),
  ]);

  it("merges content with GitHub data and orders featured first", () => {
    const projects = buildProjects({
      files: [
        file(
          "alpha",
          'repo: "Owner/Alpha"\nname: "Alpha"\ncategory: "CLI Tool"\nfeatured: 1\nlogo: "/a.png"',
          "A write-up.",
        ),
        file("beta", 'repo: "Owner/Beta"\nname: "Beta"\ncategory: "Web App"'),
      ],
      snapshot: snap,
      art: { "project:alpha": "x" },
      now: NOW,
    });
    expect(projects.map((p) => p.slug)).toEqual(["alpha", "beta", "gamma"]);
    const alpha = projects[0]!;
    expect(alpha).toMatchObject({
      featured: 1,
      stars: 5,
      status: "active",
      art: true,
      writeup: "A write-up.",
      source: "content",
    });
    expect(alpha.languages).toEqual([
      { name: "Rust", color: "#dea584", share: 75 },
      { name: "Shell", color: "#89e051", share: 25 },
    ]);
    expect(projects[1]!.art).toBe(false);
  });

  it("adds repos found by topic that no file names", () => {
    const projects = buildProjects({
      files: [],
      snapshot: snap,
      art: {},
      now: NOW,
    });
    expect(
      projects.every(
        (p) => p.source === "discovered" && p.category === "Other",
      ),
    ).toBe(true);
    expect(projects.map((p) => p.slug)).toEqual(["beta", "gamma", "alpha"]);
  });

  it("keeps private projects away from GitHub data", () => {
    const [p] = buildProjects({
      files: [
        file(
          "alpha",
          'repo: "Owner/Alpha"\nname: "Alpha"\ncategory: "Web App"\nprivate: true\nsummary: "Secret."',
        ),
      ],
      snapshot: snapshot([]),
      art: {},
      now: NOW,
    });
    expect(p).toMatchObject({
      url: null,
      stars: null,
      status: "private",
      summary: "Secret.",
      hasReadme: false,
    });
  });

  it("prefers a summary from the file over the GitHub description", () => {
    const projects = buildProjects({
      files: [
        file(
          "alpha",
          'repo: "Owner/Alpha"\nname: "Alpha"\ncategory: "Web App"\nsummary: "Mine."',
        ),
      ],
      snapshot: snap,
      art: {},
      now: NOW,
    });
    expect(projects.find((p) => p.slug === "alpha")!.summary).toBe("Mine.");
    expect(projects.find((p) => p.slug === "beta")!.summary).toBe(
      "Beta does things.",
    );
  });

  it("never draws art for a project that opts out", () => {
    const projects = buildProjects({
      files: [
        file(
          "alpha",
          'repo: "Owner/Alpha"\nname: "Alpha"\ncategory: "Web App"\nartwork: false',
        ),
      ],
      snapshot: snap,
      art: { "project:alpha": "x" },
      now: NOW,
    });
    expect(projects.find((p) => p.slug === "alpha")!.art).toBe(false);
  });

  it("names the file and field when front matter is wrong", () => {
    expect(() =>
      buildProjects({
        files: [file("bad", 'repo: "nope"\nname: "Bad"\ncategory: "Toaster"')],
        snapshot: snap,
        art: {},
        now: NOW,
      }),
    ).toThrow(/content\/projects\/bad\.md: .*repo.*category/);
  });

  it("rejects unknown front matter keys", () => {
    expect(() =>
      buildProjects({
        files: [
          file(
            "x",
            'repo: "Owner/Alpha"\nname: "X"\ncategory: "Web App"\nfeatuerd: 1',
          ),
        ],
        snapshot: snap,
        art: {},
        now: NOW,
      }),
    ).toThrow(/featuerd/);
  });
});

describe("compareProjects", () => {
  const p = (name: string, featured: number | null, stars: number | null) =>
    ({ name, featured, stars }) as Project;
  it("orders featured by rank, then stars, then name", () => {
    const list = [
      p("b", null, 5),
      p("a", null, 5),
      p("z", 2, 0),
      p("y", 1, 0),
      p("c", null, 9),
      p("d", null, null),
    ];
    expect(list.sort(compareProjects).map((x) => x.name)).toEqual([
      "y",
      "z",
      "c",
      "a",
      "b",
      "d",
    ]);
  });
});
