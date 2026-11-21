import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import s from "./photocopy.module.css";

export const NAV = [
  { href: "/#work", label: "the work" },
  { href: "/#github", label: "numbers" },
  { href: "/#about", label: "about" },
  { href: "/#services", label: "services" },
  { href: "/#contact", label: "contact" },
  { href: "/projects", label: "archive" },
  { href: "/cv", label: "cv" },
];

/** Toner specks, two drum streaks and a darkened copier edge. */
function CopierNoise() {
  return (
    <>
      <svg
        className={s.noise}
        aria-hidden="true"
        focusable="false"
        data-print-hide
      >
        <filter id="pc-speck">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".9"
            numOctaves="1"
            seed="4"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR
              type="discrete"
              tableValues="0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
            />
            <feFuncG
              type="discrete"
              tableValues="0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
            />
            <feFuncB
              type="discrete"
              tableValues="0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
            />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#pc-speck)" opacity=".5" />
      </svg>
      <span
        className={s.streak}
        style={{ left: "18%" }}
        aria-hidden="true"
        data-print-hide
      />
      <span
        className={s.streak}
        style={{ right: "7%", width: 1, opacity: 0.12 }}
        aria-hidden="true"
        data-print-hide
      />
      <span className={s.edge} aria-hidden="true" data-print-hide />
    </>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className={s.page}>
      <CopierNoise />
      <div className={s.inner}>
        <header className={s.masthead} data-print-hide>
          <span
            className={s.staple}
            style={{ left: 34, transform: "rotate(-4deg)" }}
            aria-hidden="true"
          />
          <span
            className={s.staple}
            style={{ right: 34, transform: "rotate(3deg)" }}
            aria-hidden="true"
          />
          <div className={s.mastRow}>
            <Link href="/" className={s.mastHome}>
              {site.handle.toUpperCase()} ZINE
            </Link>
            <span className={s.typed}>
              ISSUE #03 · FREE. PLEASE COPY &amp; PASS IT ON.
            </span>
            <nav aria-label="Main">
              <ul className={s.nav}>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className={s.footer} data-print-hide>
          <span className={s.typed}>
            © {new Date().getUTCFullYear()} {site.handle} · photocopy this and
            pass it on.
          </span>
          <span className={s.folio} aria-hidden="true">
            — end —
          </span>
          <span className={s.typed}>Toner, tape and highlighter</span>
        </footer>
      </div>
    </div>
  );
}
