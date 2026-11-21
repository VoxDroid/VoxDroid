import Image from "next/image";
import Link from "next/link";
import { ProjectDetail } from "@/components/ProjectDetail";
import { ProjectFilters } from "@/components/ProjectFilters";
import { artPaths, type Project } from "@/lib/content";
import { filterAttributes, filterItem } from "@/lib/filter-attributes";
import { formatNumber, STATUS_LABEL } from "@/lib/format";
import { seedOf, tilt, tornEdge } from "@/lib/paste-up";
import s from "./photocopy.module.css";

export function ProjectsIndex({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  return (
    <>
      <header className={s.archiveHead}>
        <h1 className={s.archiveTitle}>The Archive</h1>
        <span className={s.bungeeTag}>{projects.length} CLIPPINGS</span>
        <p className={s.typed} style={{ flexBasis: "100%" }}>
          Every project, cut out and filed. Featured ones first.
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
      <ul id="project-list" className={s.archive}>
        {projects.map((p) => {
          const seed = seedOf(p.slug);
          return (
            <li
              key={p.slug}
              className={s.clip}
              style={{
                transform: `rotate(${tilt(seed, 1.6)})`,
                clipPath: tornEdge(seed, 1.4),
              }}
              {...filterAttributes(p)}
            >
              <span
                className={s.tape}
                style={{
                  left: "34%",
                  top: 0,
                  transform: `rotate(${tilt(seed + 1, 8)})`,
                }}
                aria-hidden="true"
              />
              <div className={s.clipHead}>
                {p.art ? (
                  <Image
                    className={s.clipArt}
                    src={artPaths(p.slug).xerox}
                    alt=""
                    width={360}
                    height={360}
                    sizes="86px"
                  />
                ) : (
                  <span className={s.clipInitial} aria-hidden="true">
                    {p.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <div style={{ minWidth: 0 }}>
                  <h2 className={s.clipName}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className={s.clipStretch}
                    >
                      {p.featured !== null ? (
                        <span className={s.hl}>{p.name}</span>
                      ) : (
                        p.name
                      )}
                    </Link>
                  </h2>
                  <p className={s.clipMeta}>
                    {p.category} · {STATUS_LABEL[p.status].toLowerCase()}
                    {p.language ? ` · ${p.language}` : ""}
                    {p.stars !== null ? ` · ${formatNumber(p.stars)} ★` : ""}
                  </p>
                </div>
              </div>
              {p.summary ? <p className={s.clipBody}>{p.summary}</p> : null}
            </li>
          );
        })}
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
      palette={[
        "#141414",
        "repeating-linear-gradient(-45deg, #141414 0 2px, transparent 2px 6px)",
        "#f5ff3d",
        "repeating-linear-gradient(90deg, #141414 0 1px, transparent 1px 5px)",
        "#fbfaf7",
      ]}
      labels={{
        back: "← back to the archive",
        kicker: `CLIPPING${project.featured !== null ? ` Nº ${project.featured}` : ""} · ${project.category.toUpperCase()}`,
        facts: "THE FACTS",
        languages: "WHAT IT'S WRITTEN IN",
        writeup: "THE STORY",
        shots: "PHOTOCOPIED SCREENS",
        readme: "THE README, REPRINTED",
        releases: "RELEASES",
        commits: "LATEST COMMITS",
      }}
      art={
        project.art ? (
          <>
            <span
              className={s.tape}
              style={{ left: "30%", top: -10, transform: "rotate(-4deg)" }}
              aria-hidden="true"
            />
            <Image
              src={artPaths(project.slug).xerox}
              alt={`${project.name} logo, photocopied`}
              width={360}
              height={360}
              sizes="360px"
            />
          </>
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
      <span className={s.label}>PAPER JAM</span>
      <h1 id="lost-title" className={s.archiveTitle}>
        404
      </h1>
      <p className={s.markerNote}>this page got stuck in the copier.</p>
      <p style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
        <Link href="/" style={{ padding: "10px 0" }}>
          ← back to the cover
        </Link>
        <Link href="/projects" style={{ padding: "10px 0" }}>
          the archive →
        </Link>
      </p>
    </section>
  );
}
