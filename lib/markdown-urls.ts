/**
 * Rewrites URLs found in a repository README so they work off GitHub:
 * relative images point at raw.githubusercontent.com, relative links at the file on github.com.
 * Absolute URLs, anchors and mailto links are left alone; anything else unsafe is dropped.
 */
export function resolveReadmeUrl(
  url: string,
  kind: "link" | "image",
  ctx: { repo: string; branch: string; readmePath: string },
): string {
  const value = url.trim();
  if (value === "") return "";
  if (value.startsWith("#")) return value;
  if (/^(https?:|mailto:)/i.test(value)) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//")) return "";

  // readmePath is "owner/name/path/to/README.md"; the folder inside the repo is what matters.
  const inRepo = ctx.readmePath.split("/").slice(2, -1);
  const segments = value.startsWith("/") ? [] : [...inRepo];
  const [beforeHash = "", ...hashParts] = value.replace(/^\//, "").split("#");
  const [pathOnly = "", query] = beforeHash.split("?");
  for (const part of pathOnly.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") segments.pop();
    else segments.push(decodeURIComponentSafe(part));
  }
  const file = segments.map(encodeURIComponent).join("/");
  const suffix =
    (query ? "?" + query : "") +
    (hashParts.length ? "#" + hashParts.join("#") : "");
  return kind === "image"
    ? `https://raw.githubusercontent.com/${ctx.repo}/${ctx.branch}/${file}${query ? "?" + query : ""}`
    : `https://github.com/${ctx.repo}/blob/${ctx.branch}/${file}${suffix}`;
}

function decodeURIComponentSafe(part: string) {
  try {
    return decodeURIComponent(part);
  } catch {
    return part;
  }
}
