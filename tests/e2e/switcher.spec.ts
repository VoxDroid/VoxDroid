import { expect, test } from "@playwright/test";
import { DEFAULT_EDITION, EDITION_COOKIE } from "../../lib/editions";
import { watchPage } from "./helpers";

test.describe("edition switcher", () => {
  test("starts in the default edition", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      DEFAULT_EDITION,
    );
    await expect(
      page.getByRole("button", { name: "Two Inks" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("switches, remembers, and never mixes editions across navigation", async ({
    page,
    context,
    baseURL,
  }) => {
    const problems = watchPage(page, baseURL!);
    await page.goto("/");
    await page.getByRole("button", { name: "Sun Print" }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      "sun-print",
    );
    await expect(page.getByText("Photograms of systems")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sun Print" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page
        .getByRole("status")
        .filter({ hasText: "Now showing the Sun Print edition." }),
    ).toBeAttached();
    const cookie = (await context.cookies()).find(
      (c) => c.name === EDITION_COOKIE,
    );
    expect(cookie?.value).toBe("sun-print");

    // Client-side navigation keeps the edition.
    await page
      .getByRole("navigation", { name: "Plates" })
      .getByRole("link", { name: "Index" })
      .click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Index of Specimens" }),
    ).toBeVisible();

    // Switch again on the index, then go back: the home page must come back in the new edition.
    await page.getByRole("button", { name: "Photocopy" }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      "photocopy",
    );
    await expect(
      page.getByRole("heading", { level: 1, name: "The Archive" }),
    ).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      "photocopy",
    );
    await expect(
      page.getByRole("heading", { level: 1, name: "VoxDroid" }),
    ).toBeVisible();
    await expect(page.getByText("Photograms of systems")).toHaveCount(0);

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      "photocopy",
    );
    expect(problems).toEqual([]);
  });

  test("a shared ?edition= link opens that edition and tidies the URL", async ({
    page,
    context,
  }) => {
    await page.goto("/projects?edition=photocopy");
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      "photocopy",
    );
    expect(
      (await context.cookies()).find((c) => c.name === EDITION_COOKIE)?.value,
    ).toBe("photocopy");
  });

  test("an unknown ?edition= is ignored", async ({ page, context }) => {
    await page.goto("/?edition=glitter");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      DEFAULT_EDITION,
    );
    expect(
      (await context.cookies()).find((c) => c.name === EDITION_COOKIE),
    ).toBeUndefined();
  });

  test("works without JavaScript", async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      baseURL,
    });
    const page = await context.newPage();
    await page.goto("/");
    await page.getByRole("button", { name: "Photocopy" }).click();
    await page.waitForLoadState("load");
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      "photocopy",
    );
    await context.close();
  });

  test("respects reduced motion", async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      baseURL,
    });
    const page = await context.newPage();
    await page.goto("/");
    await page.getByRole("button", { name: "Photocopy" }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-edition",
      "photocopy",
    );
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-switching",
      /.+/,
    );
    await context.close();
  });
});
