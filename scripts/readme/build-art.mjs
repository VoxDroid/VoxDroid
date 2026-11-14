/*
 * Redraws the static README images (heroes, headings, the project line-up) into readme/.
 *
 *   node scripts/readme/build-art.mjs
 *
 * It opens scripts/readme/studio.html in headless Chrome, because the poster and voice
 * images need a real canvas and the Anton typeface. Set CHROME to the browser binary
 * if it is not in one of the usual places. The data-driven charts are separate: see charts.mjs.
 */
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const outDir = path.join(root, "readme");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function findChrome() {
  const candidates = [
    process.env.CHROME,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const hit = candidates.find((p) => fs.existsSync(p));
  if (!hit)
    throw new Error(
      "No Chrome found. Set CHROME to the path of a Chromium-based browser.",
    );
  return hit;
}

let browser,
  profile,
  saved = 0;
function finish(code, message) {
  console.log(message);
  if (browser) browser.kill();
  server.close();
  if (profile)
    setTimeout(() => {
      try {
        fs.rmSync(profile, { recursive: true, force: true });
      } catch {}
      process.exit(code);
    }, 500);
  else process.exit(code);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  if (req.method === "POST") {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (c) => {
      body += c;
    });
    req.on("end", () => {
      res.end("ok");
      if (url.pathname === "/save") {
        const name = url.searchParams.get("file") || "";
        const target = path.resolve(outDir, name);
        if (!target.startsWith(outDir + path.sep) || !target.endsWith(".svg"))
          return;
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, body);
        saved++;
      } else if (url.pathname === "/done") {
        const error = url.searchParams.get("error");
        finish(
          error ? 1 : 0,
          error ? "Failed: " + error : "Wrote " + saved + " files to readme/",
        );
      }
    });
    return;
  }
  const file = path.resolve(root, "." + decodeURIComponent(url.pathname));
  if (
    !file.startsWith(root + path.sep) ||
    !fs.existsSync(file) ||
    fs.statSync(file).isDirectory()
  ) {
    res.statusCode = 404;
    res.end("not found");
    return;
  }
  res.setHeader(
    "Content-Type",
    types[path.extname(file)] || "application/octet-stream",
  );
  fs.createReadStream(file).pipe(res);
});

server.listen(0, "127.0.0.1", () => {
  const port = server.address().port;
  profile = fs.mkdtempSync(path.join(os.tmpdir(), "readme-art-"));
  browser = spawn(
    findChrome(),
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--user-data-dir=" + profile,
      "http://127.0.0.1:" + port + "/scripts/readme/studio.html",
    ],
    { stdio: "ignore" },
  );
  setTimeout(
    () => finish(1, "Timed out after 90s with " + saved + " files written."),
    90000,
  ).unref();
});
