"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { profile, projectCategories, projects, type Project } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease, spring } from "@/lib/tokens";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/icons/BrandLogos";

type Filter = (typeof projectCategories)[number];

/** Bento rhythm over 6 tiles: one feature (8×2) + five 4×1, the feature flips side every cycle. */
const spanFor = (i: number) => {
  const slot = i % 6;
  if (slot !== 0) return "lg:col-span-4";
  const flipped = Math.floor(i / 6) % 2 === 1;
  return cn("md:col-span-2 md:row-span-2 lg:col-span-8 lg:row-span-2", flipped && "lg:col-start-5");
};

const categoryTone: Record<Project["category"], "yellow" | "cyan" | "magenta"> = {
  Branding: "magenta",
  "Social media": "cyan",
  "Print & édition": "yellow",
};

const chipTone = {
  yellow: "bg-yellow neon:glow-yellow",
  cyan: "bg-cyan neon:glow-cyan",
  magenta: "bg-magenta neon:glow-magenta",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const feature = index % 6 === 0;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: duration.fast } }}
      transition={{ ...spring.gentle, opacity: { duration: duration.base } }}
      className={spanFor(index)}
    >
      <motion.a
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        initial="rest"
        whileHover="hover"
        animate="rest"
        data-cursor
        className="card hard-lift group relative block h-full overflow-hidden [--card-bg:var(--color-paper-dim)] neon:hover:ring-1 neon:hover:ring-magenta/60 neon:hover:shadow-[0_30px_100px_-30px_rgb(166_107_255_/_0.75)]"
      >
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: duration.slow, ease: ease.out.motion }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={`${project.title} — ${project.client}`}
            fill
            sizes={feature ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover"
          />
        </motion.div>

        <span
          className={cn(
            "label absolute top-3 left-3 rounded-full border-2 border-ink px-3 py-1.5 font-medium text-key neon:border-0",
            chipTone[categoryTone[project.category]],
          )}
        >
          {project.category}
        </span>

        <motion.span
          variants={{ rest: { scale: 0, rotate: -45 }, hover: { scale: 1, rotate: 0 } }}
          transition={spring.snappy}
          className="absolute top-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-yellow text-key neon:border-0 neon:glow-yellow"
        >
          <ArrowIcon className="h-5 w-5" />
        </motion.span>

        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 rounded-tile border-2 border-ink bg-paper px-4 py-3 neon:border-ink/15 neon:bg-paper/70 neon:backdrop-blur-xl">
          <div className="min-w-0">
            <h3
              className={cn(
                "truncate font-display font-extrabold tracking-tight neon:font-bold",
                feature ? "text-xl md:text-3xl" : "text-lg",
              )}
            >
              {project.title}
            </h3>
            <p className="truncate text-sm text-muted">{project.client}</p>
          </div>
          <span className="label shrink-0 text-muted">{project.year}</span>
        </div>
      </motion.a>
    </motion.li>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("Tous");

  const visible = useMemo(
    () => (filter === "Tous" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["Tous", projects.length]]);
    projects.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, []);

  return (
    <section id="projects" className="relative py-section">
      <div className="container-x">
        <SectionHeading
          index="07"
          kicker="Projets"
          title="Travaux sélectionnés."
          description="Identités, campagnes social media et mises en page réalisées pour des marques marocaines et des projets personnels."
        />

        <LayoutGroup>
          <div
            role="tablist"
            aria-label="Filtrer les projets"
            className="hide-scrollbar -mx-gutter mb-10 flex gap-3 overflow-x-auto px-gutter pt-1 pb-3 md:mx-0 md:mb-14 md:flex-wrap md:px-0"
          >
            {projectCategories.map((cat) => {
              const selected = filter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "hard hard-lift relative shrink-0 rounded-full bg-paper px-5 py-2.5 text-sm font-bold [--hard-k:0.6] neon:bg-ink/5",
                    selected ? "text-key neon:text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="project-filter"
                      transition={spring.snappy}
                      className="absolute inset-0 rounded-full bg-yellow neon:bg-magenta/20 neon:glow-magenta"
                    />
                  )}
                  <span className="relative">
                    {cat} <sup className="ml-0.5 font-mono text-[0.65rem] opacity-60">{counts.get(cat)}</sup>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.ul
            layout
            className="grid grid-flow-row-dense auto-rows-[20rem] gap-5 md:grid-cols-2 md:auto-rows-[17rem] md:gap-6 lg:grid-cols-12 lg:auto-rows-[18rem]"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard key={project.href} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        <div className="mt-20 flex flex-col items-center gap-5 text-center">
          <p className="text-lead text-ink-soft">Envie d’en voir plus ?</p>
          <Button href={profile.socials[0].href} external variant="ink" size="lg">
            <BrandIcon name="behance" className="h-5 w-5" />
            Tout le portfolio sur Behance <ArrowIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}
