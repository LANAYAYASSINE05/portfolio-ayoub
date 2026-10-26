import type { ReactNode } from "react";
import { navItems } from "@/data/profile";
import { cn } from "@/lib/cn";

export const chapters = navItems.map((item, i) => ({ ...item, index: String(i + 1).padStart(2, "0") }));

export const chapterOf = (id: (typeof navItems)[number]["id"]) => chapters.find((c) => c.id === id)!;

type PanelProps = {
  id: (typeof navItems)[number]["id"];
  /** Width in the horizontal story (e.g. `story:w-screen`, `story:w-max`). */
  className?: string;
  bodyClassName?: string;
  first?: boolean;
  children: ReactNode;
};

/**
 * One chapter of the story. In the horizontal layout it is a full-height column whose
 * chapter label runs up the left edge; stacked, the label becomes a rule above the content.
 */
export function Panel({ id, className, bodyClassName, first, children }: PanelProps) {
  const { index, label } = chapterOf(id);
  return (
    <section
      id={id}
      data-panel
      aria-label={label}
      className={cn(
        "relative flex scroll-mt-20 flex-col px-gutter pb-20",
        first ? "pt-28" : "border-t-2 border-ink pt-8",
        "story:h-svh story:shrink-0 story:flex-row story:gap-[clamp(1.5rem,3vw,3rem)] story:border-t-0 story:pt-24 story:pb-16 story:pl-[clamp(1rem,2vw,2rem)] story:pr-[clamp(2rem,5vw,5rem)]",
        className,
      )}
    >
      <p className="mb-10 flex items-center gap-4 text-sm font-medium story:mb-0 story:h-full story:rotate-180 story:[writing-mode:vertical-rl]">
        <span className="text-magenta tabular-nums">{index}</span>
        <span>{label}</span>
        <span aria-hidden className="h-0.5 flex-1 bg-ink story:h-auto story:w-0.5" />
      </p>
      <div className={cn("min-w-0 flex-1 story:h-full", bodyClassName)}>{children}</div>
    </section>
  );
}

/** Flush-left, tightly set section title; the last word can take the accent. */
export function Title({ children, accent, className }: { children: ReactNode; accent?: string; className?: string }) {
  return (
    <h2
      data-reveal
      className={cn(
        "font-display text-[clamp(2.75rem,min(6.4vw,12svh),7rem)] leading-[0.88] font-bold tracking-[-0.05em] text-balance",
        className,
      )}
    >
      {children}
      {accent && (
        <>
          {" "}
          <span className="text-magenta">{accent}</span>
        </>
      )}
    </h2>
  );
}

/** Small medium-weight caption, the Swiss replacement for mono labels. */
export function Caption({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm font-medium text-muted", className)}>{children}</p>;
}
