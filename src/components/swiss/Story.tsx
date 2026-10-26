"use client";

import { useRef, useState, type ReactNode } from "react";
import { Grid3x3 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/tokens";
import { chapters } from "./parts";

/** Keep in sync with the `story` variant in globals.css. */
export const STORY_QUERY = "(min-width: 64rem) and (min-height: 37.5rem) and (prefers-reduced-motion: no-preference)";

/**
 * Horizontal story: the chapters sit side by side and vertical scrolling slides them sideways
 * (GSAP ScrollTrigger pin + scrub). Small, short or reduced-motion screens get the same panels stacked.
 */
export function Story({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  const [shown, setShown] = useState(true);
  const [grid, setGrid] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ story: STORY_QUERY, motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
        const { story, motion } = context.conditions as { story: boolean; motion: boolean };
        const el = track.current!;
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);

        if (!story) {
          if (!motion) return;
          reveals.forEach((node) =>
            gsap.from(node, {
              y: 32,
              opacity: 0,
              duration: duration.slow,
              ease: ease.out.gsap,
              scrollTrigger: { trigger: node, start: "top 88%", once: true },
            }),
          );
          return;
        }

        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        let offsets: number[] = [];

        const slide = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          // ScrollTrigger renders the tween while it is being created, before `slide` is assigned.
          onUpdate(this: gsap.core.Tween) {
            const progress = this.progress();
            if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
            const probe = progress * distance() + window.innerWidth * 0.4;
            let index = 0;
            offsets.forEach((left, i) => {
              if (left <= probe) index = i;
            });
            setCurrent(index);
          },
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: () => {
              offsets = panels.map((p) => p.offsetLeft);
            },
            onLeave: () => setShown(false),
            onEnterBack: () => setShown(true),
          },
        });

        reveals.forEach((node) =>
          gsap.from(node, {
            x: 60,
            opacity: 0,
            duration: duration.slow,
            ease: ease.out.gsap,
            scrollTrigger: { trigger: node, containerAnimation: slide, start: "left 92%", once: true },
          }),
        );

        gsap.utils.toArray<HTMLElement>("[data-drift]", el).forEach((node) => {
          const amount = Number(node.dataset.drift) || 10;
          gsap.fromTo(
            node,
            { xPercent: amount },
            {
              xPercent: -amount,
              ease: "none",
              scrollTrigger: {
                trigger: node.closest("[data-panel]") ?? node,
                containerAnimation: slide,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        // Vertical scroll position at which a panel's left edge reaches the viewport's left edge.
        const scrollFor = (panel: HTMLElement) => {
          const st = slide.scrollTrigger!;
          const total = distance();
          return st.start + (total ? Math.min(panel.offsetLeft, total) / total : 0) * (st.end - st.start);
        };

        const go = (panel: HTMLElement, behavior: ScrollBehavior = "smooth") =>
          window.scrollTo({ top: scrollFor(panel), behavior });

        const panelFor = (hash: string) => {
          const id = decodeURIComponent(hash.replace(/^#/, ""));
          return panels.find((p) => p.id === id);
        };

        // In-page anchors would scroll to the pinned (fixed) track: translate them into story positions.
        const onClick = (e: MouseEvent) => {
          if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
          const link = (e.target as Element | null)?.closest?.("a[href*='#']");
          if (!(link instanceof HTMLAnchorElement) || link.pathname !== location.pathname) return;
          const panel = panelFor(link.hash);
          if (!panel) return;
          e.preventDefault();
          history.replaceState(null, "", link.hash);
          go(panel);
        };

        const onKey = (e: KeyboardEvent) => {
          if (e.altKey || e.metaKey || e.ctrlKey) return;
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          const target = e.target as HTMLElement;
          if (target.closest("input, textarea, select, [contenteditable], [role='tablist'], [role='radiogroup']")) return;
          const st = slide.scrollTrigger!;
          if (window.scrollY < st.start - 1 || window.scrollY > st.end + 1) return;
          e.preventDefault();
          const y = window.scrollY;
          const positions = panels.map(scrollFor);
          const next =
            e.key === "ArrowRight"
              ? positions.findIndex((p) => p > y + 2)
              : positions.findLastIndex((p) => p < y - 2);
          if (next !== -1) go(panels[next]);
        };

        document.addEventListener("click", onClick);
        window.addEventListener("keydown", onKey);

        const initial = panelFor(location.hash);
        let frame = 0;
        if (initial) frame = requestAnimationFrame(() => go(initial, "instant"));

        return () => {
          cancelAnimationFrame(frame);
          document.removeEventListener("click", onClick);
          window.removeEventListener("keydown", onKey);
          setShown(true);
        };
      });
    },
    { scope: root },
  );

  const chapter = chapters[current];

  return (
    <>
      <div ref={root} className="story:h-svh story:overflow-hidden">
        <main ref={track} className="relative flex flex-col story:h-svh story:w-max story:flex-row">
          {children}
        </main>
      </div>

      <nav
        aria-label="Chapitres"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 hidden h-12 items-center gap-6 border-t-2 border-ink bg-paper px-gutter text-sm font-medium transition-transform duration-500 ease-out-expo story:flex",
          !shown && "translate-y-full",
        )}
      >
        <p className="flex w-44 shrink-0 items-baseline gap-3" aria-live="polite">
          <span className="text-magenta tabular-nums">
            {chapter.index}/{String(chapters.length).padStart(2, "0")}
          </span>
          <span className="truncate">{chapter.label}</span>
        </p>
        <span aria-hidden className="relative h-0.5 flex-1 bg-line">
          <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-magenta" />
        </span>
        <ol className="flex">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-label={c.label}
                aria-current={i === current ? "step" : undefined}
                className={cn(
                  "flex h-12 w-9 items-center justify-center tabular-nums transition-colors",
                  i === current ? "bg-magenta text-paper" : "text-muted hover:text-ink",
                )}
              >
                {c.index}
              </a>
            </li>
          ))}
        </ol>
        <button
          type="button"
          aria-pressed={grid}
          onClick={() => setGrid((v) => !v)}
          className={cn(
            "-mr-gutter flex h-12 items-center gap-2 border-l-2 border-ink px-gutter transition-colors",
            grid ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper",
          )}
        >
          <Grid3x3 aria-hidden className="h-4 w-4" />
          Grille
        </button>
      </nav>

      {grid && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden px-gutter story:block">
          <div className="grid h-full grid-cols-12 gap-6">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="border-x border-magenta/30 bg-magenta/[0.06]" />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
