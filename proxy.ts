import { NextResponse, type NextRequest } from "next/server";
import projectSlugs from "@/data/project-slugs.json";
import { EDITION_COOKIE, EDITION_PARAM, parseEdition } from "@/lib/editions";

const EDITION_MAX_AGE = 60 * 60 * 24 * 365;
const KNOWN_PROJECTS = new Set<string>(projectSlugs);

/**
 * 1. A shared link like /?edition=sun-print opens that edition: the choice is stored in the
 *    edition cookie and the visitor lands on the same URL without the parameter.
 * 2. An unknown /projects/<slug> is answered by the regular not-found page (status 404, rendered
 *    in the visitor's edition) instead of reaching the project page at all.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  if (url.searchParams.has(EDITION_PARAM)) {
    const edition = parseEdition(url.searchParams.get(EDITION_PARAM));
    const clean = url.clone();
    clean.searchParams.delete(EDITION_PARAM);
    const response = NextResponse.redirect(clean, 307);
    if (edition)
      response.cookies.set(EDITION_COOKIE, edition, {
        path: "/",
        maxAge: EDITION_MAX_AGE,
        sameSite: "lax",
      });
    return response;
  }

  const project = /^\/projects\/([^/]+)\/?$/.exec(url.pathname);
  if (project && !KNOWN_PROJECTS.has(decodeURIComponent(project[1]!))) {
    const missing = url.clone();
    missing.pathname = "/projects/not-found/missing";
    return NextResponse.rewrite(missing);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/|art/|project_images/|project_screenshots/|profile/|ico/|favicon|robots.txt|sitemap.xml).*)",
  ],
};
