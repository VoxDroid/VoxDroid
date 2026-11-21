import { parse } from "yaml";

/** Splits a Markdown file into its YAML front matter (unvalidated) and its body. */
export function splitFrontmatter(text: string): {
  data: unknown;
  body: string;
} {
  const normalized = text.replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(normalized);
  if (!match) return { data: {}, body: normalized.trim() };
  return {
    data: parse(match[1] ?? "") ?? {},
    body: normalized.slice(match[0].length).trim(),
  };
}
