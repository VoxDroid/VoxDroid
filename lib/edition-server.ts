import { cookies } from "next/headers";
import { cache } from "react";
import {
  DEFAULT_EDITION,
  EDITION_COOKIE,
  parseEdition,
  type Edition,
} from "./editions";

/** The edition this request should render, from the visitor's cookie. */
export const getEdition = cache(async (): Promise<Edition> => {
  const store = await cookies();
  return parseEdition(store.get(EDITION_COOKIE)?.value) ?? DEFAULT_EDITION;
});
