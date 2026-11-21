import Link from "next/link";
import { InkMask } from "@/components/InkMask";
import { PrintButton } from "@/components/PrintButton";
import { artPaths } from "@/lib/content";
import { projectMeta, skillRows, type CvData } from "@/lib/content/cv";
import { certificationMeta, formatNumber, pad2 } from "@/lib/format";
import s from "./two-inks.module.css";

export function Cv({ data }: { data: CvData }) {
  const { cv, site, projects, stats, siteUrl } = data;
  const art = artPaths(null);
  return (
    <div className={s.cvWrap}>
      <div className={s.cvBar} data-print-hide>
        <Link href="/" className={s.mono}>
          ← Back to the issue
        </Link>
        <p className={s.mono}>Curriculum vitae · A4 · two inks</p>
        <PrintButton className={s.cvPrint}>Save as PDF</PrintButton>
      </div>

      <article className={s.cvSheet} aria-labelledby="cv-name">
        <header className={s.cvHead}>
          <div>
            <p className={s.mono}>Curriculum vitae</p>
            <h1 id="cv-name" className={s.cvName}>
              {cv.name}
            </h1>
            <p className={s.cvHandle}>{site.handle.toUpperCase()}</p>
            <p className={s.cvHeadline}>{cv.headline}</p>
          </div>
          <div className={s.cvPortrait}>
            <InkMask
              src={art.risoWarm}
              ink="var(--ink-b)"
              style={{ transform: "translate(2px, 2px)" }}
            />
            <InkMask
              src={art.risoKey}
              ink="var(--ink-a)"
              label={`${site.handle}'s avatar as a two-colour halftone`}
            />
          </div>
        </header>

        <ul className={s.cvContact}>
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <a href={siteUrl}>{siteUrl.replace(/^https?:\/\//, "")}</a>
          </li>
          {site.links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.handle}</a>
            </li>
          ))}
        </ul>

        <div className={s.cvBody}>
          <div className={s.cvMain}>
            <section aria-labelledby="cv-profile">
              <h2 id="cv-profile" className={s.cvTitle}>
                Profile
              </h2>
              <p className={s.cvText}>{cv.summary}</p>
              <p className={s.cvStats}>
                <span>
                  <strong>{formatNumber(stats.stars)}</strong> GitHub stars
                </span>
                <span>
                  <strong>{formatNumber(stats.publicRepos)}</strong> public
                  repositories
                </span>
                <span>
                  <strong>{formatNumber(stats.contributions)}</strong>{" "}
                  contributions this year
                </span>
              </p>
            </section>

            {cv.experience.length ? (
              <section aria-labelledby="cv-experience">
                <h2 id="cv-experience" className={s.cvTitle}>
                  Experience
                </h2>
                {cv.experience.map((x) => (
                  <div key={`${x.org}-${x.period}`} className={s.cvItem}>
                    <h3 className={s.cvItemTitle}>
                      {x.role}, {x.org}
                    </h3>
                    <p className={s.cvItemMeta}>{x.period}</p>
                    <ul className={s.cvPoints}>
                      {x.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ) : null}

            <section aria-labelledby="cv-projects">
              <h2 id="cv-projects" className={s.cvTitle}>
                Selected projects
              </h2>
              {projects.map((p, i) => (
                <div key={p.slug} className={s.cvItem}>
                  <h3 className={s.cvItemTitle}>
                    <span
                      className={i % 2 ? s.inkB : s.inkA}
                      aria-hidden="true"
                    >
                      {pad2(i + 1)}{" "}
                    </span>
                    {p.url ? <a href={p.url}>{p.name}</a> : p.name}
                  </h3>
                  <p className={s.cvItemMeta}>{projectMeta(p)}</p>
                  <p className={s.cvText}>{p.summary}</p>
                </div>
              ))}
            </section>
          </div>

          <aside className={s.cvSide} aria-label="Skills, education and more">
            <section aria-labelledby="cv-skills">
              <h2 id="cv-skills" className={s.cvTitle}>
                Skills
              </h2>
              <dl className={s.cvDefs}>
                {skillRows(site).map((r) => (
                  <div key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section aria-labelledby="cv-education">
              <h2 id="cv-education" className={s.cvTitle}>
                Education
              </h2>
              {site.education.map((e) => (
                <div key={e.school} className={s.cvItem}>
                  <h3 className={s.cvItemTitle}>{e.school}</h3>
                  <p className={s.cvItemMeta}>{e.period}</p>
                  <p className={s.cvText}>
                    {e.degree}
                    {e.detail ? `, ${e.detail}` : ""}. {e.honors.join(". ")}.
                  </p>
                </div>
              ))}
            </section>
            <section aria-labelledby="cv-certs">
              <h2 id="cv-certs" className={s.cvTitle}>
                Certifications
              </h2>
              {site.certifications.map((c) => (
                <div key={c.id} className={s.cvItem}>
                  <h3 className={s.cvItemTitle}>
                    {c.href ? <a href={c.href}>{c.name}</a> : c.name}
                  </h3>
                  <p className={s.cvItemMeta}>{certificationMeta(c)}</p>
                </div>
              ))}
            </section>
            <section aria-labelledby="cv-languages">
              <h2 id="cv-languages" className={s.cvTitle}>
                Languages
              </h2>
              <p className={s.cvText}>
                {site.spokenLanguages
                  .map((l) => `${l.name} (${l.level.toLowerCase()})`)
                  .join(", ")}
              </p>
            </section>
          </aside>
        </div>
      </article>
    </div>
  );
}
