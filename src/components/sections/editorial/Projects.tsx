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

/** Alternating 7/5 then 5/7 column spans give the grid an editorial rhythm. */
const spanFor = (i: number) => {
  const row = Math.floor(i / 2);
  const first = i % 2 === 0;
  return (row % 2 === 0) === first ? "md:col-span-7" : "md:col-span-5";
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: duration.fast } }}
      transition={{ ...spring.gentle, opacity: { duration: duration.base } }}
      className={cn("col-span-12", spanFor(index))}
    >
      <motion.a
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        initial="rest"
        whileHover="hover"
        animate="rest"
        data-cursor
        className="group block"
      >
        <div className="relative h-[22rem] overflow-hidden rounded-card bg-paper-dim transition-shadow duration-500 md:h-[30rem]">
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: duration.slow, ease: ease.out.motion }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={`${project.title} — ${project.client}`}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: duration.fast }}
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
          />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="label rounded-full bg-paper/90 px-3 py-2 text-ink backdrop-blur">
              {project.category}
            </span>
          </div>

          <motion.span
            variants={{ rest: { scale: 0, rotate: -45 }, hover: { scale: 1, rotate: 0 } }}
            transition={spring.snappy}
            className="absolute top-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-magenta text-paper"
          >
            <ArrowIcon className="h-5 w-5" />
          </motion.span>

          <motion.p
            variants={{ rest: { y: 16, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
            transition={{ duration: duration.base, ease: ease.out.motion }}
            className="label absolute bottom-5 left-5 text-paper"
          >
            Voir sur Behance
          </motion.p>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.client}</p>
          </div>
          <span className="label text-muted">{project.year}</span>
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
          <div role="tablist" aria-label="Filtrer les projets" className="hide-scrollbar -mx-gutter mb-10 flex gap-2 overflow-x-auto px-gutter md:mx-0 md:mb-14 md:flex-wrap md:px-0">
            {projectCategories.map((cat) => {
              const selected = filter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "relative shrink-0 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300",
                    selected
                      ? "border-ink text-paper"
                      : "border-line text-ink-soft hover:border-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="project-filter"
                      transition={spring.snappy}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                  <span className="relative">
                    {cat} <sup className="ml-0.5 font-mono text-[0.65rem] opacity-60">{counts.get(cat)}</sup>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.ul layout className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-16">
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
