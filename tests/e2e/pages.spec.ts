import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { EDITIONS } from "../../lib/editions";
import { horizontalOverflow, settle, useEdition, watchPage } from "./helpers";

async function expectAccessible(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const serious = results.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes
          .slice(0, 4)
          .map((n) => n.target.join(" "))
          .join("\n  ")}`,
    );
  expect(serious, serious.join("\n")).toEqual([]);
}

for (const edition of EDITIONS) {
  test.describe(`${edition} edition`, () => {
    test.beforeEach(async ({ context, baseURL }) => {
      await useEdition(context, baseURL!, edition);
    });

    test("home page has every section and no errors", async ({
      page,
      baseURL,
    }) => {
      const problems = watchPage(page, baseURL!);
      const res = await page.goto("/");
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute(
        "data-edition",
        edition,
      );
      await expect(page.locator("h1").first()).toBeVisible();
      for (const id of [
        "github",
        "work",
        "about",
        "journey",
        "services",
        "contact",
      ])
        await expect(page.locator(`#${id}`)).toHaveCount(1);
      await expect(
        page.getByRole("link", { name: /KemonoDownloader/i }).first(),
      ).toBeVisible();
      await expect(
        page.locator('a[href^="mailto:izeno.contact@gmail.com"]').first(),
      ).toBeAttached();
      await expect(
        page.getByText("Consistent Dean's Lister", { exact: false }).first(),
      ).toBeAttached();
      await settle(page);
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      await expectAccessible(page);
      expect(problems).toEqual([]);
    });

    test("project index lists every project", async ({ page, baseURL }) => {
      const problems = watchPage(page, baseURL!);
      const res = await page.goto("/projects");
      expect(res?.status()).toBe(200);
      await expect(page.locator("[data-project]")).toHaveCount(31);
      await expect(
        page.getByRole("search", { name: "Filter projects" }),
      ).toBeVisible();
      await expect(
        page.getByRole("status").filter({ hasText: /31 projects/ }),
      ).toBeVisible();
      await settle(page);
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      await expectAccessible(page);
      expect(problems).toEqual([]);
    });

    test("a public project page shows facts, source and README", async ({
      page,
      baseURL,
    }) => {
      const problems = watchPage(page, baseURL!);
      const res = await page.goto("/projects/kemonodownloader");
      expect(res?.status()).toBe(200);
      await expect(
        page.getByRole("heading", { level: 1, name: "KemonoDownloader" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: /Source on GitHub/ }),
      ).toHaveAttribute("href", "https://github.com/VoxDroid/KemonoDownloader");
      await expect(page.locator("#readme")).toBeVisible();
      await expect(page.locator("#releases")).toBeVisible();
      await settle(page);
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      await expectAccessible(page);
      expect(problems).toEqual([]);
    });

    test("a private project page has no source link or README", async ({
      page,
      baseURL,
    }) => {
      const problems = watchPage(page, baseURL!);
      const res = await page.goto("/projects/codestash");
      expect(res?.status()).toBe(200);
      await expect(
        page.getByRole("heading", { level: 1, name: "CodeStash" }),
      ).toBeVisible();
      await expect(page.getByText(/This repository is private/)).toBeVisible();
      await expect(
        page.getByRole("link", { name: /Source on GitHub/ }),
      ).toHaveCount(0);
      await expect(page.locator("#readme")).toHaveCount(0);
      await expect(
        page.locator('section[aria-labelledby="shots"] img'),
      ).toHaveCount(4);
      await settle(page);
      await expectAccessible(page);
      expect(problems).toEqual([]);
    });

    test("an unknown project is a 404 in the same edition", async ({
      page,
    }) => {
      const res = await page.goto("/projects/does-not-exist");
      expect(res?.status()).toBe(404);
      await expect(page.locator("html")).toHaveAttribute(
        "data-edition",
        edition,
      );
      await expect(
        page.getByRole("heading", { level: 1, name: /404/ }),
      ).toBeVisible();
    });
  });
}
