/*
 * Developer helper: slices tall full-page screenshots (from `SCREENS=1 npx playwright test screens`)
 * into screen-height pieces that are easier to review.
 *
 *   node scripts/dev/slice-screens.mjs <screenshot.png> <out-prefix> [slice-height]
 */
import sharp from "sharp";

const [file, out, height = "1400"] = process.argv.slice(2);
if (!file || !out) {
  console.error(
    "usage: node scripts/dev/slice-screens.mjs <screenshot.png> <out-prefix> [slice-height]",
  );
  process.exit(1);
}
const meta = await sharp(file).metadata();
const H = Number(height);
let i = 0;
for (let y = 0; y < (meta.height ?? 0); y += H, i++) {
  await sharp(file)
    .extract({
      left: 0,
      top: y,
      width: meta.width ?? 0,
      height: Math.min(H, (meta.height ?? 0) - y),
    })
    .resize({ width: 1100 })
    .png()
    .toFile(`${out}-${String(i).padStart(2, "0")}.png`);
}
console.log(`${meta.width}x${meta.height}: ${i} slices`);
