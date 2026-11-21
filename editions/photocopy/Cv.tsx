import Image from "next/image";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import { artPaths } from "@/lib/content";
import { projectMeta, skillRows, type CvData } from "@/lib/content/cv";
import { certificationMeta, formatNumber } from "@/lib/format";
import s from "./photocopy.module.css";

export function Cv({ data }: { data: CvData }) {
  const { cv, site, projects, stats, siteUrl } = data;
  return (
    <div className={s.cvWrap}>
      <div className={s.cvBar} data-print-hide>
        <Link href="/" className={s.typed}>
          ← back to the zine
        </Link>
        <p className={s.markerNote}>print it, copy it, pass it on.</p>
        <PrintButton className={s.stamp}>SAVE AS PDF</PrintButton>
      </div>

      <article className={s.cvSheet} aria-labelledby="cv-name">
        <header className={s.cvHead}>
          <div className={s.cvHeadText}>
            <p className={s.typed}>CURRICULUM VITAE</p>
            <h1 id="cv-name" className={s.cvName}>
              <span className={s.hl}>{cv.name}</span>
            </h1>
            <p className={s.cvHandle}>
              a.k.a.{" "}
              <span className={s.label}>{site.handle.toUpperCase()}</span>
            </p>
            <p className={s.cvHeadline}>{cv.headline}</p>
            <p
              className={s.markerNote}
              style={{ transform: "rotate(-2deg)", transformOrigin: "left" }}
            >
              {site.availability.toLowerCase()}!
            </p>
          </div>
          <figure className={s.cvPortrait}>
            <span
              className={s.tape}
              style={{
                left: "22%",
                top: -10,
                width: 70,
                height: 18,
                transform: "rotate(-6deg)",
              }}
              aria-hidden="true"
            />
            <Image
              src={artPaths(null).xerox}
              alt={`${site.handle}'s avatar, photocopied`}
              width={900}
              height={900}
              sizes="130px"
            />
          </figure>
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
                PROFILE
              </h2>
              <p className={s.cvText}>{cv.summary}</p>
              <p className={s.cvStats}>
                {formatNumber(stats.stars)} stars ·{" "}
                {formatNumber(stats.publicRepos)} public repos ·{" "}
                {formatNumber(stats.contributions)} contributions this year
              </p>
            </section>

            {cv.experience.length ? (
              <section aria-labelledby="cv-experience">
                <h2 id="cv-experience" className={s.cvTitle}>
                  EXPERIENCE
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
                SELECTED PROJECTS
              </h2>
              {projects.map((p) => (
                <div key={p.slug} className={s.cvItem}>
                  <h3 className={s.cvItemTitle}>
                    <span className={s.hl}>
                      {p.url ? <a href={p.url}>{p.name}</a> : p.name}
                    </span>
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
                SKILLS
              </h2>
              <dl className={s.cvDefs}>
                {skillRows(site).map((r) => (
                  <div key={r.label}>
                    <dt>{r.label.toUpperCase()}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section aria-labelledby="cv-education">
              <h2 id="cv-education" className={s.cvTitle}>
                EDUCATION
              </h2>
              {site.education.map((e) => (
                <div key={e.school} className={s.cvItem}>
                  <h3 className={s.cvItemTitle}>{e.school}</h3>
                  <p className={s.cvItemMeta}>{e.period}</p>
                  <p className={s.cvText}>
                    {e.degree}
                    {e.detail ? `, ${e.detail}` : ""}.{" "}
                    <span className={s.hl}>{e.honors.join(", ")}</span>
                  </p>
                </div>
              ))}
            </section>
            <section aria-labelledby="cv-certs">
              <h2 id="cv-certs" className={s.cvTitle}>
                CERTIFIED
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
                LANGUAGES
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
