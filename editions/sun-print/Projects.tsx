import Link from "next/link";
import { ProjectDetail } from "@/components/ProjectDetail";
import { ProjectFilters } from "@/components/ProjectFilters";
import type { Project } from "@/lib/content";
import { filterAttributes, filterItem } from "@/lib/filter-attributes";
import { formatNumber, roman, STATUS_LABEL } from "@/lib/format";
import { Photogram } from "./Home";
import s from "./sun-print.module.css";

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
        <p className={s.plateNo}>Appendix · {projects.length} specimens</p>
        <h1 className={s.h2}>Index of Specimens</h1>
        <p className={s.lede} style={{ marginTop: 14 }}>
          Every project, catalogued. Featured plates first; narrow by genus or
          condition, or search.
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
      <ul
        id="project-list"
        className={s.plateGrid}
        style={{ paddingBottom: 64 }}
      >
        {projects.map((p, i) => (
          <li key={p.slug} className={s.plate} {...filterAttributes(p)}>
            <Photogram p={p} />
            <div className={s.plateLabel}>
              <div className={s.plateTop}>
                <span>No. {roman(i + 1)}</span>
                <span>
                  {p.stars !== null
                    ? `★ ${formatNumber(p.stars)}`
                    : STATUS_LABEL[p.status].toLowerCase()}
                </span>
              </div>
              <h2 className={s.plateName}>
                <Link href={`/projects/${p.slug}`}>{p.name}</Link>
              </h2>
              <p className={s.plateGenus}>
                Genus: {p.category}
                {p.language ? ` · Medium: ${p.language}` : ""} ·{" "}
                {STATUS_LABEL[p.status]}
              </p>
              {p.summary ? <p className={s.plateDesc}>{p.summary}</p> : null}
            </div>
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
  return (
    <ProjectDetail
      project={project}
      readme={readme}
      palette={["#123f8c", "#3b64a8", "#6b8cc4", "#9bb3dc", "#c9d6ec"]}
      labels={{
        back: "← The index of specimens",
        kicker: `${project.featured !== null ? `Plate ${roman(project.featured + 1).toUpperCase()} · ` : ""}Genus: ${project.category}`,
        facts: "Specimen notes",
        languages: "Composition",
        writeup: "Field notes",
        shots: "Exposures",
        readme: "Transcribed from the README",
        releases: "Releases",
        commits: "Recent observations",
      }}
      art={
        <Photogram
          p={project}
          label={
            project.art
              ? `${project.name} logo as a cyanotype photogram`
              : undefined
          }
        />
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
      <p className={s.plateNo}>Plate missing</p>
      <h1 id="lost-title" className={s.title}>
        4<em>0</em>4
      </h1>
      <p className={s.subtitle}>This plate was never exposed.</p>
      <p className={s.coverLinks}>
        <Link href="/">→ Back to Plate I</Link>
        <Link href="/projects">→ The index</Link>
      </p>
    </section>
  );
}
