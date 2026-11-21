"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { setEdition } from "@/app/actions";
import { EDITIONS, EDITION_INFO, type Edition } from "@/lib/editions";

type Waiting = { target: Edition; resolve: () => void };

/**
 * Waits for the new edition's fonts. Rendering is paused inside a View Transition, so this cannot
 * wait for a frame: it forces a style pass (which starts the font loads) and waits at most 2.5 s.
 */
function afterFonts(): Promise<void> {
  void document.body.offsetHeight;
  return Promise.race([
    document.fonts.ready.then(
      () => undefined,
      () => undefined,
    ),
    new Promise<void>((resolve) => window.setTimeout(resolve, 2500)),
  ]);
}

/**
 * The "press selector": prints the page in another edition. It is a plain form that posts to a
 * Server Function, so it works before hydration or without JavaScript; with JavaScript the switch
 * runs inside a View Transition that each edition styles in globals.css.
 */
export function EditionSwitcher({ current }: { current: Edition }) {
  const [pendingEdition, setPendingEdition] = useState<Edition | null>(null);
  const [, startTransition] = useTransition();
  const waiting = useRef<Waiting | null>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const w = waiting.current;
    if (!w || w.target !== current) return;
    waiting.current = null;
    afterFonts().then(() => {
      w.resolve();
      setPendingEdition(null);
      setAnnouncement(
        `Now showing the ${EDITION_INFO[current].label} edition.`,
      );
    });
  }, [current]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    const target = EDITIONS.find((e) => e === submitter?.value);
    if (!target || target === current || pendingEdition) return;

    const data = new FormData();
    data.set("edition", target);
    setPendingEdition(target);

    const apply = () =>
      new Promise<void>((resolve) => {
        const done = () => {
          if (waiting.current?.resolve === done) waiting.current = null;
          resolve();
        };
        waiting.current = { target, resolve: done };
        startTransition(async () => {
          await setEdition(data);
        });
        // Never hold the page frozen if the server is slow.
        window.setTimeout(() => {
          done();
          setPendingEdition(null);
        }, 4000);
      });

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!document.startViewTransition || reduce) {
      void apply();
      return;
    }
    const root = document.documentElement;
    root.dataset.switching = target;
    const transition = document.startViewTransition(apply);
    // A skipped or timed-out transition still switches the edition; it just does not animate.
    transition.ready.catch(() => undefined);
    transition.finished
      .catch(() => undefined)
      .finally(() => {
        delete root.dataset.switching;
      });
  }

  return (
    <div className="switcher">
      <form action={setEdition} onSubmit={onSubmit}>
        <fieldset>
          <legend>Edition</legend>
          <div className="switcher-options">
            {EDITIONS.map((edition) => {
              const info = EDITION_INFO[edition];
              return (
                <button
                  key={edition}
                  type="submit"
                  name="edition"
                  value={edition}
                  aria-pressed={edition === current}
                  aria-busy={pendingEdition === edition}
                  title={`${info.label}: ${info.process}`}
                >
                  <span className="switcher-swatch" aria-hidden="true">
                    <span style={{ background: info.swatches[0] }} />
                    <span style={{ background: info.swatches[1] }} />
                  </span>
                  {info.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </form>
      <p className="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
