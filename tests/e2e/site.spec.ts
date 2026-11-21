import { expect, test } from "@playwright/test";

test.describe("project filters", () => {
  test("filter, search, sort, share and reset", async ({ page }) => {
    await page.goto("/projects");
    const cards = page.locator("[data-project]:visible");
    await expect(cards).toHaveCount(31);

    await page.getByLabel("Type").selectOption("CLI Tool");
    await expect(page).toHaveURL(/category=CLI\+Tool/);
    const cli = await cards.count();
    expect(cli).toBeGreaterThan(0);
    expect(cli).toBeLessThan(31);
    await expect(
      page.getByRole("status").filter({ hasText: `${cli} project` }),
    ).toBeVisible();

    // The filtered view survives a reload, rendered that way by the server.
    await page.reload();
    await expect(page.getByLabel("Type")).toHaveValue("CLI Tool");
    await expect(cards).toHaveCount(cli);

    await page.getByRole("button", { name: "Reset" }).click();
    await page.getByLabel("Search").fill("kemono");
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toHaveAttribute(
      "data-project",
      "kemonodownloader",
    );

    await page.getByLabel("Search").fill("zzzz no such project");
    await expect(
      page.getByText("Nothing matches those filters."),
    ).toBeVisible();

    await page.getByRole("button", { name: "Reset" }).click();
    await page.getByLabel("Sort").selectOption("stars");
    const first = await page.locator("[data-project]").evaluateAll(
      (els) =>
        els
          .filter((e) => !(e as HTMLElement).hidden)
          .sort(
            (a, b) =>
              Number((a as HTMLElement).style.order) -
              Number((b as HTMLElement).style.order),
          )
          .map((e) => (e as HTMLElement).dataset.project)[0],
    );
    expect(first).toBe("kemonodownloader");
    await expect(page).toHaveURL(/sort=stars/);
  });
});

test.describe("old routes and metadata", () => {
  for (const [from, to] of [
    ["/about", "/#about"],
    ["/services", "/#services"],
    ["/contact", "/#contact"],
    ["/github", "/#github"],
  ] as const)
    test(`${from} redirects to ${to}`, async ({ request }) => {
      const res = await request.get(from, { maxRedirects: 0 });
      expect([301, 308]).toContain(res.status());
      expect(res.headers().location).toBe(to);
    });

  test("sitemap lists every project and robots points to it", async ({
    request,
  }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap.match(/<url>/g)?.length).toBe(33);
    expect(sitemap).toContain("/projects/kemonodownloader</loc>");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/Sitemap: .*\/sitemap\.xml/);
  });

  test("an unknown project is a 404 rendered on the server, in the visitor's edition", async ({
    request,
  }) => {
    for (const [edition, words] of [
      ["two-inks", "Misprint"],
      ["photocopy", "PAPER JAM"],
      ["sun-print", "Plate missing"],
    ] as const) {
      const res = await request.get("/projects/no-such-project", {
        headers: { cookie: `edition=${edition}` },
      });
      expect(res.status()).toBe(404);
      const html = await res.text();
      expect(html).toContain(`data-edition="${edition}"`);
      expect(html).toContain(words);
      expect(html).not.toContain('id="__next_error__"');
    }
  });

  test("security headers are set", async ({ request }) => {
    const res = await request.get("/");
    expect(res.headers()["x-content-type-options"]).toBe("nosniff");
    expect(res.headers()["x-frame-options"]).toBe("DENY");
    expect(res.headers()["x-powered-by"]).toBeUndefined();
  });

  test("pages carry titles and descriptions", async ({ page }) => {
    await page.goto("/projects/krnr");
    await expect(page).toHaveTitle("krnr · VoxDroid");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /command registry/i,
    );
  });
});

test.describe("README rendering", () => {
  test("resolves relative images and never runs README scripts", async ({
    page,
  }) => {
    await page.goto("/projects/kemonodownloader");
    const readme = page.locator("#readme").locator("xpath=..");
    const srcs = await readme
      .locator("img")
      .evaluateAll((imgs) => imgs.map((i) => i.getAttribute("src") ?? ""));
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) expect(src).toMatch(/^https:\/\//);
    expect(await readme.locator("script, style, iframe").count()).toBe(0);
  });
});
