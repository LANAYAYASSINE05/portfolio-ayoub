"use client";

import { useRef } from "react";
import { animate, createTimeline, splitText, stagger as animeStagger } from "animejs";
import { BadgeCheck, Brush, Clock, Megaphone, Palette } from "lucide-react";
import { skills } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease, ms } from "@/lib/tokens";
import { useAnimeInView } from "@/lib/use-anime-in-view";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, Button } from "@/components/ui/Button";

const icons = [Palette, Megaphone, BadgeCheck, Brush, Clock];

const cardTone = [
  "",
  "[--card-bg:var(--color-cyan)] text-key neon:text-ink",
  "",
  "[--card-bg:var(--color-magenta)] text-key neon:text-ink",
  "",
];

const swatchTone = ["bg-magenta", "bg-yellow", "bg-cyan", "bg-yellow", "bg-magenta"];

export function Skills() {
  const listRef = useRef<HTMLUListElement>(null);

  useAnimeInView(
    listRef,
    (root) => {
      const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-skill]"));
      const splits = cards
        .map((card) => card.querySelector<HTMLElement>("[data-skill-title]"))
        .map((title) => (title ? splitText(title, { chars: { wrap: "clip" } }) : null));

      const tl = createTimeline({ defaults: { ease: ease.out.anime } });
      cards.forEach((card, i) => {
        const offset = i * 110;
        tl.add(card, { opacity: [0, 1], translateY: [60, 0], duration: ms(duration.slow) }, offset);
        const chars = splits[i]?.chars;
        if (chars) {
          tl.add(chars, { y: ["110%", "0%"], duration: ms(duration.slow), delay: animeStagger(12) }, offset + 120);
        }
      });

      return () => splits.forEach((s) => s?.revert());
    },
    { threshold: 0.1 },
  );

  const onEnter = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse") return;
    const swatch = e.currentTarget.querySelector("[data-skill-swatch]");
    if (!swatch) return;
    animate(swatch, { rotate: [0, -360], scale: [1, 1.2, 1], duration: ms(duration.slow), ease: "outBack(2)" });
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

        <ul ref={listRef} className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={skill.title}
                data-skill
                data-cursor
                onPointerEnter={onEnter}
                className={cn("card hard-lift reveal-init flex min-h-72 flex-col gap-8 p-6 md:p-8", cardTone[i])}
              >
                <div className="flex items-center justify-between">
                  <span
                    data-skill-swatch
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink text-key",
                      "neon:rounded-full neon:border-ink/15 neon:bg-ink/5 neon:text-cyan",
                      swatchTone[i % swatchTone.length],
                    )}
                  >
                    <Icon aria-hidden className="h-6 w-6" strokeWidth={2.2} />
                  </span>
                  <span className="font-display text-5xl leading-none font-extrabold text-outline-ink neon:font-bold">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 data-skill-title className="font-display text-h3 font-extrabold neon:font-semibold">
                    {skill.title}
                  </h3>
                  <p className="mt-3 opacity-80">{skill.description}</p>
                </div>
              </li>
            );
          })}
          <li
            data-skill
            className="card reveal-init flex min-h-72 flex-col justify-between gap-8 p-6 text-key [--card-bg:var(--color-yellow)] md:p-8 neon:text-ink neon:[--neon-card-bg:rgb(198_255_61_/_0.07)] neon:glow-yellow"
          >
            <p className="font-display text-h3 font-extrabold neon:font-semibold">
              Un projet en tête ? Parlons-en autour d’un café ☕
            </p>
            <Button href="#contact" variant="ink" className="self-start">
              Démarrer un projet <ArrowIcon />
            </Button>
          </li>
        </ul>
      </div>
    </section>
  );
}
