"use client";

import { useRef } from "react";
import { animate, stagger as animeStagger } from "animejs";
import { tools } from "@/data/profile";
import { duration, ease, ms } from "@/lib/tokens";
import { useAnimeInView } from "@/lib/use-anime-in-view";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolIcon, isAdobe } from "@/components/icons/ToolIcon";
import { cn } from "@/lib/cn";

export function Technologies() {
  const gridRef = useRef<HTMLUListElement>(null);

  useAnimeInView(gridRef, (root) => {
    animate(root.querySelectorAll("[data-tile]"), {
      opacity: [0, 1],
      scale: [0.6, 1],
      rotate: { from: () => (Math.random() - 0.5) * 30, to: 0 },
      delay: animeStagger(70),
      duration: ms(duration.slow),
      ease: ease.out.anime,
    });
  });

  const onEnter = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse") return;
    animate(e.currentTarget.querySelector("[data-glyph]")!, {
      rotate: [0, 360],
      scale: [1, 1.15, 1],
      duration: 900,
      ease: "outElastic(1, .6)",
    });
  };

  return (
    <section
      id="technologies"
      data-surface="ink"
      className="relative overflow-hidden border-y-[3px] border-ink bg-yellow py-section text-key neon:border-0 neon:bg-ink neon:text-paper"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 hidden h-[36rem] w-[36rem] rounded-full bg-cyan/10 blur-[140px] neon:block"
      />
      <div className="relative container-x">
        <SectionHeading
          index="02"
          kicker="Outils"
          title="Logiciels & savoir-faire technique."
          description="La suite Adobe pour créer, la chaîne graphique pour livrer : du fichier natif jusqu’à la plaque CTP et l’objet imprimé."
        />

        <ul ref={gridRef} className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-6">
          {tools.map((tool, i) => {
            const adobe = isAdobe(tool.icon);
            return (
              <li
                key={tool.name}
                data-tile
                data-cursor
                onPointerEnter={onEnter}
                style={{ ["--tool-bg" as string]: tool.pop.color, ["--tool-ink" as string]: tool.pop.ink }}
                className={cn(
                  "card hard-lift reveal-init flex flex-col justify-between gap-5 p-4 text-[var(--tool-ink)] [--card-bg:var(--tool-bg)] sm:p-5 md:p-6 neon:text-paper",
                  adobe
                    ? cn("min-h-44 md:min-h-64 lg:col-span-2 lg:min-h-80", i === 0 && "col-span-2 md:col-span-1 lg:col-span-2")
                    : "min-h-36 md:min-h-44",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    data-glyph
                    className={cn(
                      "flex shrink-0 items-center justify-center",
                      adobe
                        ? "h-14 w-14 md:h-20 md:w-20"
                        : "h-11 w-11 rounded-[10px] border-2 border-current md:h-12 md:w-12 neon:border neon:border-paper/20 neon:text-cyan",
                    )}
                  >
                    <ToolIcon name={tool.icon} />
                  </span>
                  <span className="label rounded-full border-2 border-current px-2.5 py-1.5 text-[0.6rem] font-medium neon:border neon:border-paper/15 neon:text-paper/60">
                    {tool.category}
                  </span>
                </div>
                <p
                  className={cn(
                    "font-display leading-tight font-extrabold tracking-tight neon:font-semibold",
                    adobe ? "text-2xl md:text-3xl lg:text-5xl" : "text-lg md:text-xl",
                  )}
                >
                  {tool.name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
