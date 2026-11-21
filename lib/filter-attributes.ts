/* Shared by the server-rendered project cards and the ProjectFilters client component. */

type Filterable = {
  slug: string;
  name: string;
  category: string;
  status: string;
  stars: number | null;
  pushedAt: string | null;
  language: string | null;
  topics: string[];
  summary: string;
};

/** The facts ProjectFilters needs about each card, small enough to send to the browser. */
export type FilterItem = {
  slug: string;
  name: string;
  category: string;
  status: string;
  stars: number | null;
  updated: string | null;
  search: string;
};

export function filterItem(p: Filterable): FilterItem {
  return {
    slug: p.slug,
    name: p.name.toLowerCase(),
    category: p.category,
    status: p.status,
    stars: p.stars,
    updated: p.pushedAt,
    search: [p.name, p.category, p.language ?? "", p.summary, ...p.topics]
      .join(" ")
      .toLowerCase(),
  };
}

/** Marks a card so ProjectFilters can find it. */
export function filterAttributes(p: Pick<Filterable, "slug">) {
  return { "data-project": p.slug } as const;
}
