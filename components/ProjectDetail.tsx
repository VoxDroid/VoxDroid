import Image from "next/image";
import Link from "next/link";
import type React from "react";
import type { ReactNode } from "react";
import { Markdown } from "@/components/Markdown";
import { imageSize, type Project } from "@/lib/content";
import { formatDate, formatNumber, STATUS_LABEL } from "@/lib/format";

export type DetailClasses = Record<
  | "root"
  | "back"
  | "header"
  | "kicker"
  | "title"
  | "summary"
  | "art"
  | "facts"
  | "fact"
  | "factLabel"
  | "factValue"
  | "links"
  | "link"
  | "section"
  | "sectionTitle"
  | "langBar"
  | "langList"
  | "shots"
  | "shot"
  | "prose"
  | "list"
  | "listItem"
  | "listMeta"
  | "topics"
  | "topic"
  | "note",
  string | undefined
>;

export type DetailLabels = {
  back: string;
  kicker: string;
  facts: string;
  languages: string;
  writeup: string;
  shots: string;
  readme: string;
  releases: string;
  commits: string;
};

type Props = {
  project: Project;
  readme: string | null;
  classes: DetailClasses;
  labels: DetailLabels;
  art: ReactNode;
  /** Colours for the language bar; GitHub's own colours when omitted. */
  palette?: string[];
};

/** The layout every edition's project page shares; each edition supplies its classes, art and voice. */
export function ProjectDetail({
  project: p,
  readme,
  classes: c,
  labels,
  art,
  palette,
}: Props) {
  const facts: [string, string][] = [
    ["Type", p.category],
    ["Status", STATUS_LABEL[p.status]],
  ];
  if (p.language) facts.push(["Language", p.language]);
  if (p.stars !== null) facts.push(["Stars", formatNumber(p.stars)]);
  if (p.forks !== null) facts.push(["Forks", formatNumber(p.forks)]);
  if (p.createdAt) facts.push(["Started", formatDate(p.createdAt)]);
  if (p.pushedAt) facts.push(["Last push", formatDate(p.pushedAt)]);
  const latest = p.releases[0];
  if (latest) facts.push(["Latest release", latest.tag]);

  const links: { href: string; label: string }[] = [];
  if (p.url) links.push({ href: p.url, label: "Source on GitHub" });
  if (p.demo) links.push({ href: p.demo, label: "Live demo" });
  if (p.homepage && p.homepage !== p.demo)
    links.push({ href: p.homepage, label: "Website" });
  if (p.url && p.releases.length)
    links.push({ href: `${p.url}/releases`, label: "All releases" });

  return (
    <article className={c.root}>
      <Link href="/projects" className={c.back}>
        {labels.back}
      </Link>
      <header className={c.header}>
        <div>
          <p className={c.kicker}>{labels.kicker}</p>
          <h1
            className={c.title}
            style={
              { "--chars": Math.max(p.name.length, 6) } as React.CSSProperties
            }
          >
            {p.name}
          </h1>
          {p.tagline ? <p className={c.summary}>{p.tagline}</p> : null}
          {p.summary ? <p className={c.summary}>{p.summary}</p> : null}
          {links.length ? (
            <ul className={c.links}>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    className={c.link}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                    <span className="visually-hidden">
                      {" "}
                      (opens in a new tab)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {p.private ? (
            <p className={c.note}>
              This repository is private, so its source and README are not
              public.
            </p>
          ) : null}
        </div>
        <div className={c.art}>{art}</div>
      </header>

      <section className={c.section} aria-labelledby="facts">
        <h2 id="facts" className={c.sectionTitle}>
          {labels.facts}
        </h2>
        <dl className={c.facts}>
          {facts.map(([label, value]) => (
            <div key={label} className={c.fact}>
              <dt className={c.factLabel}>{label}</dt>
              <dd className={c.factValue}>{value}</dd>
            </div>
          ))}
        </dl>
        {p.topics.length ? (
          <ul className={c.topics} aria-label="Topics">
            {p.topics.map((t) => (
              <li key={t} className={c.topic}>
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {p.languages.length ? (
        <section className={c.section} aria-labelledby="languages">
          <h2 id="languages" className={c.sectionTitle}>
            {labels.languages}
          </h2>
          <div
            className={c.langBar}
            role="img"
            aria-label={p.languages
              .map((l) => `${l.name} ${l.share}%`)
              .join(", ")}
          >
            {p.languages.map((l, i) => (
              <span
                key={l.name}
                style={{
                  flexGrow: Math.max(l.share, 0.5),
                  background: palette ? palette[i % palette.length] : l.color,
                }}
              />
            ))}
          </div>
          <ul className={c.langList}>
            {p.languages.map((l, i) => (
              <li key={l.name}>
                <span
                  aria-hidden="true"
                  style={{
                    background: palette ? palette[i % palette.length] : l.color,
                  }}
                />
                {l.name} <span>{l.share}%</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {p.writeup ? (
        <section className={c.section} aria-labelledby="writeup">
          <h2 id="writeup" className={c.sectionTitle}>
            {labels.writeup}
          </h2>
          <Markdown className={c.prose}>{p.writeup}</Markdown>
        </section>
      ) : null}

      {p.screenshots.length ? (
        <section className={c.section} aria-labelledby="shots">
          <h2 id="shots" className={c.sectionTitle}>
            {labels.shots}
          </h2>
          <ul className={c.shots}>
            {p.screenshots.map((src, i) => {
              const size = imageSize(src);
              return (
                <li key={src} className={c.shot}>
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={src}
                      alt={`${p.name}, screenshot ${i + 1} of ${p.screenshots.length}`}
                      width={size.width}
                      height={size.height}
                      sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {readme && !p.private && p.readmePath && p.defaultBranch ? (
        <section className={c.section} aria-labelledby="readme">
          <h2 id="readme" className={c.sectionTitle}>
            {labels.readme}
          </h2>
          <Markdown
            className={c.prose}
            repo={{
              repo: p.repo,
              branch: p.defaultBranch,
              readmePath: p.readmePath,
            }}
          >
            {readme}
          </Markdown>
        </section>
      ) : null}

      {p.releases.length ? (
        <section className={c.section} aria-labelledby="releases">
          <h2 id="releases" className={c.sectionTitle}>
            {labels.releases}
          </h2>
          <ol className={c.list}>
            {p.releases.map((r) => (
              <li key={r.tag} className={c.listItem}>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.name}
                </a>
                <span className={c.listMeta}>
                  {r.tag} · {formatDate(r.date)}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {p.commits.length ? (
        <section className={c.section} aria-labelledby="commits">
          <h2 id="commits" className={c.sectionTitle}>
            {labels.commits}
          </h2>
          <ol className={c.list}>
            {p.commits.map((commit) => (
              <li key={commit.sha} className={c.listItem}>
                <a href={commit.url} target="_blank" rel="noopener noreferrer">
                  {commit.message || commit.sha}
                </a>
                <span className={c.listMeta}>
                  {commit.sha} · {formatDate(commit.date)}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </article>
  );
}
