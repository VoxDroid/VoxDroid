import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";
import { getSnapshot } from "./github";
import { getProjects, type Project } from "./projects";
import type { Snapshot } from "./schema";

export type { Project } from "./projects";
export { getProject, getProjects, getReadme } from "./projects";
export type Site = typeof site;

export type HomeData = {
  site: Site;
  featured: Project[];
  projects: Project[];
  github: Snapshot;
  /** Public repositories beyond the ones listed on this site. */
  moreOnGitHub: number;
};

export function getHomeData(): HomeData {
  const projects = getProjects();
  const github = getSnapshot();
  return {
    site,
    featured: projects.filter((p) => p.featured !== null),
    projects,
    github,
    moreOnGitHub: Math.max(
      0,
      github.profile.publicRepos - projects.filter((p) => !p.private).length,
    ),
  };
}

let sizes: Record<string, [number, number]> | null = null;

/** Width and height of an image under public/, recorded at build time by scripts/editions/art.mts. */
export function imageSize(publicPath: string): {
  width: number;
  height: number;
} {
  if (!sizes || process.env.NODE_ENV !== "production")
    sizes = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "data/image-sizes.json"),
        "utf8",
      ),
    ) as Record<string, [number, number]>;
  const s = sizes[publicPath];
  if (!s)
    throw new Error(`No recorded size for ${publicPath}; run npm run art`);
  return { width: s[0], height: s[1] };
}

export function artPaths(slug: string | null) {
  const base = slug ? `/art/projects/${slug}` : "/art/portrait";
  return {
    risoKey: `${base}/riso-key.svg`,
    risoWarm: `${base}/riso-warm.svg`,
    xerox: `${base}/xerox.webp`,
    cyan: `${base}/cyan.webp`,
  };
}

export const CYAN_PANEL = "/art/cyan-panel.webp";
