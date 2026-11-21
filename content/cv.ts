/*
 * What only the CV needs. Everything else (skills, education, certifications, projects) comes
 * from content/site.ts and content/projects, so the CV never drifts from the site.
 */
export const cv = {
  /** Shown only on the CV; the rest of the site uses the handle. */
  name: "Mhar Andrei C. Macapallag",
  headline: "Full Stack Developer · Intelligent Systems",
  summary:
    "Full stack developer writing code for 6+ years in Python, JavaScript, TypeScript, Rust and C++. I build command-line tools, web and desktop apps and machine-learning projects, and run a self-hosted homelab. Computer Science student specialising in Intelligent Systems; consistent Dean's Lister.",
  /** How many featured projects the CV lists as experience. */
  projects: 8,
  /**
   * Roles, newest first. Empty for now: the CV leads with projects instead.
   * Example: { role: "Developer", org: "Company", period: "2025 – Present", points: ["What you did"] }
   */
  experience: [] as {
    role: string;
    org: string;
    period: string;
    points: string[];
  }[],
};

export type Cv = typeof cv;
