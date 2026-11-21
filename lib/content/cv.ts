import { cv } from "@/content/cv";
import { site } from "@/content/site";
import { getSnapshot } from "./github";
import { getProjects, type Project } from "./projects";

export type CvData = {
  cv: typeof cv;
  site: typeof site;
  projects: Project[];
  stats: { stars: number; publicRepos: number; contributions: number };
  siteUrl: string;
};

/** Everything a CV edition renders: the CV text, the shared site content and the lead projects. */
export function getCvData(): CvData {
  const snapshot = getSnapshot();
  return {
    cv,
    site,
    projects: getProjects()
      .filter((p) => p.featured !== null)
      .slice(0, cv.projects),
    stats: {
      stars: snapshot.profile.stars,
      publicRepos: snapshot.profile.publicRepos,
      contributions: snapshot.contributions.lastYear,
    },
    siteUrl: (process.env.SITE_URL ?? "https://voxdroid.vercel.app").replace(
      /\/$/,
      "",
    ),
  };
}

/** "Python · 382 ★" style one-liners, shared by every CV edition. */
export function projectMeta(p: Project) {
  return [p.category, p.language, p.stars !== null ? `${p.stars} ★` : "private"]
    .filter(Boolean)
    .join(" · ");
}

/** The skills block every CV edition prints, in one order: languages, stack, systems, hardware, tools. */
export function skillRows(
  s: CvData["site"],
): { label: string; value: string }[] {
  return [
    { label: "Languages", value: s.skills.programmingLanguages.join(", ") },
    ...s.stack
      .filter((g) => g.group !== "Languages")
      .map((g) => ({ label: g.group, value: g.items.join(", ") })),
    {
      label: "Systems",
      value: s.skills.operatingSystems
        .map((o) => `${o.name} (${o.level.toLowerCase()})`)
        .join(", "),
    },
    { label: "Hardware", value: s.skills.hardware.join(", ") },
    {
      label: "Tools",
      value: [...s.skills.software, ...s.skills.other].join(", "),
    },
  ];
}
