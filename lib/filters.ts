import type { FilterItem } from "./filter-attributes";

export type FilterState = {
  q: string;
  category: string;
  status: string;
  sort: string;
};

export const DEFAULT_FILTERS: FilterState = {
  q: "",
  category: "",
  status: "",
  sort: "featured",
};

export const SORTS = [
  ["featured", "Featured first"],
  ["stars", "Most stars"],
  ["updated", "Recently updated"],
  ["name", "Name"],
] as const;

export const STATUSES = [
  ["", "Any status"],
  ["active", "Active"],
  ["maintained", "Maintained"],
  ["archived", "Archived"],
  ["private", "Private"],
] as const;

type ParamReader = { get(name: string): string | null } | null;

export function filtersFromParams(p: ParamReader): FilterState {
  const sort = p?.get("sort") ?? "";
  return {
    q: p?.get("q") ?? "",
    category: p?.get("category") ?? "",
    status: p?.get("status") ?? "",
    sort: SORTS.some(([v]) => v === sort) ? sort : "featured",
  };
}

export function filtersToQuery(s: FilterState) {
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.category) p.set("category", s.category);
  if (s.status) p.set("status", s.status);
  if (s.sort !== "featured") p.set("sort", s.sort);
  return p.toString();
}

/** Slugs of the items that pass the filters, in display order. */
export function applyFilters(items: FilterItem[], s: FilterState): string[] {
  const q = s.q.trim().toLowerCase();
  const kept = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      if (s.category && item.category !== s.category) return false;
      if (s.status && item.status !== s.status) return false;
      if (q && !item.search.includes(q)) return false;
      return true;
    });
  kept.sort((a, b) => {
    if (s.sort === "stars")
      return (b.item.stars ?? -1) - (a.item.stars ?? -1) || a.index - b.index;
    if (s.sort === "updated")
      return (
        (b.item.updated ?? "").localeCompare(a.item.updated ?? "") ||
        a.index - b.index
      );
    if (s.sort === "name")
      return a.item.name.localeCompare(b.item.name) || a.index - b.index;
    return a.index - b.index;
  });
  return kept.map(({ item }) => item.slug);
}
