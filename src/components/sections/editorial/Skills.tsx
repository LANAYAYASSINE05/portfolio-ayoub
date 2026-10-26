"use client";

import { useRef } from "react";
import { animate, createTimeline, splitText, stagger as animeStagger } from "animejs";
import { skills } from "@/data/profile";
import { duration, ease, ms } from "@/lib/tokens";
import { useAnimeInView } from "@/lib/use-anime-in-view";
import { SectionHeading } from "@/components/ui/SectionHeading";

const inkCycle = ["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink", "bg-magenta"];

export function Skills() {
  const listRef = useRef<HTMLOListElement>(null);

  useAnimeInView(
    listRef,
    (root) => {
      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-skill]"));
      const splits = rows.map((row) => splitText(row.querySelector("[data-skill-title]")!, { chars: { wrap: "clip" } }));

      const tl = createTimeline({ defaults: { ease: ease.out.anime } });
      rows.forEach((row, i) => {
        const offset = i * 120;
        tl.add(row, { opacity: [0, 1], duration: 10 }, offset)
          .add(row.querySelector("[data-skill-rule]")!, { scaleX: [0, 1], duration: ms(duration.slow) }, offset)
          .add(splits[i].chars, { y: ["110%", "0%"], duration: ms(duration.slow), delay: animeStagger(14) }, offset + 80)
          .add(
            row.querySelectorAll("[data-skill-fade]"),
            { opacity: [0, 1], x: [-16, 0], duration: ms(duration.base) },
            offset + 260,
          );
      });

      return () => splits.forEach((s) => s.revert());
    },
    { threshold: 0.15 },
  );

  const onEnter = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse") return;
    animate(e.currentTarget.querySelector("[data-skill-swatch]")!, {
      scale: [0, 1],
      rotate: [-90, 0],
      duration: ms(duration.base),
      ease: "outBack(2)",
    });
  };

  return (
    <section id="skills" className="relative py-section">
      <div className="container-x">
        <SectionHeading
          index="03"
          kicker="Compétences"
          title="Ce que j’apporte à chaque projet."
          description="Un mélange de sens artistique et de rigueur technique, affiné en agence, en studio et en imprimerie."
        />

        <ol ref={listRef}>
          {skills.map((skill, i) => (
            <li
              key={skill.title}
              data-skill
              data-cursor
              onPointerEnter={onEnter}
              className="reveal-init group relative grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-7 md:py-9 lg:grid-cols-12 lg:py-10"
            >
              <span data-skill-rule className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
              <span data-skill-fade className="label text-muted lg:col-span-1">
                0{i + 1}
              </span>
              <h3
                data-skill-title
                className="font-display text-h3 font-bold transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:pr-10 md:text-[clamp(1.75rem,3.6vw,3rem)] lg:col-span-6 lg:pr-0 lg:text-[clamp(1.75rem,3.2vw,3rem)]"
              >
                {skill.title}
              </h3>
              <p data-skill-fade className="col-start-2 mt-3 max-w-md text-ink-soft lg:col-span-4 lg:col-start-8 lg:mt-0">
                {skill.description}
              </p>
              <span
                data-skill-swatch
                aria-hidden
                className={`absolute top-1/2 right-0 hidden h-4 w-4 -translate-y-1/2 rounded-full md:block ${inkCycle[i % inkCycle.length]}`}
              />
            </li>
          ))}
          <li aria-hidden className="h-px bg-line" />
        </ol>
      </div>
    </section>
  );
}
