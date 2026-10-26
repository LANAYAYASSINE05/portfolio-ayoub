"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { profile, projectCategories, projects } from "@/data/profile";
import { cn } from "@/lib/cn";
import { BrandIcon } from "@/components/icons/BrandLogos";
import { Button } from "@/components/ui/Button";
import { Panel, Title } from "@/components/swiss/parts";

type Filter = (typeof projectCategories)[number];

const counts = new Map<Filter, number>([["Tous", projects.length]]);
projects.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));

/** Filtering dims the other projects instead of removing them, so the story never changes length. */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("Tous");

  return (
    <Panel id="projects" className="story:w-max" bodyClassName="flex flex-col gap-12 story:flex-row story:gap-0">
      <div className="flex flex-col gap-8 story:w-[26vw] story:justify-between story:pr-[clamp(2rem,4vw,4rem)]">
        <Title accent="imprimés.">Travaux</Title>
        <div>
          <div role="radiogroup" aria-label="Filtrer les projets" className="flex flex-wrap border-t-2 border-ink story:flex-col">
            {projectCategories.map((cat) => {
              const selected = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "flex items-baseline justify-between gap-6 border-b border-line px-0 py-2.5 pr-4 text-left text-lg font-medium tracking-[-0.01em] transition-colors story:pr-0",
                    selected ? "text-magenta" : "hover:text-magenta",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden className={cn("h-2.5 w-2.5", selected ? "bg-magenta" : "bg-ink/15")} />
                    {cat}
                  </span>
                  <span className="text-sm text-muted tabular-nums">{counts.get(cat)}</span>
                </button>
              );
            })}
          </div>
          <Button href={profile.socials[0].href} external variant="ink" magnetic={false} className="mt-6">
            <BrandIcon name="behance" className="h-4 w-4" />
            Tout sur Behance
          </Button>
        </div>
      </div>

      <ol className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 story:flex story:gap-[clamp(1.25rem,2vw,2rem)]">
        {projects.map((project, i) => {
          const dimmed = filter !== "Tous" && project.category !== filter;
          const lit = filter !== "Tous" && !dimmed;
          return (
            <li
              key={project.href}
              data-reveal
              className={cn("transition-opacity duration-500", dimmed && "opacity-20")}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={dimmed ? -1 : undefined}
                data-cursor="hover"
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-dim story:h-[calc(100svh-17rem)]">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.client}`}
                    fill
                    sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 90vw"
                    className={cn(
                      "object-cover transition duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0",
                      lit ? "grayscale-0" : "grayscale",
                    )}
                  />
                  <span className="absolute top-0 right-0 flex h-12 w-12 translate-x-full items-center justify-center bg-magenta text-paper transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
                    <ArrowUpRight aria-hidden className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-2 border-t-2 border-ink pt-2.5">
                  <span className="text-sm font-medium text-magenta tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-lg leading-tight font-bold tracking-[-0.02em]">{project.title}</span>
                    <span className="block truncate text-sm text-muted">
                      {project.client} · {project.category}
                    </span>
                  </span>
                  <span className="text-sm text-muted tabular-nums">{project.year}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}
