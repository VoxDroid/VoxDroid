/*
 * GitHub's alert syntax (> [!NOTE], > [!IMPORTANT], ...) is not part of GFM, so it would render as
 * literal "[!IMPORTANT]". This turns the marker into a bold label at the start of the quote.
 */

type MdNode = { type: string; value?: string; children?: MdNode[] };

const LABELS: Record<string, string> = {
  NOTE: "Note",
  TIP: "Tip",
  IMPORTANT: "Important",
  WARNING: "Warning",
  CAUTION: "Caution",
};

function visit(node: MdNode) {
  if (node.type === "blockquote") {
    const paragraph = node.children?.[0];
    const first =
      paragraph?.type === "paragraph" ? paragraph.children?.[0] : undefined;
    const match =
      first?.type === "text"
        ? /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i.exec(
            first.value ?? "",
          )
        : null;
    if (paragraph && first && match) {
      first.value = (first.value ?? "").slice(match[0].length);
      const label = LABELS[match[1]!.toUpperCase()]!;
      paragraph.children!.unshift({
        type: "strong",
        children: [{ type: "text", value: `${label}: ` }],
      });
      if (first.value === "")
        paragraph.children!.splice(paragraph.children!.indexOf(first), 1);
    }
  }
  for (const child of node.children ?? []) visit(child);
}

export default function remarkAlerts() {
  return (tree: MdNode) => visit(tree);
}
