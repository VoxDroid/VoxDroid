import { test } from "@playwright/test";
import { EDITIONS } from "../../lib/editions";
import { settle, useEdition } from "./helpers";

/*
 * Full-page screenshots of every edition and page, for review by eye.
 * Skipped unless SCREENS=1:   SCREENS=1 npx playwright test screens
 */
test.skip(!process.env.SCREENS, "set SCREENS=1 to capture screenshots");

const PAGES = [
  ["home", "/"],
  ["projects", "/projects"],
  ["detail", "/projects/kemonodownloader"],
  ["private", "/projects/codestash"],
  ["missing", "/projects/does-not-exist"],
] as const;

for (const edition of EDITIONS)
  for (const [name, path] of PAGES)
    test(`${edition} ${name}`, async ({ page, context, baseURL }, info) => {
      await useEdition(context, baseURL!, edition);
      await page.goto(path);
      await settle(page);
      await page.screenshot({
        path: `test-results/screens/${info.project.name}-${edition}-${name}.png`,
        fullPage: true,
      });
    });
