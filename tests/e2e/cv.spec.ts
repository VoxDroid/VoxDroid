import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { EDITIONS } from "../../lib/editions";
import { horizontalOverflow, settle, useEdition, watchPage } from "./helpers";

for (const edition of EDITIONS) {
  test.describe(`${edition} CV`, () => {
    test.beforeEach(async ({ context, baseURL }) => {
      await useEdition(context, baseURL!, edition);
    });

    test("shows the CV with every section and no errors", async ({
      page,
      baseURL,
    }) => {
      const problems = watchPage(page, baseURL!);
      const res = await page.goto("/cv");
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle("CV · VoxDroid");
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Mhar Andrei C. Macapallag",
        }),
      ).toBeVisible();
      for (const id of [
        "cv-profile",
        "cv-projects",
        "cv-skills",
        "cv-education",
        "cv-certs",
        "cv-languages",
      ])
        await expect(page.locator(`#${id}`)).toBeVisible();
      await expect(page.locator("#cv-experience")).toHaveCount(0);
      await expect(
        page.getByText("Consistent Dean's Lister").first(),
      ).toBeVisible();
      await expect(
        page.locator('a[href="mailto:izeno.contact@gmail.com"]').first(),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /save as pdf/i }),
      ).toBeVisible();
      await settle(page);
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const serious = results.violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id}: ${v.help}`);
      expect(serious, serious.join("\n")).toEqual([]);
      expect(problems).toEqual([]);
    });

    test("prints as a clean A4 document of at most two pages", async ({
      page,
    }, info) => {
      test.skip(
        info.project.name !== "desktop",
        "printing is checked once per edition",
      );
      await page.goto("/cv");
      await settle(page);
      await page.emulateMedia({ media: "print" });
      for (const hidden of [
        "header nav",
        "footer",
        ".switcher",
        "[data-print-hide]",
      ])
        for (const el of await page.locator(hidden).all())
          await expect(el).toBeHidden();
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Mhar Andrei C. Macapallag",
        }),
      ).toBeVisible();
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });
      const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [])
        .length;
      expect(pages).toBeGreaterThanOrEqual(1);
      expect(pages).toBeLessThanOrEqual(2);
      await info.attach(`cv-${edition}.pdf`, {
        body: pdf,
        contentType: "application/pdf",
      });
    });
  });
}
