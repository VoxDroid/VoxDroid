/*
 * READMEs often wrap a badge or logo image with no alt text in a link, which leaves the link
 * without an accessible name. This rehype step labels such links with where they go.
 */

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  if (node.type === "element" && node.tagName === "img")
    return String(node.properties?.alt ?? "");
  return (node.children ?? []).map(textOf).join("");
}

/** "https://github.com/VoxDroid/krnr/releases" → "github.com/VoxDroid/krnr/releases" */
export function describeHref(href: string): string {
  try {
    const url = new URL(href, "https://example.invalid");
    if (url.protocol === "mailto:") return `Email ${url.pathname}`;
    if (url.hostname === "example.invalid")
      return href.startsWith("#") ? `Section ${href.slice(1)}` : href;
    return (url.hostname.replace(/^www\./, "") + url.pathname).replace(
      /\/$/,
      "",
    );
  } catch {
    return href;
  }
}

function visit(node: HastNode) {
  if (node.type === "element" && node.tagName === "a") {
    const href =
      typeof node.properties?.href === "string" ? node.properties.href : "";
    if (href && textOf(node).trim() === "" && !node.properties?.ariaLabel)
      node.properties = { ...node.properties, ariaLabel: describeHref(href) };
  }
  for (const child of node.children ?? []) visit(child);
}

export default function rehypeLabelLinks() {
  return (tree: HastNode) => visit(tree);
}
