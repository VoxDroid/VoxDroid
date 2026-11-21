import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

const SITE_URL = process.env.SITE_URL ?? "https://voxdroid.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/cv`, changeFrequency: "monthly", priority: 0.6 },
    ...getProjects().map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.pushedAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: p.featured !== null ? 0.7 : 0.5,
    })),
  ];
}
