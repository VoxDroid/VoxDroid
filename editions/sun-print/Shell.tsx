import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import s from "./sun-print.module.css";

const PLATES = [
  { href: "/#work", n: "II", label: "The Work" },
  { href: "/#about", n: "III", label: "Field Notes" },
  { href: "/#services", n: "IV", label: "Practices" },
  { href: "/#contact", n: "V", label: "Correspondence" },
  { href: "/projects", n: "", label: "Index" },
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className={s.page}>
      <svg className={s.fibre} aria-hidden="true" focusable="false">
        <filter id="sp-fibre">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".012 .5"
            numOctaves="3"
            seed="9"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 .55  0 0 0 0 .5  0 0 0 0 .42  0 0 0 -1.4 1.2"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#sp-fibre)" />
      </svg>
      <div className={s.wrap}>
        <header className={s.header}>
          <Link href="/" className={s.home}>
            {site.handle} · a sun-printed portfolio
          </Link>
          <nav aria-label="Plates">
            <ul className={s.plates}>
              {PLATES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>
                    {p.n ? <em>{p.n}</em> : null}
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className={s.footer}>
          <span>
            Printed by sunlight on cotton rag, washed in water. Set in
            Instrument Serif, Instrument Sans &amp; Courier Prime.
          </span>
          <span>
            © {new Date().getUTCFullYear()} {site.handle}
          </span>
        </footer>
      </div>
    </div>
  );
}
