"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { duration, ease, stagger } from "@/lib/tokens";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  description?: string;
  inverse?: boolean;
  className?: string;
};

/** Numbered editorial heading. Words rise from masked lines on scroll (GSAP). */
export function SectionHeading({ index, kicker, title, description, inverse, className }: SectionHeadingProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
          defaults: { ease: ease.out.gsap },
        });
        tl.fromTo("[data-rule]", { scaleX: 0 }, { scaleX: 1, duration: duration.slow })
          .fromTo("[data-meta]", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: duration.base, stagger: 0.08 }, 0.1)
          .fromTo(
            "[data-word]",
            { yPercent: 110, rotate: 4 },
            { yPercent: 0, rotate: 0, duration: duration.slow, stagger: stagger.base },
            0.15,
          );
        if (description) {
          tl.fromTo("[data-desc]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: duration.base }, 0.45);
        }
      });
    },
    { scope: root, dependencies: [description] },
  );

  return (
    <div ref={root} className={cn("mb-14 md:mb-20", className)}>
      <div className="mb-8 flex items-center gap-3 prepress:gap-4">
        <span
          data-meta
          className={cn(
            "label rounded-full px-3.5 py-2 font-medium prepress:bg-transparent prepress:px-0 prepress:font-normal swiss:rounded-none swiss:bg-magenta swiss:text-paper neon:bg-transparent neon:px-0 neon:text-cyan",
            inverse ? "bg-paper text-ink prepress:text-paper/60" : "bg-ink text-paper prepress:text-muted",
          )}
        >
          <span className="hidden prepress:inline">({index})</span>
          <span className="prepress:hidden neon:hidden">N°{index}</span>
          <span className="hidden neon:inline">{`// ${index}`}</span>
        </span>
        <span
          data-rule
          className={cn(
            "h-[3px] flex-1 origin-left rounded-full prepress:h-px prepress:rounded-none swiss:h-0.5 swiss:rounded-none neon:h-px neon:bg-gradient-to-r neon:from-magenta neon:via-cyan/60 neon:to-transparent",
            inverse ? "bg-paper prepress:bg-line-inverse" : "bg-ink prepress:bg-line",
          )}
        />
        <span
          data-meta
          className={cn(
            "label rounded-full border-2 px-3.5 py-2 font-medium prepress:border-0 prepress:bg-transparent prepress:px-0 prepress:font-normal swiss:border-0 swiss:px-0 swiss:font-normal neon:border-0 neon:px-0",
            inverse
              ? "border-paper text-paper prepress:text-paper/60 neon:text-paper/60"
              : "border-ink bg-paper text-ink prepress:text-muted swiss:bg-transparent neon:bg-transparent neon:text-muted",
          )}
        >
          {kicker}
        </span>
      </div>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <h2 className="font-display text-h2 font-extrabold prepress:font-bold swiss:font-bold swiss:tracking-[-0.045em] neon:font-bold md:col-span-7">
          {title.split(" ").map((word, i, words) => (
            <span key={i} className="mask-line inline-block pr-[0.22em] align-bottom">
              <span
                data-word
                className={cn(
                  "inline-block will-change-transform",
                  i === words.length - 1 &&
                    words.length > 1 &&
                    "rounded-[0.18em] bg-yellow px-[0.12em] text-key swiss:rounded-none swiss:bg-transparent swiss:px-0 swiss:text-magenta prepress:bg-transparent prepress:px-0 prepress:text-inherit neon:bg-transparent neon:px-0 neon:neon-gradient-text",
                )}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>
        {description && (
          <p
            data-desc
            className={cn("text-lead md:col-span-5 md:pb-2", inverse ? "text-paper/70" : "text-ink-soft")}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
