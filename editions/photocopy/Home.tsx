import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { artPaths, type HomeData, type Project } from "@/lib/content";
import {
  certificationMeta,
  formatDate,
  formatNumber,
  yearOf,
} from "@/lib/format";
import { seedOf, tilt, tornEdge } from "@/lib/paste-up";
import s from "./photocopy.module.css";

/** Ransom-note letters: each cut from a different page. */
const RANSOM: {
  font: string;
  size: string;
  look: "black" | "white" | "hi" | "grey" | "red";
  rot: string;
  dy: number;
  pad: string;
}[] = [
  {
    font: "var(--fat)",
    size: "clamp(44px, 7.2vw, 116px)",
    look: "black",
    rot: "-4deg",
    dy: 4,
    pad: "4px 12px",
  },
  {
    font: "var(--bungee)",
    size: "clamp(40px, 6.6vw, 104px)",
    look: "white",
    rot: "3deg",
    dy: -6,
    pad: "6px 10px",
  },
  {
    font: "var(--anton)",
    size: "clamp(48px, 7.8vw, 124px)",
    look: "hi",
    rot: "-2deg",
    dy: 8,
    pad: "2px 12px",
  },
  {
    font: "var(--rubik)",
    size: "clamp(36px, 6vw, 96px)",
    look: "black",
    rot: "5deg",
    dy: -2,
    pad: "8px 10px",
  },
  {
    font: "var(--serif)",
    size: "clamp(46px, 7.4vw, 118px)",
    look: "grey",
    rot: "-6deg",
    dy: 6,
    pad: "2px 12px",
  },
  {
    font: "var(--block)",
    size: "clamp(40px, 6.6vw, 104px)",
    look: "white",
    rot: "2deg",
    dy: -8,
    pad: "6px 10px",
  },
  {
    font: "var(--typewriter)",
    size: "clamp(44px, 7vw, 112px)",
    look: "red",
    rot: "-3deg",
    dy: 2,
    pad: "4px 12px",
  },
  {
    font: "var(--fat)",
    size: "clamp(44px, 7.2vw, 116px)",
    look: "black",
    rot: "4deg",
    dy: -4,
    pad: "4px 12px",
  },
];
const LOOKS: Record<(typeof RANSOM)[number]["look"], CSSProperties> = {
  black: { background: "var(--toner)", color: "var(--paper)" },
  white: {
    background: "var(--slip)",
    color: "var(--toner)",
    border: "2px solid var(--toner)",
  },
  hi: { background: "var(--hi)", color: "var(--toner)" },
  grey: { background: "#d9d6ce", color: "var(--toner)" },
  red: { background: "var(--slip)", color: "var(--red)" },
};

function Tick() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 3 L19 2 L20 19 L2 20 Z"
        fill="none"
        stroke="var(--toner)"
        strokeWidth="1.8"
      />
      <path
        d="M5 11 L9 16 L20 1"
        fill="none"
        stroke="var(--red)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Cover({ site }: Pick<HomeData, "site">) {
  const portrait = artPaths(null).xerox;
  return (
    <section className={s.cover} aria-labelledby="cover-title">
      <div className={s.coverMain}>
        <h1 id="cover-title" className={s.ransom} aria-label={site.handle}>
          {site.handle
            .toUpperCase()
            .split("")
            .map((ch, i) => {
              const r = RANSOM[i % RANSOM.length]!;
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{
                    fontFamily: r.font,
                    fontSize: r.size,
                    padding: r.pad,
                    transform: `rotate(${r.rot}) translateY(${r.dy}px)`,
                    ...LOOKS[r.look],
                  }}
                >
                  {ch}
                </span>
              );
            })}
        </h1>
        <p className={s.tagline}>
          <span className={s.hl}>{site.tagline.toLowerCase()}</span>
        </p>
        <div
          className={s.slip}
          style={{ transform: `rotate(${tilt(3, 1.2)})` }}
        >
          <span
            className={s.tape}
            style={{ left: "40%", top: -12, transform: "rotate(3deg)" }}
            aria-hidden="true"
          />
          <p style={{ fontSize: 18 }}>{site.intro}</p>
        </div>
        <nav aria-label="In this issue">
          <p
            className={s.markerNote}
            style={{ transform: "rotate(-2deg)", marginBottom: 4 }}
          >
            inside this issue:
          </p>
          <ul className={s.toc}>
            {[
              ["#work", "the work (clippings)", "p.3"],
              ["#github", "github, by the numbers", "p.2"],
              ["#about", "a letter (about me)", "p.5"],
              ["#services", "things i can do for you", "p.7"],
              ["#contact", "cut-out coupon (contact)", "p.8"],
            ].map(([href, label, page]) => (
              <li key={href}>
                <a href={href}>
                  <span>{label}</span>
                  <span aria-hidden="true" />
                  <span>{page}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <figure
        className={s.portrait}
        style={{ transform: `rotate(${tilt(8, 2.5)})` }}
      >
        <span
          className={s.tape}
          style={{
            left: -16,
            top: 26,
            width: 110,
            height: 28,
            transform: "rotate(-38deg)",
          }}
          aria-hidden="true"
        />
        <span
          className={s.tape}
          style={{
            right: -14,
            top: 22,
            width: 110,
            height: 28,
            transform: "rotate(36deg)",
          }}
          aria-hidden="true"
        />
        <Image
          src={portrait}
          alt={`${site.handle}'s avatar, photocopied in black toner`}
          width={900}
          height={900}
          priority
          sizes="(max-width: 900px) 100vw, 560px"
          style={{ clipPath: tornEdge(21, 2.2) }}
        />
        <figcaption
          className={`${s.markerNote} ${s.portraitNote}`}
          style={{ transform: "rotate(-4deg)" }}
        >
          <svg
            width="70"
            height="44"
            viewBox="0 0 70 44"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M66 6 C 48 2, 26 8, 10 30 M10 30 l2 -14 M10 30 l13 -4"
              fill="none"
              stroke="var(--red)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          me, eating bread (fig. 1)
        </figcaption>
      </figure>
    </section>
  );
}

const SCRIBBLES = [
  "M30 80 C 26 30, 200 18, 214 66 C 228 118, 60 136, 34 96 C 24 80, 60 40, 120 34",
  "M58 22 L 186 18 L 190 120 L 52 124 Z M54 30 L 60 118",
  "M24 116 C 90 108, 160 114, 220 106 M30 128 C 100 122, 150 130, 214 120",
  "M40 30 l6 14 l15 2 l-11 10 l3 15 l-13 -8 l-13 8 l3 -15 l-11 -10 l15 -2 Z M200 24 l5 11 l12 2 l-9 8 l2 12 l-10 -6 l-10 6 l2 -12 l-9 -8 l12 -2 Z",
];

function Numbers({ github }: Pick<HomeData, "github">) {
  const c = github.contributions;
  const peak = Math.max(1, ...c.weeks);
  const counts = [
    [formatNumber(github.profile.stars), "STARS, across public repos"],
    [formatNumber(github.profile.publicRepos), "PUBLIC REPOSITORIES"],
    [formatNumber(c.lastYear), "CONTRIBUTIONS, last 12 months"],
    ["6+", "YEARS OF CODE (since 2015)"],
  ] as const;
  const facts: [string, string][] = [
    ["followers", formatNumber(github.profile.followers)],
    ["forks", formatNumber(github.profile.forks)],
    ["all-time contributions", formatNumber(c.total)],
    ["current streak", `${formatNumber(c.current)} days`],
    ["longest streak", `${formatNumber(c.longest)} days`],
    ["on github since", String(yearOf(github.profile.createdAt))],
  ];
  return (
    <section id="github" className={s.section} aria-labelledby="numbers-title">
      <div className={s.sectionHead}>
        <h2 id="numbers-title" className={s.blackLabel}>
          THE NUMBERS
        </h2>
        <span className={s.markerNote}>(yes we counted)</span>
      </div>
      <ul className={s.counted}>
        {counts.map(([value, label], i) => (
          <li key={label} className={s.count}>
            <svg
              viewBox="0 0 240 150"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d={SCRIBBLES[i]}
                fill="none"
                stroke="var(--red)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={s.countLabel}>{label}</span>
            <span className={s.countValue}>{value}</span>
          </li>
        ))}
      </ul>
      <div className={s.brief}>
        <div className={s.briefCol}>
          <h3 className={s.label}>THE SMALL PRINT</h3>
          <dl className={s.factGrid}>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={s.briefCol}>
          <h3 className={s.label}>WHAT IT&apos;S WRITTEN IN</h3>
          {github.languages.slice(0, 6).map((l) => (
            <div key={l.name} className={s.tallyRow}>
              <span>{l.name}</span>
              <span aria-hidden="true">
                <span
                  className={s.hatch}
                  style={{
                    display: "block",
                    width: `${Math.max(l.share, 2)}%`,
                  }}
                />
              </span>
              <span className={s.typed}>{l.share}%</span>
            </div>
          ))}
          <h3 className={s.label} style={{ marginTop: 22 }}>
            A YEAR OF WEEKS
          </h3>
          <div
            className={s.weeks}
            role="img"
            aria-label={`Weekly contributions over the last year, peaking at ${peak} in one week.`}
            style={{ marginTop: 12 }}
          >
            {c.weeks.map((n, i) => (
              <span
                key={i}
                style={{ height: `${Math.max(2, (n / peak) * 100)}%` }}
              />
            ))}
          </div>
          <p className={s.typed} style={{ marginTop: 6 }}>
            ← a year ago · peak {peak} in a week · this week →
          </p>
        </div>
        <div className={s.briefCol}>
          <h3 className={s.label}>NEWS IN BRIEF</h3>
          <ul className={s.typedList}>
            {github.activity.map((a, i) => (
              <li key={`${a.date}-${i}`}>
                <time dateTime={a.date}>
                  {formatDate(a.date + "T00:00:00Z")}
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

function Clip({ p, note }: { p: Project; note?: string }) {
  const seed = seedOf(p.slug);
  return (
    <article
      className={s.clip}
      style={{
        transform: `rotate(${tilt(seed, 2.2)})`,
        clipPath: tornEdge(seed, 1.6),
      }}
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
          <h3 className={s.clipName}>
            <Link href={`/projects/${p.slug}`} className={s.clipStretch}>
              <span
                className={
                  p.featured !== null && p.featured % 3 === 1 ? s.hl : undefined
                }
              >
                {p.name}
              </span>
            </Link>
          </h3>
          <p className={s.clipMeta}>
            {p.category}
            {p.language ? ` · ${p.language}` : ""}
            {p.stars !== null ? ` · ${formatNumber(p.stars)} ★` : " · private"}
          </p>
        </div>
      </div>
      <p className={s.clipBody}>{p.summary}</p>
      <span className={s.clipLink} aria-hidden="true">
        read the clipping →
      </span>
      {note ? (
        <p
          className={s.markerNote}
          style={{ transform: "rotate(-3deg)", marginTop: 4 }}
        >
          {note}
        </p>
      ) : null}
    </article>
  );
}

function Clippings({
  featured,
  projects,
}: Pick<HomeData, "featured" | "projects">) {
  const [first, second] = [...featured]
    .filter((p) => p.stars !== null)
    .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
  const notes: Record<string, string> = {};
  if (first?.stars)
    notes[first.slug] = `${formatNumber(first.stars)} stars!! the big one`;
  if (second?.stars)
    notes[second.slug] = `runner-up: ${formatNumber(second.stars)} stars`;
  return (
    <section id="work" className={s.section} aria-labelledby="work-title">
      <div className={s.sectionHead}>
        <h2
          id="work-title"
          className={s.fatTitle}
          style={{ transform: "rotate(-1.5deg)" }}
        >
          The Work,
        </h2>
        <span className={s.bungeeTag}>IN {featured.length} CLIPPINGS</span>
        <Link
          href="/projects"
          className={s.markerNote}
          style={{ marginLeft: "auto", padding: "8px 0" }}
        >
          + {projects.length - featured.length} more in the archive →
        </Link>
      </div>
      <ul className={s.clips}>
        {featured.map((p) => (
          <li key={p.slug} style={{ breakInside: "avoid" }}>
            <Clip p={p} note={notes[p.slug]} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Letter({ site }: Pick<HomeData, "site">) {
  const [p0, p1, p2, p3] = site.about.paragraphs;
  return (
    <section id="about" className={s.section} aria-labelledby="letter-title">
      <div className={s.letterRow}>
        <div
          className={s.letter}
          style={{ transform: `rotate(${tilt(31, 0.8)})` }}
        >
          <div className={s.letterInner}>
            <div className={`${s.typed} ${s.letterMeta}`}>
              <span>FROM: {site.handle}, 127.0.0.2</span>
              <h2 id="letter-title" style={{ font: "inherit" }}>
                RE: who is {site.handle}?
              </h2>
            </div>
            <p>Dear reader,</p>
            <p>
              <span className={s.hl}>{site.about.lead}</span> {p0}
            </p>
            <p>{p1}</p>
            <p>{p2}</p>
            <p>{p3}</p>
            <p>Yours, {site.availability.toLowerCase()},</p>
            <p className={s.signature}>{site.handle}</p>
          </div>
        </div>
        <aside className={s.aside} aria-label="More about me">
          <div>
            <h3 className={s.label}>STUFF I&apos;M INTO</h3>
            <ul className={s.ticks}>
              {site.focus.map((f) => (
                <li key={f.title}>
                  <Tick />
                  <span>
                    <strong>{f.title}.</strong> {f.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={s.label} style={{ transform: "rotate(1deg)" }}>
              THE KIT
            </h3>
            <dl className={s.kit}>
              {site.stack.map((g) => (
                <div key={g.group}>
                  <dt>{g.group.toUpperCase()}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
              <div>
                <dt>ALSO</dt>
                <dd>{site.skills.programmingLanguages.join(", ")}</dd>
              </div>
              <div>
                <dt>OS</dt>
                <dd>
                  {site.skills.operatingSystems
                    .map((o) => `${o.name} (${o.level.toLowerCase()})`)
                    .join(", ")}
                </dd>
              </div>
              <div>
                <dt>HARDWARE</dt>
                <dd>{site.skills.hardware.join(", ")}</dd>
              </div>
              <div>
                <dt>TOOLS</dt>
                <dd>
                  {[...site.skills.software, ...site.skills.other].join(", ")}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className={s.label} style={{ transform: "rotate(-1deg)" }}>
              SCHOOL + CERTS
            </h3>
            <ul className={s.ticks} style={{ fontSize: 15 }}>
              {site.education.map((e) => (
                <li key={e.school}>
                  <span>
                    <strong>{e.school}</strong>, {e.degree}
                    {e.detail ? ` (${e.detail})` : ""}, {e.period}.{" "}
                    <span className={s.hl}>{e.honors.join(", ")}</span>
                  </span>
                </li>
              ))}
            </ul>
            <ul className={s.ticks} style={{ fontSize: 15 }}>
              {site.certifications.map((c) => (
                <li key={c.id}>
                  <span>
                    <strong>
                      {c.href ? <a href={c.href}>{c.name}</a> : c.name}
                    </strong>
                    <span className={s.typed} style={{ display: "block" }}>
                      {certificationMeta(c)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={s.label}>OFF THE PAGE</h3>
            <p style={{ marginTop: 12 }}>
              Speaks{" "}
              {site.spokenLanguages
                .map((l) => `${l.name} (${l.level.toLowerCase()})`)
                .join(" and ")}
              . Into {site.interests.join(", ").toLowerCase()}.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Timeline({ site }: Pick<HomeData, "site">) {
  return (
    <section
      id="journey"
      className={s.section}
      aria-labelledby="timeline-title"
    >
      <h2
        id="timeline-title"
        className={s.fatTitle}
        style={{ fontFamily: "var(--serif)", marginBottom: 8 }}
      >
        How I got here
      </h2>
      <div
        className={s.timeline}
        tabIndex={0}
        role="region"
        aria-label="Timeline, scrolls sideways on small screens"
      >
        <div className={s.timelineInner}>
          <svg
            className={s.timelineLine}
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M10 34 C 120 20, 200 44, 300 30 S 480 18, 560 34 S 760 44, 840 26 S 950 30, 990 22 l -16 -10 M990 22 l -14 12"
              fill="none"
              stroke="var(--toner)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <ol className={s.stops}>
            {site.journey.map((j, i) => (
              <li key={j.title} className={s.stop}>
                <span className={s.dot} aria-hidden="true" />
                <span
                  className={s.stopYear}
                  style={{ transform: `rotate(${tilt(40 + i, 4)})` }}
                >
                  {j.period.replace(" – Present", "–now").replace(" – ", "–")}
                </span>
                <span className={s.typed}>
                  <span className={s.hl}>{j.title}</span>
                </span>
                <span style={{ fontSize: 15.5 }}>{j.detail}</span>
                <code className={s.stopCmd}>$ {j.command}</code>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const CHECKS = [
  "M8 18 L15 26 L31 6",
  "M7 17 L14 27 L30 4",
  "M9 19 L15 25 L32 7",
  "M8 16 L14 26 L29 5",
];

function Checklist({ site }: Pick<HomeData, "site">) {
  return (
    <section
      id="services"
      className={s.section}
      aria-labelledby="services-title"
    >
      <div className={s.sectionHead}>
        <h2
          id="services-title"
          style={{
            fontFamily: "var(--bungee)",
            fontSize: "clamp(28px, 3.6vw, 52px)",
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          THINGS I CAN DO FOR YOU
        </h2>
        <span className={s.typed}>(check all that apply)</span>
      </div>
      <ul className={s.checklist}>
        {site.services.map((svc, i) => (
          <li key={svc.title} className={s.check}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M4 5 L31 3 L33 32 L3 33 Z"
                fill="none"
                stroke="var(--toner)"
                strokeWidth="2.2"
              />
              <path
                d={CHECKS[i % CHECKS.length]}
                fill="none"
                stroke="var(--red)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h3 className={s.checkTitle}>{svc.title}</h3>
              <p style={{ fontSize: 15.5 }}>
                {svc.description} {svc.features.join("; ")}.
              </p>
              <p className={s.checkTech}>{svc.technologies.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={s.process}>
        <span id="process-label">how it goes:</span>
        <ol className={s.processList} aria-labelledby="process-label">
          {site.process.map((p) => (
            <li key={p.title}>
              {p.title.toLowerCase()}
              <span className="visually-hidden">: {p.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Coupon({ site }: Pick<HomeData, "site">) {
  return (
    <section id="contact" className={s.section} aria-labelledby="coupon-title">
      <div className={s.couponRow}>
        <div className={s.coupon}>
          <span className={s.cut} aria-hidden="true">
            ✂ - - - cut here
          </span>
          <h2
            id="coupon-title"
            className={s.fatTitle}
            style={{ fontSize: "clamp(40px, 5vw, 70px)", marginBottom: 6 }}
          >
            YES! Let&apos;s build something.
          </h2>
          <p style={{ marginBottom: 22 }}>
            {site.contact.heading} {site.contact.body}
          </p>
          {/* A plain mailto form: the visitor's own mail app sends it, so there is no server to fail. */}
          <form action={`mailto:${site.email}`} method="get">
            <div className={s.fields}>
              <label className={s.field}>
                THE PROJECT, IN A SENTENCE
                <input
                  className={s.input}
                  type="text"
                  name="subject"
                  required
                  maxLength={140}
                />
              </label>
              <label className={`${s.field} ${s.fieldWide}`}>
                TELL ME MORE
                <textarea className={s.textarea} name="body" rows={3} />
              </label>
            </div>
            <p
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px 24px",
                alignItems: "center",
                marginTop: 26,
              }}
            >
              <button type="submit" className={s.stamp}>
                MAIL IT IN
              </button>
              <span style={{ fontSize: 15 }}>
                or write to <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </p>
          </form>
          <ul className={s.couponFoot}>
            {site.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.handle}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.letters}>
          <h2 className={s.lettersTitle}>Letters to the editor</h2>
          {site.faq.map((f) => (
            <div key={f.q} className={s.letterItem}>
              <h3
                className={s.letterQ}
                style={{ fontSize: "inherit", fontWeight: 400 }}
              >
                “{f.q}” <span className={s.typed}>— a reader</span>
              </h3>
              <p>
                <strong>Ed:</strong> {f.a}
              </p>
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
      <Numbers github={data.github} />
      <Clippings featured={data.featured} projects={data.projects} />
      <Letter site={data.site} />
      <Timeline site={data.site} />
      <Checklist site={data.site} />
      <Coupon site={data.site} />
    </>
  );
}
