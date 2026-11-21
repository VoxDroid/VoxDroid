import { NextResponse, type NextRequest } from "next/server";
import { EDITION_COOKIE, EDITION_PARAM, parseEdition } from "@/lib/editions";

const EDITION_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * A shared link like /?edition=sun-print opens that edition: the choice is stored in the
 * edition cookie and the visitor lands on the same URL without the parameter.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  if (!url.searchParams.has(EDITION_PARAM)) return NextResponse.next();
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

export const config = {
  matcher: [
    "/((?!_next/|art/|project_images/|project_screenshots/|profile/|favicon|robots.txt|sitemap.xml).*)",
  ],
};
