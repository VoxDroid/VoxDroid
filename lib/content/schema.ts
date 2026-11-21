import { z } from "zod";

export const CATEGORIES = [
  "Web App",
  "Desktop App",
  "iOS App",
  "Android App",
  "CLI Tool",
  "Dev Tool",
  "AI/ML/DL",
  "Educational",
  "Web Template",
  "Other",
] as const;
export type Category = (typeof CATEGORIES)[number];

const publicPath = z
  .string()
  .regex(/^\/[\w./-]+$/, "must be a path under public/, starting with /");

/** The front matter of content/projects/<slug>.md. */
export const projectFrontmatter = z
  .object({
    repo: z.string().regex(/^[\w.-]+\/[\w.-]+$/, "must look like owner/name"),
    name: z.string().min(1),
    category: z.enum(CATEGORIES),
    featured: z.number().int().positive().optional(),
    tagline: z.string().min(1).optional(),
    summary: z.string().min(1).optional(),
    logo: publicPath.optional(),
    artwork: z.boolean().default(true),
    demo: z.url().optional(),
    screenshots: z.array(publicPath).default([]),
    private: z.boolean().default(false),
  })
  .strict();
export type ProjectFrontmatter = z.infer<typeof projectFrontmatter>;

const nonEmpty = z.string().min(1);

/** The shape of content/site.ts. */
export const siteSchema = z.object({
  handle: nonEmpty,
  role: nonEmpty,
  tagline: nonEmpty,
  intro: nonEmpty,
  availability: nonEmpty,
  email: z.email(),
  links: z
    .array(z.object({ label: nonEmpty, href: z.url(), handle: nonEmpty }))
    .min(1),
  about: z.object({
    lead: nonEmpty,
    paragraphs: z.array(nonEmpty).min(1),
    now: nonEmpty,
  }),
  focus: z.array(z.object({ title: nonEmpty, detail: nonEmpty })).min(1),
  stack: z
    .array(z.object({ group: nonEmpty, items: z.array(nonEmpty).min(1) }))
    .min(1),
  skills: z.object({
    programmingLanguages: z.array(nonEmpty),
    operatingSystems: z.array(z.object({ name: nonEmpty, level: nonEmpty })),
    hardware: z.array(nonEmpty),
    software: z.array(nonEmpty),
    other: z.array(nonEmpty),
  }),
  spokenLanguages: z.array(z.object({ name: nonEmpty, level: nonEmpty })),
  interests: z.array(nonEmpty),
  education: z
    .array(
      z.object({
        school: nonEmpty,
        campus: nonEmpty,
        period: nonEmpty,
        degree: nonEmpty,
        detail: z.string(),
        honors: z.array(nonEmpty),
      }),
    )
    .min(1),
  certifications: z
    .array(
      z.object({
        name: nonEmpty,
        issuer: nonEmpty,
        date: z
          .string()
          .regex(
            /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/,
            'must look like "April 2026"',
          ),
        id: nonEmpty,
        href: z.url().optional(),
      }),
    )
    .min(1),
  journey: z
    .array(
      z.object({
        period: nonEmpty,
        title: nonEmpty,
        detail: nonEmpty,
        command: nonEmpty,
      }),
    )
    .min(1),
  services: z
    .array(
      z.object({
        title: nonEmpty,
        kind: z.enum(["software", "hardware", "other"]),
        description: nonEmpty,
        features: z.array(nonEmpty).min(1),
        technologies: z.array(nonEmpty).min(1),
      }),
    )
    .min(1),
  process: z.array(z.object({ title: nonEmpty, detail: nonEmpty })).min(1),
  contact: z.object({ heading: nonEmpty, body: nonEmpty }),
  faq: z.array(z.object({ q: nonEmpty, a: nonEmpty })).min(1),
});

/** data/github.json, written by scripts/github/snapshot.mjs. */
export const snapshotSchema = z.object({
  generatedAt: z.iso.datetime(),
  login: nonEmpty,
  profile: z.object({
    createdAt: z.iso.datetime(),
    followers: z.number().int().nonnegative(),
    following: z.number().int().nonnegative(),
    publicRepos: z.number().int().nonnegative(),
    stars: z.number().int().nonnegative(),
    forks: z.number().int().nonnegative(),
  }),
  contributions: z.object({
    total: z.number().int().nonnegative(),
    lastYear: z.number().int().nonnegative(),
    weeks: z.array(z.number().int().nonnegative()),
    current: z.number().int().nonnegative(),
    longest: z.number().int().nonnegative(),
  }),
  languages: z.array(
    z.object({ name: nonEmpty, share: z.number().nonnegative() }),
  ),
  activity: z.array(
    z.object({ date: z.iso.date(), text: nonEmpty, url: z.url() }),
  ),
  repos: z.record(
    z.string(),
    z.object({
      slug: nonEmpty,
      repo: nonEmpty,
      name: nonEmpty,
      description: z.string(),
      url: z.url(),
      homepage: z.string(),
      stars: z.number().int().nonnegative(),
      forks: z.number().int().nonnegative(),
      archived: z.boolean(),
      createdAt: z.iso.datetime(),
      pushedAt: z.iso.datetime(),
      defaultBranch: nonEmpty,
      language: z.string(),
      languages: z.array(
        z.object({
          name: nonEmpty,
          color: z.string(),
          bytes: z.number().int().nonnegative(),
        }),
      ),
      topics: z.array(z.string()),
      releases: z.array(
        z.object({
          tag: nonEmpty,
          name: nonEmpty,
          date: z.iso.datetime(),
          url: z.url(),
        }),
      ),
      commits: z.array(
        z.object({
          sha: nonEmpty,
          message: z.string(),
          date: z.iso.datetime(),
          url: z.url(),
        }),
      ),
      readmePath: nonEmpty,
      hasReadme: z.boolean(),
    }),
  ),
});
export type Snapshot = z.infer<typeof snapshotSchema>;
export type RepoSnapshot = Snapshot["repos"][string];
