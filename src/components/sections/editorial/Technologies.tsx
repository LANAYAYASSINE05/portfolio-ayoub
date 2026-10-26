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
      delay: animeStagger(70, { grid: [3, 3], from: "center" }),
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
    <section id="technologies" data-surface="ink" className="relative overflow-hidden bg-ink py-section text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 hidden h-[36rem] w-[36rem] rounded-full bg-cyan/10 blur-[140px]"
      />
      <div className="relative container-x">
        <SectionHeading
          inverse
          index="02"
          kicker="Outils"
          title="Logiciels & savoir-faire technique."
          description="La suite Adobe pour créer, la chaîne graphique pour livrer : du fichier natif jusqu’à la plaque CTP et l’objet imprimé."
        />

        <ul ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {tools.map((tool) => (
            <li
              key={tool.name}
              data-tile
              data-cursor
              onPointerEnter={onEnter}
              style={{ ["--tool-bg" as string]: tool.color, ["--tool-ink" as string]: tool.ink }}
              className="reveal-init group relative flex min-h-36 flex-col justify-between gap-5 overflow-hidden rounded-card border border-line-inverse p-4 transition-colors duration-500 hover:border-transparent sm:min-h-44 sm:p-5 md:min-h-52 md:p-6 lg:min-h-56 lg:p-7"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--tool-bg)] transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
              />
              <div className="relative flex items-start justify-between gap-3">
                <span
                  data-glyph
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12 md:h-16 md:w-16",
                    !isAdobe(tool.icon) &&
                      "rounded-[10px] bg-[var(--tool-bg)] text-[var(--tool-ink)] shadow-[inset_0_0_0_1.5px_var(--tool-ink)]",
                  )}
                >
                  <ToolIcon name={tool.icon} />
                </span>
                <span className="label hidden text-right text-paper/40 transition-colors duration-500 group-hover:text-[var(--tool-ink)] sm:inline">
                  {tool.category}
                </span>
              </div>
              <div className="relative">
                <span className="label mb-1.5 block text-[0.625rem] text-paper/40 transition-colors duration-500 group-hover:text-[var(--tool-ink)] sm:hidden">
                  {tool.category}
                </span>
                <p className="font-display text-lg leading-tight font-semibold tracking-tight transition-colors duration-500 group-hover:text-[var(--tool-ink)] sm:text-xl md:text-2xl lg:text-3xl">
                  {tool.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
