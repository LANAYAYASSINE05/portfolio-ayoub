"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experiences } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/tokens";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";

const tones = [
  "[--card-bg:var(--color-yellow)] text-key neon:text-ink",
  "",
  "[--card-bg:var(--color-cyan)] text-key neon:text-ink",
  "[--card-bg:var(--color-magenta)] text-key neon:text-ink",
  "",
];

const neonEdge = [
  "neon:shadow-[inset_0_1px_0_rgb(198_255_61_/_0.5)]",
  "neon:shadow-[inset_0_1px_0_rgb(241_240_250_/_0.25)]",
  "neon:shadow-[inset_0_1px_0_rgb(62_230_255_/_0.5)]",
  "neon:shadow-[inset_0_1px_0_rgb(166_107_255_/_0.6)]",
  "neon:shadow-[inset_0_1px_0_rgb(241_240_250_/_0.25)]",
];

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-job]").forEach((job) => {
          gsap.from(job.querySelectorAll("[data-job-head], [data-task]"), {
            y: 30,
            opacity: 0,
            duration: duration.base,
            stagger: 0.06,
            ease: ease.out.gsap,
            scrollTrigger: { trigger: job, start: "top 80%", once: true },
          });
        });
      });

      // Stacked cards: each card sinks back as the next one slides over it.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const jobs = gsap.utils.toArray<HTMLElement>("[data-job]");
        jobs.slice(0, -1).forEach((job, i) => {
          gsap.to(job.querySelector("[data-job-card]"), {
            scale: 0.94,
            rotate: i % 2 ? 1.2 : -1.2,
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: { trigger: jobs[i + 1], start: "top bottom", end: "top 30%", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="relative py-section">
      <div className="container-x">
        <SectionHeading
          index="04"
          kicker="Expérience"
          title="Agences, studios & imprimeries."
          description="Cinq expériences à Casablanca, du social media à la prépresse offset."
        />

        <ol className="space-y-6 md:space-y-10">
          {experiences.map((job, i) => (
            <li
              key={job.company}
              data-job
              style={{ ["--stack" as string]: `${i * 1.5}rem` }}
              className="md:sticky md:top-[calc(6.5rem+var(--stack))]"
            >
              <article
                data-job-card
                className={cn(
                  "card grid gap-8 p-6 md:grid-cols-12 md:p-10 neon:[--neon-card-bg:#0e0e17]",
                  tones[i % tones.length],
                  neonEdge[i % neonEdge.length],
                )}
              >
                <div className="md:col-span-5">
                  <div data-job-head className="flex flex-wrap items-center gap-3">
                    <span className="label rounded-full border-2 border-ink bg-paper px-3 py-1.5 font-medium text-ink neon:border-ink/15 neon:bg-ink/5">
                      {job.period}
                    </span>
                    {job.current && <Sticker tone="magenta" className="rotate-3">En poste</Sticker>}
                  </div>
                  <h3 data-job-head className="mt-6 font-display text-h2 font-extrabold neon:font-bold">
                    {job.company}
                  </h3>
                  <p data-job-head className="mt-2 text-lg font-semibold opacity-80">
                    {job.role}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-6 md:col-span-7">
                  <span
                    aria-hidden
                    className="hidden self-end font-display text-7xl leading-none font-extrabold text-outline-ink md:block"
                  >
                    0{i + 1}
                  </span>
                  <ul className="grid gap-3">
                    {job.tasks.map((task) => (
                      <li key={task} data-task className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-ink bg-paper text-ink neon:rounded-full neon:border-0 neon:bg-magenta/20 neon:text-magenta"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
