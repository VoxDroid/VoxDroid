"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import {
  applyFilters,
  DEFAULT_FILTERS,
  filtersFromParams,
  filtersToQuery,
  SORTS,
  STATUSES,
  type FilterState,
} from "@/lib/filters";
import type { FilterItem } from "@/lib/filter-attributes";

export type FilterClasses = Record<
  "bar" | "field" | "label" | "control" | "count" | "reset" | "empty",
  string | undefined
>;

/**
 * Filters and sorts the project cards rendered on the server. The filter state lives in the URL,
 * so a filtered view can be shared; the cards themselves are shown, hidden and reordered in place.
 */
export function ProjectFilters({
  listId,
  categories,
  items,
  classes,
}: {
  listId: string;
  categories: string[];
  items: FilterItem[];
  classes: FilterClasses;
}) {
  const id = useId();
  const params = useSearchParams();
  const [state, setState] = useState<FilterState>(() =>
    filtersFromParams(params),
  );
  const order = useMemo(() => applyFilters(items, state), [items, state]);

  useEffect(() => {
    const list = document.getElementById(listId);
    if (list) {
      const position = new Map(order.map((slug, i) => [slug, i]));
      for (const el of list.querySelectorAll<HTMLElement>("[data-project]")) {
        const at = position.get(el.dataset.project ?? "");
        el.hidden = at === undefined;
        el.style.order = at === undefined ? "" : String(at);
      }
    }
    const query = filtersToQuery(state);
    window.history.replaceState(
      window.history.state,
      "",
      query ? `?${query}` : window.location.pathname,
    );
  }, [order, state, listId]);

  const update = (patch: Partial<FilterState>) =>
    setState((s) => ({ ...s, ...patch }));
  const changed = filtersToQuery(state) !== "";
  const shown = order.length;

  return (
    <>
      <form
        className={classes.bar}
        role="search"
        aria-label="Filter projects"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={classes.field}>
          <label className={classes.label} htmlFor={`${id}-q`}>
            Search
          </label>
          <input
            id={`${id}-q`}
            className={classes.control}
            type="search"
            value={state.q}
            placeholder="Name, language, topic"
            onChange={(e) => update({ q: e.target.value })}
          />
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor={`${id}-category`}>
            Type
          </label>
          <select
            id={`${id}-category`}
            className={classes.control}
            value={state.category}
            onChange={(e) => update({ category: e.target.value })}
          >
            <option value="">Every type</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor={`${id}-status`}>
            Status
          </label>
          <select
            id={`${id}-status`}
            className={classes.control}
            value={state.status}
            onChange={(e) => update({ status: e.target.value })}
          >
            {STATUSES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor={`${id}-sort`}>
            Sort
          </label>
          <select
            id={`${id}-sort`}
            className={classes.control}
            value={state.sort}
            onChange={(e) => update({ sort: e.target.value })}
          >
            {SORTS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className={classes.reset}
          onClick={() => setState(DEFAULT_FILTERS)}
          disabled={!changed}
        >
          Reset
        </button>
      </form>
      <p className={classes.count} role="status" aria-live="polite">
        {shown} {shown === 1 ? "project" : "projects"}
      </p>
      {shown === 0 ? (
        <p className={classes.empty}>Nothing matches those filters.</p>
      ) : null}
    </>
  );
}
