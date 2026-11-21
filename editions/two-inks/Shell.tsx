import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import s from "./two-inks.module.css";

export const CONTENTS = [
  { href: "/#github", label: "02 Numbers" },
  { href: "/#work", label: "03 Work" },
  { href: "/#about", label: "05 About" },
  { href: "/#journey", label: "06 Tour" },
  { href: "/#services", label: "07 Services" },
  { href: "/#contact", label: "08 Contact" },
  { href: "/projects", label: "Index" },
];

export function Grain() {
  return (
    <svg className={s.grain} aria-hidden="true" focusable="false">
      <filter id="ti-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 .55  0 0 0 0 .5  0 0 0 0 .42  0 0 0 -1.1 1.05"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#ti-grain)" />
    </svg>
  );
}

function CropMark({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className={`${s.crop} ${side === "left" ? s.cropLeft : s.cropRight}`}
      viewBox="0 0 26 26"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={side === "left" ? "M0 18h12M18 0v12" : "M14 18h12M8 0v12"}
        stroke="currentColor"
        fill="none"
      />
    </svg>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className={s.page}>
      <Grain />
      <header className={s.header}>
        <CropMark side="left" />
        <CropMark side="right" />
        <div className={s.slug}>
          <Link href="/" className={s.home}>
            {site.handle.toUpperCase()}
          </Link>
          <span className={s.mono}>
            Issue 02 · Inks:
            <span
              className={s.inkChip}
              style={{ background: "var(--ink-a)" }}
            />
            +
            <span
              className={s.inkChip}
              style={{ background: "var(--ink-b)" }}
            />
            · Natural 90gsm
          </span>
          <nav aria-label="Contents">
            <ul className={s.contents}>
              {CONTENTS.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className={s.footer}>
        <div
          className={s.strip}
          role="img"
          aria-label="Colour control strip: indigo, coral and their overprint"
        >
          {[1, 0.7, 0.45, 0.2].map((o) => (
            <span
              key={`a${o}`}
              style={{ background: "var(--ink-a)", opacity: o }}
            />
          ))}
          {[1, 0.7, 0.45, 0.2].map((o, i) => (
            <span
              key={`b${o}`}
              style={{
                background: "var(--ink-b)",
                opacity: o,
                marginLeft: i === 0 ? 8 : 0,
              }}
            />
          ))}
          <span style={{ background: "var(--overprint)", marginLeft: 8 }} />
        </div>
        <p className={s.colophon}>
          Colophon: set in Anton, Archivo and JetBrains Mono. Printed in two
          inks on natural stock; where they cross, they overprint. ©{" "}
          {new Date().getUTCFullYear()} {site.handle}.
        </p>
      </footer>
    </div>
  );
}
