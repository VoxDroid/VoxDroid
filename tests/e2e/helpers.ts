import type { BrowserContext, Page } from "@playwright/test";
import { EDITION_COOKIE, type Edition } from "../../lib/editions";

export async function useEdition(
  context: BrowserContext,
  baseURL: string,
  edition: Edition,
) {
  await context.addCookies([
    { name: EDITION_COOKIE, value: edition, url: baseURL },
  ]);
}

/** Collects console errors and failed same-origin requests while a test runs. */
export function watchPage(page: Page, baseURL: string) {
  const problems: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("requestfailed", (req) => {
    if (
      req.url().startsWith(baseURL) &&
      req.failure()?.errorText !== "net::ERR_ABORTED"
    )
      problems.push(`requestfailed: ${req.url()} ${req.failure()?.errorText}`);
  });
  page.on("response", (res) => {
    if (
      res.url().startsWith(baseURL) &&
      res.status() >= 400 &&
      !res.url().includes("/does-not-exist")
    )
      problems.push(`http ${res.status()}: ${res.url()}`);
  });
  return problems;
}

/** Scrolls through the page so lazy images and fonts load, waits for every image, then returns to the top. */
export async function settle(page: Page) {
  await page.evaluate(async () => {
    const step = Math.max(300, window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    const images = Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? null
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }),
      ),
    );
    await Promise.race([images, new Promise((r) => setTimeout(r, 15000))]);
    window.scrollTo({ top: 0, behavior: "instant" });
    await document.fonts.ready;
  });
  await page.waitForLoadState("networkidle");
}

export async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
}
