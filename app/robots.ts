import type { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL ?? "https://voxdroid.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
