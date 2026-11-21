"use server";

import { cookies } from "next/headers";
import { EDITION_COOKIE, parseEdition } from "@/lib/editions";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Switches the edition. Setting the cookie in a Server Function re-renders the current page with
 * the new edition in the same round trip and clears the client cache, so back/forward navigation
 * never shows a page in the old edition. Works as a plain form post when JavaScript is off.
 */
export async function setEdition(formData: FormData): Promise<void> {
  const edition = parseEdition(formData.get("edition"));
  if (!edition) return;
  const store = await cookies();
  store.set(EDITION_COOKIE, edition, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  });
}
