"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { experiences } from "@/data/profile";
import { duration, ease } from "@/lib/tokens";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list.current, start: "top 65%", end: "bottom 65%", scrub: true },
          },
        );

        ScrollTrigger.batch("[data-job]", {
          start: "top 80%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { opacity: 1, duration: 0.01 });
            batch.forEach((job, i) => {
              const tl = gsap.timeline({ delay: i * 0.12, defaults: { ease: ease.out.gsap } });
              tl.from(job.querySelector("[data-dot]"), { scale: 0, duration: duration.base, ease: "back.out(3)" })
                .from(job.querySelectorAll("[data-job-head]"), { y: 40, opacity: 0, duration: duration.slow, stagger: 0.08 }, 0.05)
                .from(job.querySelectorAll("[data-task]"), { y: 20, opacity: 0, duration: duration.base, stagger: 0.06 }, 0.25);
            });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="relative bg-paper-dim py-section">
      <div className="container-x">
        <SectionHeading
          index="04"
          kicker="Expérience"
          title="Agences, studios & imprimeries."
          description="Cinq expériences à Casablanca, du social media à la prépresse offset."
        />

        <ol ref={list} className="relative">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(25%+7px)]" />
          <span
            aria-hidden
            data-progress
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-magenta md:left-[calc(25%+7px)]"
          />

          {experiences.map((job) => (
            <li key={job.company} data-job className="reveal-init relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0">
              <div className="md:pr-10 md:text-right">
                <p data-job-head className="label text-muted">
                  {job.period}
                </p>
              </div>

              <span
                data-dot
                aria-hidden
                className={`absolute top-0.5 left-0 h-[15px] w-[15px] rounded-full border-2 border-paper-dim md:left-[25%] ${
                  job.current
                    ? "bg-magenta shadow-[0_0_0_6px_rgb(229_0_125_/_0.18)]"
                    : "bg-ink"
                }`}
              />

              <div className="md:col-span-3 md:pl-14">
                <div data-job-head className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-h3 font-bold">{job.company}</h3>
                  {job.current && <Tag tone="magenta">En poste</Tag>}
                </div>
                <p data-job-head className="mt-2 text-lg font-semibold text-ink-soft">
                  {job.role}
                </p>
                <ul className="mt-6 grid gap-3 md:max-w-3xl">
                  {job.tasks.map((task) => (
                    <li key={task} data-task className="flex gap-3 text-ink-soft">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-ink" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
