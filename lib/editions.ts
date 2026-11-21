export const EDITIONS = ["two-inks", "photocopy", "sun-print"] as const;
export type Edition = (typeof EDITIONS)[number];

export const DEFAULT_EDITION: Edition = "two-inks";
export const EDITION_COOKIE = "edition";
export const EDITION_PARAM = "edition";

export const EDITION_INFO: Record<
  Edition,
  { label: string; process: string; swatches: [string, string] }
> = {
  "two-inks": {
    label: "Two Inks",
    process: "Risograph, indigo and coral",
    swatches: ["#4338CA", "#FF5A4F"],
  },
  photocopy: {
    label: "Photocopy",
    process: "Toner and highlighter",
    swatches: ["#141414", "#F5FF3D"],
  },
  "sun-print": {
    label: "Sun Print",
    process: "Cyanotype on cotton rag",
    swatches: ["#123F8C", "#F1ECDF"],
  },
};

export function parseEdition(value: unknown): Edition | null {
  return typeof value === "string" &&
    (EDITIONS as readonly string[]).includes(value)
    ? (value as Edition)
    : null;
}
