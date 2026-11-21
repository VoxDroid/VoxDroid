import Link from "next/link";
import { InkMask } from "@/components/InkMask";
import { ProjectDetail } from "@/components/ProjectDetail";
import { ProjectFilters } from "@/components/ProjectFilters";
import { artPaths, type Project } from "@/lib/content";
import { filterAttributes, filterItem } from "@/lib/filter-attributes";
import { formatNumber, STATUS_LABEL } from "@/lib/format";
import s from "./two-inks.module.css";

function CardArt({ p }: { p: Project }) {
  if (!p.art)
    return (
      <span className={s.cardType} aria-hidden="true">
        {p.name.charAt(0).toUpperCase()}
      </span>
    );
  const art = artPaths(p.slug);
  return (
    <span className={s.cardArt} aria-hidden="true">
      <InkMask
        className={s.cardArtWarm}
        src={art.risoWarm}
        ink="var(--ink-b)"
      />
      <InkMask src={art.risoKey} ink="var(--ink-a)" />
    </span>
  );
}

export function ProjectsIndex({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  return (
    <>
      <header className={s.indexHead}>
        <p className={s.mono}>The full bill · {projects.length} acts</p>
        <h1 className={s.indexTitle}>THE INDEX</h1>
        <p className={s.indexLede}>
          Every project on the site, headliners first. Filter by type or status,
          or search for a language or topic.
        </p>
      </header>
      <ProjectFilters
        listId="project-list"
        items={projects.map(filterItem)}
        categories={categories}
        classes={{
          bar: s.filterBar,
          field: s.filterField,
          label: s.filterLabel,
          control: s.filterControl,
          count: s.filterCount,
          reset: s.filterReset,
          empty: s.filterEmpty,
        }}
      />
      <ul id="project-list" className={s.cards}>
        {projects.map((p) => (
          <li key={p.slug} className={s.card} {...filterAttributes(p)}>
            <CardArt p={p} />
            <h2 className={s.cardName}>
              <Link href={`/projects/${p.slug}`}>{p.name}</Link>
            </h2>
            <p className={s.cardMeta}>
              {p.category} · {STATUS_LABEL[p.status]}
              {p.language ? ` · ${p.language}` : ""}
              {p.stars !== null ? ` · ${formatNumber(p.stars)} ★` : ""}
              {p.featured !== null ? " · Featured" : ""}
            </p>
            {p.summary ? <p className={s.cardSummary}>{p.summary}</p> : null}
          </li>
        ))}
      </ul>
    </>
  );
}

export function Detail({
  project,
  readme,
}: {
  project: Project;
  readme: string | null;
}) {
  const art = artPaths(project.slug);
  return (
    <ProjectDetail
      project={project}
      readme={readme}
      palette={[
        "var(--ink-a)",
        "var(--ink-b)",
        "var(--overprint)",
        "#8a85d8",
        "#ff9d95",
      ]}
      labels={{
        back: "← Back to the index",
        kicker: `${project.category}${project.featured !== null ? ` · Featured act Nº ${project.featured}` : ""}`,
        facts: "The facts",
        languages: "Inks used",
        writeup: "Programme note",
        shots: "Stills",
        readme: "From the README",
        releases: "Releases",
        commits: "Latest commits",
      }}
      art={
        project.art ? (
          <div className={s.detailArtFrame}>
            <InkMask
              src={art.risoWarm}
              ink="var(--ink-b)"
              style={{
                transform: "translate(var(--shift), calc(var(--shift) * .7))",
              }}
            />
            <InkMask
              src={art.risoKey}
              ink="var(--ink-a)"
              label={`${project.name} logo, printed as a two-colour halftone`}
            />
          </div>
        ) : (
          <div className={s.detailArtType} aria-hidden="true">
            {project.name.charAt(0).toUpperCase()}
          </div>
        )
      }
      classes={{
        root: s.detail,
        back: s.detailBack,
        header: s.detailHeader,
        kicker: s.detailKicker,
        title: s.detailTitle,
        summary: s.detailSummary,
        art: s.detailArt,
        facts: s.detailFacts,
        fact: s.detailFact,
        factLabel: s.detailFactLabel,
        factValue: s.detailFactValue,
        links: s.detailLinks,
        link: s.detailLink,
        section: s.detailSection,
        sectionTitle: s.detailSectionTitle,
        langBar: s.detailLangBar,
        langList: s.detailLangList,
        shots: s.detailShots,
        shot: s.detailShot,
        prose: s.prose,
        list: s.detailList,
        listItem: s.detailListItem,
        listMeta: s.detailListMeta,
        topics: s.detailTopics,
        topic: s.detailTopic,
        note: s.detailNote,
      }}
    />
  );
}

export function NotFound() {
  return (
    <section className={s.lost} aria-labelledby="lost-title">
      <p className={s.mono}>Misprint · page not found</p>
      <h1 id="lost-title" className={s.lostTitle}>
        404
      </h1>
      <p style={{ fontSize: 20, maxWidth: "40ch" }}>
        This page never made it to the press. The rest of the issue is still
        here.
      </p>
      <p className={s.coverLinks}>
        <Link href="/">→ Back to the cover</Link>
        <Link href="/projects">→ The index</Link>
      </p>
    </section>
  );
}
