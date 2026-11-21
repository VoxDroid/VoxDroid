const number = new Intl.NumberFormat("en-US");

export const formatNumber = (n: number) => number.format(n);

/** "Nov 21, 2026" in UTC, so server and client agree. */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function yearOf(iso: string) {
  return new Date(iso).getUTCFullYear();
}

/** Lower-case Roman numerals for small counts (1–39), as printed plate and index numbers. */
export function roman(n: number) {
  const parts: [number, string][] = [
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ];
  let out = "";
  for (const [value, glyph] of parts)
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  return out;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const STATUS_LABEL = {
  active: "Active",
  maintained: "Maintained",
  archived: "Archived",
  private: "Private",
} as const;
