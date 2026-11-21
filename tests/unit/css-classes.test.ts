import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/*
 * CSS-module class names are plain strings at runtime, so a typo renders as "undefined" instead of
 * failing. This checks that every `s.<name>` an edition uses is defined in that edition's stylesheet.
 */
const root = path.join(process.cwd(), "editions");

for (const edition of fs
  .readdirSync(root)
  .filter((d) => fs.statSync(path.join(root, d)).isDirectory())) {
  describe(`${edition} styles`, () => {
    const dir = path.join(root, edition);
    const css = fs.readFileSync(
      path.join(dir, `${edition}.module.css`),
      "utf8",
    );
    const defined = new Set(
      [...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]),
    );
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
      it(`${file} uses only defined classes`, () => {
        const source = fs.readFileSync(path.join(dir, file), "utf8");
        const used = new Set(
          [...source.matchAll(/\bs\.([a-zA-Z]\w*)/g)].map((m) => m[1]),
        );
        const missing = [...used].filter((name) => !defined.has(name));
        expect(missing).toEqual([]);
      });
    }
  });
}
