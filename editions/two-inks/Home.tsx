import Link from "next/link";
import { InkMask } from "@/components/InkMask";
import { artPaths, type HomeData, type Project } from "@/lib/content";
import { formatDate, formatNumber, pad2, yearOf } from "@/lib/format";
import { stagesFor } from "@/lib/lineup";
import s from "./two-inks.module.css";

const STAMP_TILT = ["-7deg", "5deg", "-4deg", "6deg", "-5deg"];

function Cover({ site }: Pick<HomeData, "site">) {
  const art = artPaths(null);
  return (
    <section className={s.cover} aria-labelledby="cover-title">
      <div className={s.portrait}>
        <InkMask
          className={s.portraitWarm}
          src={art.risoWarm}
          ink="var(--ink-b)"
        />
        <InkMask
          className={s.portraitKey}
          src={art.risoKey}
          ink="var(--ink-a)"
          label="VoxDroid's avatar, printed as a two-colour halftone"
        />
        <span className={`${s.mono} ${s.fig}`}>
          Fig. 1: the developer, refuelling
        </span>
      </div>
      <h1 id="cover-title" className={s.title}>
        <span className={s.titleA}>VOX</span>
        <span className={s.titleB}>DROID</span>
      </h1>
      <div className={s.coverText}>
        <p className={s.mono}>
          {site.role} · {site.tagline}
        </p>
        <p className={s.intro}>{site.intro}</p>
        <p className={s.coverLinks}>
          <Link href="/#work">→ The work, p.03</Link>
          <Link href="/projects">→ Every project</Link>
          <a href={`mailto:${site.email}`}>→ Write to me</a>
        </p>
      </div>
    </section>
  );
}

function Numbers({ github, site }: Pick<HomeData, "github" | "site">) {
  const c = github.contributions;
  const peak = Math.max(1, ...c.weeks);
  const big = [
    {
      v: formatNumber(github.profile.stars),
      label: "Stars",
      note: "across public repositories",
      ink: s.inkA,
    },
    {
      v: formatNumber(github.profile.publicRepos),
      label: "Repositories",
      note: "public, and counting",
      ink: s.inkB,
    },
    {
      v: formatNumber(c.lastYear),
      label: "Contributions",
      note: "in the last 12 months",
      ink: s.inkA,
    },
    {
      v: "6+",
      label: "Years of code",
      note: "interest sparked in 2015",
      ink: s.inkB,
    },
  ];
  const facts: [string, string][] = [
    ["Followers", formatNumber(github.profile.followers)],
    ["Forks", formatNumber(github.profile.forks)],
    ["All-time contributions", formatNumber(c.total)],
    ["Current streak", `${formatNumber(c.current)} days`],
    ["Longest streak", `${formatNumber(c.longest)} days`],
    ["On GitHub since", String(yearOf(github.profile.createdAt))],
  ];
  return (
    <section id="github" className={s.section} aria-labelledby="numbers-title">
      <div className={s.dots} aria-hidden="true" />
      <div className={s.sectionHead}>
        <h2 id="numbers-title" className={s.mono}>
          02 · By the numbers, from github.com/{github.login}
        </h2>
        <a className={s.mono} href={site.links[0].href}>
          Visit the profile ↗
        </a>
      </div>
      <ul className={s.bigStats}>
        {big.map((b) => (
          <li key={b.label} className={s.bigStat}>
            <span>
              <span className={s.bigLabel}>{b.label}</span>
              <span className={s.bigNote}>{b.note}</span>
            </span>
            <span className={`${s.bigValue} ${b.ink}`}>{b.v}</span>
          </li>
        ))}
      </ul>
      <div className={s.ledger}>
        <div>
          <h3 className={s.ledgerTitle}>The ledger</h3>
          <dl className={s.factList}>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className={s.ledgerTitle}>Languages, by share of code</h3>
          {github.languages.slice(0, 6).map((l, i) => (
            <div key={l.name} className={s.langRow}>
              <span>{l.name}</span>
              <span className={s.langTrack} aria-hidden="true">
                <span
                  className={s.langFill}
                  style={{
                    display: "block",
                    width: `${Math.max(l.share, 1)}%`,
                    background: i % 2 ? "var(--ink-b)" : "var(--ink-a)",
                  }}
                />
              </span>
              <span className={s.langPct}>{l.share}%</span>
            </div>
          ))}
          <h3 className={s.ledgerTitle} style={{ marginTop: 26 }}>
            Contributions per week, last 12 months
          </h3>
          <div
            className={s.weeks}
            role="img"
            aria-label={`Weekly contributions over the last year, peaking at ${peak} in one week.`}
          >
            {c.weeks.map((n, i) => (
              <span
                key={i}
                className={`${s.week} ${i % 2 ? s.weekAlt : ""}`}
                style={{ height: `${Math.max(2, (n / peak) * 100)}%` }}
              />
            ))}
          </div>
          <p className={s.weeksCaption}>
            <span>A year ago</span>
            <span>Peak {peak} in a week</span>
            <span>This week</span>
          </p>
        </div>
        <div>
          <h3 className={s.ledgerTitle}>Lately, on GitHub</h3>
          <ul className={s.activity}>
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

function Lineup({
  featured,
  projects,
  github,
}: Pick<HomeData, "featured" | "projects" | "github">) {
  const [headliner, ...rest] = featured;
  if (!headliner) return null;
  const sizes = [s.actL, s.actM, s.actS];
  return (
    <section id="work" className={s.lineup} aria-labelledby="lineup-title">
      <span className={s.lineupFrame} aria-hidden="true" />
      <div className={s.billTop}>
        <span>{github.login} presents</span>
        <span id="lineup-title">Selected work · {featured.length} acts</span>
        <span>Open source · all ages</span>
      </div>
      <div className={s.headliner}>
        <Link href={`/projects/${headliner.slug}`}>
          {headliner.name.toUpperCase()}
        </Link>
        <p className={s.headMeta}>
          Headlining
          {headliner.stars !== null
            ? ` · ${formatNumber(headliner.stars)} ★`
            : ""}
          {headliner.language ? ` · ${headliner.language}` : ""} ·{" "}
          {headliner.category}
        </p>
      </div>
      <ul className={s.stages}>
        {stagesFor(rest).map((stage, i) => (
          <li key={stage.name} className={s.stage}>
            <span className={s.stageName}>
              Stage {String.fromCharCode(65 + i)} · {stage.name}
            </span>
            {stage.projects.map((p, j) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className={`${s.act} ${sizes[Math.min(j, 2)]}`}
              >
                {p.name.toUpperCase()}
              </Link>
            ))}
          </li>
        ))}
      </ul>
      <p className={s.more}>
        <Link href="/projects">
          + {projects.length - featured.length} more acts in the index ·{" "}
          {formatNumber(github.profile.publicRepos)} repos on GitHub
        </Link>
      </p>
    </section>
  );
}

function ProgrammeNotes({ featured }: { featured: Project[] }) {
  return (
    <section className={s.section} aria-labelledby="notes-title">
      <div className={s.sectionHead}>
        <h2
          id="notes-title"
          className={`${s.wide}`}
          style={{ fontSize: "clamp(30px, 3.6vw, 52px)", lineHeight: 1 }}
        >
          Programme notes
        </h2>
        <span className={s.mono}>04 · What each act actually does</span>
      </div>
      <ol className={s.notes}>
        {featured.map((p, i) => (
          <li key={p.slug} className={s.note}>
            <div className={s.noteHead}>
              <span
                className={`${s.noteNum} ${i % 2 ? s.inkB : s.inkA}`}
                aria-hidden="true"
              >
                {pad2(i + 1)}
              </span>
              <Link href={`/projects/${p.slug}`} className={s.noteName}>
                {p.name}
              </Link>
            </div>
            <span className={s.noteMeta}>
              {p.category}
              {p.language ? ` · ${p.language}` : ""}
              {p.stars !== null
                ? ` · ${formatNumber(p.stars)} ★`
                : " · private"}
            </span>
            <p>{p.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Interview({ site }: Pick<HomeData, "site">) {
  const [p0, p1, p2, p3] = site.about.paragraphs;
  const current = site.journey[site.journey.length - 1];
  const qa = [
    { q: "Who is VoxDroid?", a: `${site.about.lead} ${p0}` },
    { q: "What are you like to work with?", a: p1 },
    { q: "Why computers?", a: `${p2} ${p3}` },
    {
      q: "What are you into right now?",
      a: `${current?.detail ?? ""} ${site.about.now}`,
    },
  ];
  return (
    <section id="about" className={s.section} aria-labelledby="about-title">
      <div className={s.interview}>
        <div className={s.quoteCol}>
          <span className={s.quoteDots} aria-hidden="true" />
          <h2
            id="about-title"
            className={s.mono}
            style={{ position: "relative", marginBottom: 12 }}
          >
            05 · Interview · cat README.md
          </h2>
          <blockquote className={s.quote}>
            <p>“{site.about.lead.toUpperCase()}”</p>
          </blockquote>
        </div>
        <div className={s.qa}>
          {qa.map((x) => (
            <div key={x.q}>
              <p className={s.q}>Q. {x.q}</p>
              <p>{x.a}</p>
            </div>
          ))}
        </div>
        <div className={s.liner}>
          <div>
            <h3 className={s.linerTitle}>Genres</h3>
            <ul className={s.linerList}>
              {site.focus.map((f) => (
                <li key={f.title}>
                  <strong>{f.title}.</strong> {f.detail}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={s.linerTitle}>Backline</h3>
            <ul className={s.linerList}>
              {site.stack.map((g) => (
                <li key={g.group}>
                  <strong>{g.group}</strong> {g.items.join(", ")}
                </li>
              ))}
              <li>
                <strong>Also plays</strong>{" "}
                {site.skills.programmingLanguages.join(", ")}
              </li>
            </ul>
          </div>
          <div>
            <h3 className={s.linerTitle}>Systems &amp; hardware</h3>
            <ul className={s.linerList}>
              <li>
                <strong>Operating systems</strong>{" "}
                {site.skills.operatingSystems
                  .map((o) => `${o.name} (${o.level})`)
                  .join(", ")}
              </li>
              <li>
                <strong>Hardware</strong> {site.skills.hardware.join(", ")}
              </li>
              <li>
                <strong>Software</strong> {site.skills.software.join(", ")}
              </li>
              <li>
                <strong>Other</strong> {site.skills.other.join(", ")}
              </li>
            </ul>
          </div>
          <div>
            <h3 className={s.linerTitle}>Schooled at</h3>
            <ul className={s.linerList}>
              {site.education.map((e) => (
                <li key={e.school}>
                  <strong>{e.school}</strong>, {e.degree}
                  {e.detail ? ` (${e.detail})` : ""}, {e.period}.{" "}
                  {e.honors.join(". ")}.
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={s.linerTitle}>Certified</h3>
            <ul className={s.linerList}>
              {site.certifications.map((c) => (
                <li key={c.href}>
                  <a href={c.href}>{c.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={s.linerTitle}>Off stage</h3>
            <ul className={s.linerList}>
              <li>
                <strong>Speaks</strong>{" "}
                {site.spokenLanguages
                  .map((l) => `${l.name} (${l.level})`)
                  .join(", ")}
              </li>
              <li>
                <strong>Into</strong> {site.interests.join(", ")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tour({ site }: Pick<HomeData, "site">) {
  return (
    <section id="journey" className={s.section} aria-labelledby="tour-title">
      <div className={s.sectionHead}>
        <h2 id="tour-title" className={s.h2b}>
          TOUR DATES
        </h2>
        <span className={s.mono}>06 · 2015 to tonight</span>
      </div>
      <ol className={s.tour}>
        {site.journey.map((j, i) => {
          const last = i === site.journey.length - 1;
          return (
            <li key={j.title} className={s.tourRow}>
              <span className={s.tourYear}>
                {j.period.replace(" – Present", " – now").replace(/ – /, "–")}
              </span>
              <div>
                <span className={s.tourFile}>{j.title}</span>
                <code className={s.tourCmd}>$ {j.command}</code>
              </div>
              <p>{j.detail}</p>
              <span
                className={s.stamp}
                aria-hidden="true"
                style={{
                  color: last ? "var(--ink-a)" : "var(--ink-b-type)",
                  transform: `rotate(${STAMP_TILT[i % STAMP_TILT.length]})`,
                }}
              >
                {last ? "TONIGHT" : "PLAYED"}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function SetList({ site }: Pick<HomeData, "site">) {
  return (
    <section
      id="services"
      className={s.setlist}
      aria-labelledby="setlist-title"
    >
      <div className={s.setIntro}>
        <span className={s.mono}>07 · Services, taped to the stage</span>
        <h2
          id="setlist-title"
          className={s.display}
          style={{ fontSize: "clamp(78px, 10vw, 160px)", lineHeight: 0.84 }}
        >
          THE SET LIST
        </h2>
        <p style={{ fontSize: 18, maxWidth: "34ch" }}>
          {site.services.length} things I can play for you, and the same{" "}
          {site.process.length}-song encore every night.
        </p>
        <ol className={s.encore} aria-label="How a project goes">
          {site.process.map((p, i) => (
            <li key={p.title}>
              <strong>
                E{i + 1} {p.title.toUpperCase()}
              </strong>
              {p.detail}
            </li>
          ))}
        </ol>
      </div>
      <div className={s.sheetWrap}>
        <span
          className={s.tape}
          style={{ left: "8%", transform: "rotate(-5deg)" }}
          aria-hidden="true"
        />
        <span
          className={s.tape}
          style={{ right: "9%", transform: "rotate(4deg)" }}
          aria-hidden="true"
        />
        <div className={s.sheet}>
          <div className={s.sheetTop}>
            <span>{site.handle} · set</span>
            <span>{site.services.length} songs · no filler</span>
          </div>
          <ol className={s.songs}>
            {site.services.map((svc, i) => (
              <li key={svc.title} className={s.song}>
                <span className={s.songNum} aria-hidden="true">
                  {pad2(i + 1)}
                </span>
                <h3 className={s.songTitle}>{svc.title}</h3>
                <p className={s.songBody}>
                  {svc.description} {svc.features.join(" · ")}.
                  <span className={s.songTech}>
                    {svc.technologies.join(", ")}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TakeOne({ site }: Pick<HomeData, "site">) {
  const mail = `mailto:${site.email}`;
  const tabs: ({ label: string; href: string } | null)[] = [
    { label: site.email, href: mail },
    { label: site.links[0].handle, href: site.links[0].href },
    null,
    { label: site.email, href: mail },
    { label: site.links[1].handle, href: site.links[1].href },
    { label: site.links[2].handle, href: site.links[2].href },
    null,
    { label: site.email, href: mail },
    { label: "voxdroid · /projects", href: "/projects" },
    { label: site.email, href: mail },
  ];
  return (
    <section id="contact" className={s.takeone} aria-labelledby="contact-title">
      <div className={s.flyer}>
        <div className={s.flyerBody}>
          <span className={s.mono}>08 · $ echo $COLLABORATION_STATUS</span>
          <h2 id="contact-title" className={s.flyerTitle}>
            GOT A PROJECT?
          </h2>
          <p style={{ fontSize: 19, maxWidth: "46ch" }}>
            {site.contact.heading} {site.contact.body}
          </p>
          <p className={s.mono} style={{ fontWeight: 700 }}>
            ▸ {site.availability}. Take a tab ↓
          </p>
        </div>
        <ul className={s.tabs}>
          {tabs.map((t, i) =>
            t ? (
              <li key={i}>
                <a href={t.href}>
                  <span>{t.label}</span>
                </a>
              </li>
            ) : (
              <li key={i} className={s.torn} aria-hidden="true" />
            ),
          )}
        </ul>
      </div>
      <div className={s.fine}>
        <h2 className={s.linerTitle}>The fine print</h2>
        {site.faq.map((f) => (
          <div key={f.q} className={s.fineItem}>
            <h3 className={s.fineQ}>{f.q}</h3>
            <p className={s.fineA}>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Home({ data }: { data: HomeData }) {
  return (
    <>
      <Cover site={data.site} />
      <Numbers github={data.github} site={data.site} />
      <Lineup
        featured={data.featured}
        projects={data.projects}
        github={data.github}
      />
      <ProgrammeNotes featured={data.featured} />
      <Interview site={data.site} />
      <Tour site={data.site} />
      <SetList site={data.site} />
      <TakeOne site={data.site} />
    </>
  );
}
