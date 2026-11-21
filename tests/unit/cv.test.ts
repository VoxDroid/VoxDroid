import { describe, expect, it } from "vitest";
import { cv } from "@/content/cv";
import { site } from "@/content/site";
import { getCvData, projectMeta, skillRows } from "@/lib/content/cv";

describe("CV data", () => {
  const data = getCvData();

  it("carries the real name and the handle", () => {
    expect(data.cv.name).toBe("Mhar Andrei C. Macapallag");
    expect(data.site.handle).toBe("VoxDroid");
  });

  it("lists the top featured projects, in rank order", () => {
    expect(data.projects).toHaveLength(cv.projects);
    const ranks = data.projects.map((p) => p.featured);
    expect(ranks).toEqual([...ranks].sort((a, b) => (a ?? 0) - (b ?? 0)));
    expect(ranks.every((r) => r !== null)).toBe(true);
  });

  it("describes projects without inventing anything", () => {
    for (const p of data.projects) {
      const meta = projectMeta(p);
      expect(meta).toContain(p.category);
      expect(meta).toContain(p.stars === null ? "private" : `${p.stars} ★`);
    }
  });

  it("includes every skill from the site, with no empty rows", () => {
    const rows = skillRows(site);
    expect(rows.every((r) => r.value.length > 0)).toBe(true);
    const text = rows.map((r) => r.value).join(" ");
    for (const lang of site.skills.programmingLanguages)
      expect(text).toContain(lang);
    for (const g of site.stack.filter((g) => g.group !== "Languages"))
      for (const item of g.items) expect(text).toContain(item);
  });

  it("has a well-formed experience list", () => {
    for (const x of cv.experience) {
      expect(x.role && x.org && x.period).toBeTruthy();
      expect(x.points.length).toBeGreaterThan(0);
    }
  });

  it("points at an absolute site URL without a trailing slash", () => {
    expect(data.siteUrl).toMatch(/^https:\/\/[^/]+$/);
  });
});
