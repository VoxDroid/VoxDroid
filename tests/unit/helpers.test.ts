import { describe, expect, it } from "vitest";
import { splitFrontmatter } from "@/lib/content/frontmatter";
import { DEFAULT_EDITION, EDITIONS, parseEdition } from "@/lib/editions";
import { filterItem } from "@/lib/filter-attributes";
import {
  applyFilters,
  DEFAULT_FILTERS,
  filtersFromParams,
  filtersToQuery,
} from "@/lib/filters";
import {
  certificationMeta,
  formatDate,
  formatNumber,
  pad2,
  roman,
  yearOf,
} from "@/lib/format";
import { stagesFor } from "@/lib/lineup";
import { resolveReadmeUrl } from "@/lib/markdown-urls";
import { seedOf, tilt, tornEdge } from "@/lib/paste-up";
import rehypeLabelLinks, { describeHref } from "@/lib/rehype-label-links";
import { contentRepos, streaks } from "../../scripts/github/snapshot.mjs";

describe("splitFrontmatter", () => {
  it("parses YAML and trims the body", () => {
    expect(
      splitFrontmatter('---\nname: "A"\nlist:\n  - 1\n---\n\nBody text\n'),
    ).toEqual({ data: { name: "A", list: [1] }, body: "Body text" });
  });
  it("handles Windows line endings", () => {
    expect(splitFrontmatter("---\r\na: 1\r\n---\r\nhi").data).toEqual({ a: 1 });
  });
  it("treats a file without front matter as all body", () => {
    expect(splitFrontmatter("just text")).toEqual({
      data: {},
      body: "just text",
    });
  });
  it("treats empty front matter as an empty object", () => {
    expect(splitFrontmatter("---\n\n---\nx").data).toEqual({});
  });
});

describe("editions", () => {
  it("accepts only known editions", () => {
    for (const e of EDITIONS) expect(parseEdition(e)).toBe(e);
    for (const bad of [
      "",
      "Two-Inks",
      "two inks",
      null,
      undefined,
      3,
      "__proto__",
    ])
      expect(parseEdition(bad)).toBeNull();
  });
  it("defaults to a real edition", () =>
    expect(EDITIONS).toContain(DEFAULT_EDITION));
});

describe("format", () => {
  it("formats numbers and dates the same everywhere", () => {
    expect(formatNumber(1196812)).toBe("1,196,812");
    expect(formatDate("2026-11-20T23:30:00Z")).toBe("Nov 20, 2026");
    expect(yearOf("2021-02-01T03:47:48Z")).toBe(2021);
    expect(pad2(7)).toBe("07");
  });
  it("describes a certification, keeping the ID with its number", () => {
    expect(
      certificationMeta({
        issuer: "Cisco",
        date: "April 2026",
        id: "w9war-H9Qu",
      }),
    ).toBe("Cisco · April 2026 · ID w9war-H9Qu");
  });
  it("writes Roman numerals", () => {
    expect([1, 2, 4, 9, 11, 14, 19, 23, 39].map(roman)).toEqual([
      "i",
      "ii",
      "iv",
      "ix",
      "xi",
      "xiv",
      "xix",
      "xxiii",
      "xxxix",
    ]);
  });
});

describe("resolveReadmeUrl", () => {
  const ctx = {
    repo: "VoxDroid/krnr",
    branch: "main",
    readmePath: "VoxDroid/krnr/README.md",
  };
  const nested = { ...ctx, readmePath: "VoxDroid/krnr/docs/README.md" };
  it("points relative images at raw files", () => {
    expect(resolveReadmeUrl("assets/logo.png", "image", ctx)).toBe(
      "https://raw.githubusercontent.com/VoxDroid/krnr/main/assets/logo.png",
    );
    expect(resolveReadmeUrl("./img/a b.png", "image", ctx)).toBe(
      "https://raw.githubusercontent.com/VoxDroid/krnr/main/img/a%20b.png",
    );
  });
  it("resolves against the README's folder and handles ..", () => {
    expect(resolveReadmeUrl("shot.png", "image", nested)).toBe(
      "https://raw.githubusercontent.com/VoxDroid/krnr/main/docs/shot.png",
    );
    expect(resolveReadmeUrl("../LICENSE", "link", nested)).toBe(
      "https://github.com/VoxDroid/krnr/blob/main/LICENSE",
    );
    expect(resolveReadmeUrl("/docs/x.md#usage", "link", nested)).toBe(
      "https://github.com/VoxDroid/krnr/blob/main/docs/x.md#usage",
    );
  });
  it("keeps absolute, anchor and mail links", () => {
    expect(resolveReadmeUrl("https://example.com/a", "link", ctx)).toBe(
      "https://example.com/a",
    );
    expect(resolveReadmeUrl("#install", "link", ctx)).toBe("#install");
    expect(resolveReadmeUrl("mailto:a@b.c", "link", ctx)).toBe("mailto:a@b.c");
  });
  it("drops dangerous or protocol-relative URLs", () => {
    expect(resolveReadmeUrl("javascript:alert(1)", "link", ctx)).toBe("");
    expect(resolveReadmeUrl("data:text/html,hi", "image", ctx)).toBe("");
    expect(resolveReadmeUrl("//evil.example/x.png", "image", ctx)).toBe("");
  });
});

describe("project filters", () => {
  const items = [
    filterItem({
      slug: "a",
      name: "Alpha",
      category: "CLI Tool",
      status: "active",
      stars: 3,
      pushedAt: "2026-01-01T00:00:00Z",
      language: "Go",
      topics: ["cli"],
      summary: "A tool",
    }),
    filterItem({
      slug: "b",
      name: "beta",
      category: "Web App",
      status: "archived",
      stars: 10,
      pushedAt: "2025-01-01T00:00:00Z",
      language: "PHP",
      topics: [],
      summary: "Site",
    }),
    filterItem({
      slug: "c",
      name: "Charlie",
      category: "CLI Tool",
      status: "private",
      stars: null,
      pushedAt: null,
      language: null,
      topics: [],
      summary: "Hidden",
    }),
  ];
  it("keeps server order by default", () =>
    expect(applyFilters(items, DEFAULT_FILTERS)).toEqual(["a", "b", "c"]));
  it("filters by category, status and search text", () => {
    expect(
      applyFilters(items, { ...DEFAULT_FILTERS, category: "CLI Tool" }),
    ).toEqual(["a", "c"]);
    expect(
      applyFilters(items, { ...DEFAULT_FILTERS, status: "archived" }),
    ).toEqual(["b"]);
    expect(applyFilters(items, { ...DEFAULT_FILTERS, q: "  GO " })).toEqual([
      "a",
    ]);
    expect(
      applyFilters(items, { ...DEFAULT_FILTERS, q: "nothing like this" }),
    ).toEqual([]);
  });
  it("sorts by stars, recency and name", () => {
    expect(applyFilters(items, { ...DEFAULT_FILTERS, sort: "stars" })).toEqual([
      "b",
      "a",
      "c",
    ]);
    expect(
      applyFilters(items, { ...DEFAULT_FILTERS, sort: "updated" }),
    ).toEqual(["a", "b", "c"]);
    expect(applyFilters(items, { ...DEFAULT_FILTERS, sort: "name" })).toEqual([
      "a",
      "b",
      "c",
    ]);
  });
  it("round-trips through the URL and ignores unknown sorts", () => {
    const state = {
      q: "x y",
      category: "Web App",
      status: "active",
      sort: "stars",
    };
    expect(
      filtersFromParams(new URLSearchParams(filtersToQuery(state))),
    ).toEqual(state);
    expect(filtersFromParams(new URLSearchParams("sort=evil"))).toEqual(
      DEFAULT_FILTERS,
    );
    expect(filtersToQuery(DEFAULT_FILTERS)).toBe("");
  });
});

describe("lineup stages", () => {
  it("groups by category in order and drops empty stages", () => {
    const stages = stagesFor([
      { category: "CLI Tool" as const, id: 1 },
      { category: "Web App" as const, id: 2 },
      { category: "iOS App" as const, id: 3 },
    ]);
    expect(stages.map((s) => [s.name, s.projects.map((p) => p.id)])).toEqual([
      ["Apps", [2, 3]],
      ["CLI & dev tools", [1]],
    ]);
  });
});

describe("paste-up shapes", () => {
  it("are deterministic and within bounds", () => {
    expect(tilt(5, 2)).toBe(tilt(5, 2));
    expect(Math.abs(parseFloat(tilt(5, 2)))).toBeLessThanOrEqual(2);
    expect(tornEdge(9)).toBe(tornEdge(9));
    expect(tornEdge(9)).toMatch(/^polygon\(/);
    expect(seedOf("krnr")).toBe(seedOf("krnr"));
    expect(seedOf("krnr")).not.toBe(seedOf("bldrx"));
  });
});

describe("rehypeLabelLinks", () => {
  it("labels links that have no text, and leaves the rest alone", () => {
    const tree = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "a",
          properties: {
            href: "https://github.com/VoxDroid/krnr/releases/",
          } as Record<string, unknown>,
          children: [
            {
              type: "element",
              tagName: "img",
              properties: { alt: "" },
              children: [],
            },
          ],
        },
        {
          type: "element",
          tagName: "a",
          properties: { href: "https://x.dev" } as Record<string, unknown>,
          children: [
            {
              type: "element",
              tagName: "img",
              properties: { alt: "Logo" },
              children: [],
            },
          ],
        },
        {
          type: "element",
          tagName: "a",
          properties: { href: "#usage" } as Record<string, unknown>,
          children: [{ type: "text", value: "Usage" }],
        },
      ],
    };
    rehypeLabelLinks()(tree);
    expect(tree.children.map((c) => c.properties.ariaLabel)).toEqual([
      "github.com/VoxDroid/krnr/releases",
      undefined,
      undefined,
    ]);
    expect(describeHref("mailto:a@b.c")).toBe("Email a@b.c");
    expect(describeHref("#install")).toBe("Section install");
  });
});

describe("snapshot helpers", () => {
  it("counts streaks, keeping today's open streak alive", () => {
    const days = [
      "2026-11-15:1",
      "2026-11-16:0",
      "2026-11-17:2",
      "2026-11-18:1",
      "2026-11-19:3",
      "2026-11-20:0",
    ].map((s) => {
      const [date, count] = s.split(":");
      return { date: date!, count: Number(count) };
    });
    expect(streaks(days)).toEqual({ current: 3, longest: 3 });
    expect(streaks([{ date: "2026-01-01", count: 0 }])).toEqual({
      current: 0,
      longest: 0,
    });
  });
  it("reads only public repos from the content folder", () => {
    const repos = contentRepos();
    expect(repos).toContain("VoxDroid/KemonoDownloader");
    expect(repos).not.toContain("VoxDroid/CodeStash");
  });
});

describe("remarkAlerts", () => {
  it("turns GitHub alert markers into a bold label", async () => {
    const { default: remarkAlerts } = await import("@/lib/remark-alerts");
    const tree = {
      type: "root",
      children: [
        {
          type: "blockquote",
          children: [
            {
              type: "paragraph",
              children: [
                { type: "text", value: "[!IMPORTANT] Legacy project." },
              ],
            },
          ],
        },
        {
          type: "blockquote",
          children: [
            {
              type: "paragraph",
              children: [{ type: "text", value: "Just a quote." }],
            },
          ],
        },
      ],
    };
    remarkAlerts()(tree);
    const [first, second] = tree.children.map((q) => q.children[0]!.children);
    expect(first).toEqual([
      { type: "strong", children: [{ type: "text", value: "Important: " }] },
      { type: "text", value: "Legacy project." },
    ]);
    expect(second).toEqual([{ type: "text", value: "Just a quote." }]);
  });
});
