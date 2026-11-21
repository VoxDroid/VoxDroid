import Link from "next/link";
import { InkMask } from "@/components/InkMask";
import {
  artPaths,
  CYAN_PANEL,
  type HomeData,
  type Project,
} from "@/lib/content";
import {
  certificationMeta,
  formatDate,
  formatNumber,
  roman,
  yearOf,
} from "@/lib/format";
import s from "./sun-print.module.css";

const TILTS = [
  "-0.6deg",
  "0.5deg",
  "-0.3deg",
  "0.7deg",
  "-0.5deg",
  "0.3deg",
  "-0.7deg",
  "0.4deg",
  "-0.2deg",
  "0.6deg",
];

function Cover({ site }: Pick<HomeData, "site">) {
  return (
    <section className={s.cover} aria-labelledby="cover-title">
      <div className={s.coverText}>
        <p className={s.plateNo}>
          Plate I · exposed 2015 — {new Date().getUTCFullYear()}
        </p>
        <h1 id="cover-title" className={s.title}>
          Vox<em>Droid</em>
        </h1>
        <p className={s.subtitle}>
          Photograms of systems, intelligence &amp; code.
        </p>
        <p className={s.intro}>{site.intro}</p>
        <p className={s.coverLinks}>
          <Link href="/#work">→ Turn to the plates</Link>
          <Link href="/projects">→ The full index</Link>
        </p>
      </div>
      <figure className={s.mount}>
        <div className={s.print} style={{ aspectRatio: "820 / 960" }}>
          <InkMask
            src={artPaths(null).cyan}
            ink="var(--blue)"
            label={`${site.handle}'s avatar as a cyanotype sun print`}
          />
          <span className={`${s.corner} ${s.tl}`} aria-hidden="true" />
          <span className={`${s.corner} ${s.tr}`} aria-hidden="true" />
          <span className={`${s.corner} ${s.bl}`} aria-hidden="true" />
          <span className={`${s.corner} ${s.br}`} aria-hidden="true" />
        </div>
        <figcaption
          className={s.slipLabel}
          style={{ transform: "rotate(-.8deg)" }}
        >
          Plate I. <em>The developer, refuelling.</em> Exposure: 6+ yrs. Medium:
          bread.
        </figcaption>
      </figure>
    </section>
  );
}

function Measurements({ github }: Pick<HomeData, "github">) {
  const c = github.contributions;
  const peak = Math.max(1, ...c.weeks);
  const measures = [
    {
      v: formatNumber(github.profile.stars),
      label: "stars",
      note: "across public repositories",
    },
    {
      v: formatNumber(github.profile.publicRepos),
      label: "repositories",
      note: `public, on github.com/${github.login}`,
    },
    {
      v: formatNumber(c.lastYear),
      label: "contributions",
      note: "in the last twelve months",
    },
    { v: "6+", label: "years of code", note: "first exposure, 2015" },
  ];
  const ledger: [string, string][] = [
    ["Followers", formatNumber(github.profile.followers)],
    ["Forks", formatNumber(github.profile.forks)],
    ["All-time contributions", formatNumber(c.total)],
    ["Current streak", `${formatNumber(c.current)} days`],
    ["Longest streak", `${formatNumber(c.longest)} days`],
    ["On GitHub since", String(yearOf(github.profile.createdAt))],
  ];
  const langs = github.languages.slice(0, 6);
  const shade = (i: number) => 1 - i * 0.14;
  return (
    <section id="github" aria-labelledby="measure-title">
      <h2 id="measure-title" className="visually-hidden">
        Measurements from GitHub
      </h2>
      <ul className={s.measures}>
        {measures.map((m) => (
          <li key={m.label} className={s.measure}>
            <span>
              <span className={s.measureLabel}>{m.label}</span>
              <span className={s.measureNote}>{m.note}</span>
            </span>
            <span className={s.measureValue}>{m.v}</span>
          </li>
        ))}
      </ul>
      <div className={s.observations}>
        <div>
          <h3 className={s.obsTitle}>Ledger</h3>
          <dl className={s.ledger}>
            {ledger.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className={s.obsTitle}>Spectrum, by share of code</h3>
          <div
            className={s.spectrum}
            role="img"
            aria-label={langs.map((l) => `${l.name} ${l.share}%`).join(", ")}
          >
            {langs.map((l, i) => (
              <span
                key={l.name}
                style={{ flexGrow: l.share, opacity: shade(i) }}
              />
            ))}
          </div>
          <ul className={s.spectrumKey}>
            {langs.map((l, i) => (
              <li key={l.name}>
                <span style={{ opacity: shade(i) }} aria-hidden="true" />
                {l.name} · {l.share}%
              </li>
            ))}
          </ul>
          <h3 className={s.obsTitle} style={{ marginTop: 24 }}>
            Daylight log, a year of weeks
          </h3>
          <div
            className={s.exposure}
            role="img"
            aria-label={`Weekly contributions over the last year, the busiest week had ${peak}.`}
          >
            {c.weeks.map((n, i) => (
              <span key={i} style={{ opacity: 0.08 + 0.92 * (n / peak) }} />
            ))}
          </div>
          <p className={s.exposureCaption}>
            <span>a year ago</span>
            <span>darker, busier</span>
            <span>this week</span>
          </p>
        </div>
        <div>
          <h3 className={s.obsTitle}>Field log</h3>
          <ul className={s.log}>
            {github.activity.map((a, i) => (
              <li key={`${a.date}-${i}`}>
                <time dateTime={a.date}>
                  {formatDate(a.date + "T00:00:00Z").replace(/, \d{4}$/, "")}
                </time>
                <a href={a.url}>{a.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Photogram({ p, label }: { p: Project; label?: string }) {
  return (
    <div className={s.photogram}>
      {p.art ? (
        <InkMask src={artPaths(p.slug).cyan} ink="var(--blue)" label={label} />
      ) : (
        <>
          <InkMask src={CYAN_PANEL} ink="var(--blue)" />
          <span className={s.photogramInitial} aria-hidden="true">
            {p.name.charAt(0).toUpperCase()}
          </span>
        </>
      )}
    </div>
  );
}

function Plates({
  featured,
  projects,
}: Pick<HomeData, "featured" | "projects">) {
  return (
    <section id="work" className={s.section} aria-labelledby="work-title">
      <div className={s.sectionHead}>
        <div>
          <p className={s.plateNo}>
            Plates {roman(2).toUpperCase()} —{" "}
            {roman(featured.length + 1).toUpperCase()}
          </p>
          <h2 id="work-title" className={s.h2}>
            The Work
          </h2>
        </div>
        <p className={s.lede}>
          {featured.length} projects, each laid on coated paper and left in the
          sun. What blocked the light stays white.{" "}
          <Link href="/projects">
            {projects.length - featured.length} more specimens in the index →
          </Link>
        </p>
      </div>
      <ul className={s.plateGrid}>
        {featured.map((p, i) => (
          <li key={p.slug} className={s.plate}>
            <Photogram p={p} />
            <div
              className={s.plateLabel}
              style={{ transform: `rotate(${TILTS[i % TILTS.length]})` }}
            >
              <div className={s.plateTop}>
                <span>PLATE {roman(i + 2).toUpperCase()}</span>
                <span>
                  {p.stars !== null ? `★ ${formatNumber(p.stars)}` : "private"}
                </span>
              </div>
              <h3 className={s.plateName}>
                <Link href={`/projects/${p.slug}`}>{p.name}</Link>
              </h3>
              <p className={s.plateGenus}>
                Genus: {p.category}
                {p.language ? ` · Medium: ${p.language}` : ""}
              </p>
              <p className={s.plateDesc}>{p.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FieldNotes({ site }: Pick<HomeData, "site">) {
  const [p0, ...rest] = site.about.paragraphs;
  const first = p0 ?? "";
  // Growth rings: one ring per year since 2015, thicker and darker as the work grew.
  const startYear = 2015;
  const endYear = new Date().getUTCFullYear();
  const phaseOf = (y: number) =>
    y < 2017 ? 0 : y < 2021 ? 1 : y < 2024 ? 2 : 3;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, k) => startYear + k,
  );
  const step = 180 / years.length;
  return (
    <section
      id="about"
      className={`${s.section} ${s.sectionRule}`}
      aria-labelledby="notes-title"
    >
      <div className={s.notesRow}>
        <div className={s.notesMain}>
          <p className={s.plateNo}>Plate III</p>
          <h2 id="notes-title" className={s.h2} style={{ marginBottom: 26 }}>
            Field Notes
          </h2>
          <p className={s.pull}>“{site.about.lead}”</p>
          <div className={s.columns}>
            <p>
              <span className={s.dropCap} aria-hidden="true">
                {first.charAt(0)}
              </span>
              <span className="visually-hidden">{first.charAt(0)}</span>
              {first.slice(1)}
            </p>
            {rest.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
            <p>
              {site.availability}. {site.about.now}
            </p>
          </div>
          <div className={s.habitats}>
            <div>
              <h3 className={s.habitatTitle}>Habitats</h3>
              <ul className={s.plainList}>
                {site.focus.map((f) => (
                  <li key={f.title}>
                    <strong>{f.title}</strong>: {f.detail}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={s.habitatTitle}>Instruments</h3>
              <ul className={s.plainList}>
                {site.stack.map((g) => (
                  <li key={g.group}>
                    <strong>{g.group}</strong>: {g.items.join(", ")}
                  </li>
                ))}
                <li>
                  <strong>Also</strong>:{" "}
                  {site.skills.programmingLanguages.join(", ")}
                </li>
                <li>
                  <strong>Systems</strong>:{" "}
                  {site.skills.operatingSystems
                    .map((o) => `${o.name} (${o.level.toLowerCase()})`)
                    .join(", ")}
                </li>
                <li>
                  <strong>Hardware</strong>: {site.skills.hardware.join(", ")}
                </li>
                <li>
                  <strong>Tools</strong>:{" "}
                  {[...site.skills.software, ...site.skills.other].join(", ")}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={s.habitatTitle}>Provenance</h3>
              <ul className={s.plainList}>
                {site.education.map((e) => (
                  <li key={e.school}>
                    <strong>{e.school}</strong>, {e.degree}
                    {e.detail ? `, ${e.detail}` : ""} ({e.period}).{" "}
                    <em>{e.honors.join("; ")}</em>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={s.habitatTitle}>Certified</h3>
              <ul className={s.plainList}>
                {site.certifications.map((c) => (
                  <li key={c.id}>
                    {c.href ? <a href={c.href}>{c.name}</a> : c.name}
                    <span className={s.measureNote}>
                      {certificationMeta(c)}
                    </span>
                  </li>
                ))}
              </ul>
              <h3 className={s.habitatTitle} style={{ marginTop: 16 }}>
                Also observed
              </h3>
              <p>
                Speaks{" "}
                {site.spokenLanguages
                  .map((l) => `${l.name} (${l.level.toLowerCase()})`)
                  .join(" and ")}
                . Interested in {site.interests.join(", ").toLowerCase()}.
              </p>
            </div>
          </div>
        </div>
        <figure id="journey" className={s.rings}>
          <svg
            viewBox="0 0 400 400"
            role="img"
            aria-label={`Growth rings, one per year from ${startYear} at the centre to ${endYear} at the bark, grouped into ${site.journey.length} phases.`}
          >
            {years.map((y, k) => {
              const ph = phaseOf(y);
              return (
                <circle
                  key={y}
                  cx="200"
                  cy="200"
                  r={14 + k * step}
                  fill="none"
                  stroke="var(--blue)"
                  strokeWidth={[3, 6, 9, 12][ph]}
                  strokeOpacity={[0.35, 0.55, 0.75, 0.95][ph]}
                />
              );
            })}
            <path
              d="M200 200 L394 160"
              stroke="var(--ink)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <text
              x="206"
              y="196"
              fontFamily="var(--mono)"
              fontSize="11"
              fill="var(--ink)"
            >
              {startYear}
            </text>
            <text
              x="352"
              y="150"
              fontFamily="var(--mono)"
              fontSize="11"
              fill="var(--ink)"
            >
              {endYear}
            </text>
          </svg>
          <figcaption className={s.measureNote}>
            Fig. 3: cross-section, one ring per year. Darker rings, faster
            growth.
          </figcaption>
          <ol className={s.phases}>
            {site.journey.map((j) => (
              <li key={j.title} className={s.phase}>
                <div className={s.phaseHead}>
                  <span className={s.phaseName}>{j.title}</span>
                  <span className={s.plateNo}>{j.period}</span>
                </div>
                <p style={{ fontSize: 15 }}>{j.detail}</p>
                <code className={s.phaseCmd}>$ {j.command}</code>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}

const METHOD = ["Coat", "Expose", "Wash", "Mount"];

function Practices({ site }: Pick<HomeData, "site">) {
  return (
    <section
      id="services"
      className={`${s.section} ${s.sectionRule}`}
      aria-labelledby="practice-title"
    >
      <p className={s.plateNo}>Plate IV</p>
      <h2 id="practice-title" className={s.h2} style={{ marginBottom: 30 }}>
        Index of Practices
      </h2>
      <ol className={s.practices}>
        {site.services.map((svc, i) => (
          <li key={svc.title} className={s.practice}>
            <div className={s.practiceHead}>
              <span className={s.practiceNo} aria-hidden="true">
                {roman(i + 1)}.
              </span>
              <h3 className={s.practiceTitle}>{svc.title}</h3>
              <span className={s.leader} aria-hidden="true" />
            </div>
            <p className={s.practiceBody}>
              {svc.description} {svc.features.join(", ")}.{" "}
              <span className={s.practiceTech}>
                {svc.technologies.join(", ")}
              </span>
            </p>
          </li>
        ))}
      </ol>
      <h3 className={s.obsTitle} style={{ marginTop: 40 }}>
        Method: how a project is printed
      </h3>
      <ol className={s.method}>
        {site.process.map((p, i) => (
          <li key={p.title} className={s.methodStep}>
            <InkMask
              src={CYAN_PANEL}
              ink="var(--blue)"
              style={{ opacity: 0.6 + i * 0.13 }}
            />
            <span className={s.mono} style={{ fontSize: 12.5 }}>
              0{i + 1} · {METHOD[i] ?? ""}
            </span>
            <span className={s.methodTitle}>{p.title}</span>
            <span style={{ fontSize: 15 }}>{p.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Correspondence({ site }: Pick<HomeData, "site">) {
  return (
    <section
      id="contact"
      className={`${s.section} ${s.sectionRule}`}
      aria-labelledby="write-title"
    >
      <div className={s.writeRow}>
        <div className={s.letterPanel}>
          <InkMask src={CYAN_PANEL} ink="var(--blue)" />
          <div className={s.letterInner}>
            <p className={s.mono}>Plate V · echo $COLLABORATION_STATUS</p>
            <h2
              id="write-title"
              className={s.h2}
              style={{ fontSize: "clamp(58px, 7.4vw, 112px)" }}
            >
              Correspondence
            </h2>
            <p style={{ maxWidth: "48ch", fontSize: 18 }}>
              {site.contact.heading} {site.contact.body}
            </p>
            <a className={s.email} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <ul className={s.letterLinks}>
              {site.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={s.questions}>
          <h2 className={s.questionsTitle}>Questions often asked</h2>
          {site.faq.map((f) => (
            <div key={f.q} className={s.question}>
              <h3 className={s.questionQ}>{f.q}</h3>
              <p className={s.questionA}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home({ data }: { data: HomeData }) {
  return (
    <>
      <Cover site={data.site} />
      <Measurements github={data.github} />
      <Plates featured={data.featured} projects={data.projects} />
      <FieldNotes site={data.site} />
      <Practices site={data.site} />
      <Correspondence site={data.site} />
    </>
  );
}
