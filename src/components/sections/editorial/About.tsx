"use client";

import { useRef } from "react";
import Image from "next/image";
import { animate, stagger as animeStagger } from "animejs";
import { Download, FileText, Mail, MapPin, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutText, languages, profile, qualities, stats } from "@/data/profile";
import { duration, ease, ms } from "@/lib/tokens";
import { useAnimeInView } from "@/lib/use-anime-in-view";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CropMarks } from "@/components/ui/CropMarks";
import { ColorBar } from "@/components/ui/ColorBar";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

export function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDListElement>(null);
  const figureRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = { trigger: figureRef.current, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo("[data-portrait]", { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: scrub });
        gsap.fromTo("[data-card]", { y: 60 }, { y: -30, ease: "none", scrollTrigger: scrub });
      });
    },
    { scope: figureRef },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-about-word]",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: textRef.current, start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );
      });
    },
    { scope: textRef },
  );

  useAnimeInView(statsRef, (root) => {
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const counter = { value: 0 };
      animate(counter, {
        value: target,
        duration: ms(duration.slower),
        ease: ease.out.anime,
        onUpdate: () => {
          el.textContent = String(Math.round(counter.value));
        },
      });
    });
    animate(root.querySelectorAll("[data-stat]"), {
      opacity: [0, 1],
      translateY: [30, 0],
      delay: animeStagger(90),
      duration: ms(duration.slow),
      ease: ease.out.anime,
    });
  });

  return (
    <section id="about" className="relative py-section">
      <div className="container-x">
        <SectionHeading index="01" kicker="À propos" title="Le design, de l’écran à la plaque." />

        <p ref={textRef} className="font-display text-h3 font-semibold md:max-w-5xl md:text-[clamp(1.75rem,3.4vw,3.25rem)] md:leading-[1.12]">
          {aboutText.split(" ").map((word, i) => (
            <span key={i} data-about-word className="inline-block pr-[0.25em]">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
          <figure ref={figureRef} className="max-w-md md:col-span-6 lg:col-span-5">
            <div className="relative text-ink/40">
              <CropMarks />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-paper-dim">
                <Image
                  data-portrait
                  src={profile.photo}
                  alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
                  fill
                  sizes="(min-width: 1024px) 28rem, (min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
                <span className="label absolute top-4 left-4 rounded-full bg-paper/85 px-3 py-1.5 text-ink backdrop-blur">
                  BAT — Portrait
                </span>
              </div>
            </div>

            <div
              data-card
              data-surface="ink"
              className="relative z-10 -mt-20 ml-auto grid aspect-[1.75/1] w-[88%] -rotate-3 sm:-mt-24"
            >
              <div className="flex flex-col justify-between gap-4 rounded-[4px] bg-ink p-5 text-paper shadow-[0_40px_80px_-30px_rgba(13,13,13,0.7)] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                      {profile.lastName.toUpperCase()} {profile.firstName.toUpperCase()}
                    </p>
                    <p className="label mt-1.5 text-magenta">{profile.role}</p>
                  </div>
                  <ColorBar compact />
                </div>
                <ul className="space-y-1 text-sm text-paper/75">
                  {[
                    { Icon: Mail, value: profile.email },
                    { Icon: Phone, value: profile.phone },
                    { Icon: MapPin, value: profile.location },
                  ].map(({ Icon, value }) => (
                    <li key={value} className="flex items-center gap-2">
                      <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-magenta" strokeWidth={2} />
                      <span className="truncate">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <figcaption className="label mt-6 text-muted">
              Portrait & carte de visite — 85 × 55 mm · CMJN
            </figcaption>
          </figure>

          <div className="space-y-12 md:col-span-6 md:col-start-7">
            <p className="text-lead text-ink-soft">{profile.summary}</p>

            <div className="flex flex-wrap gap-3">
              <Button href={profile.cv} download={profile.cvFileName} variant="ink">
                Télécharger mon CV <Download aria-hidden className="h-4 w-4" />
              </Button>
              <Button href={profile.cv} external variant="outline">
                Voir le PDF <FileText aria-hidden className="h-4 w-4" />
              </Button>
            </div>

            <dl ref={statsRef} className="grid grid-cols-2 overflow-hidden rounded-card border border-line">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  data-stat
                  className="reveal-init border-line p-6 odd:border-r [&:nth-child(-n+2)]:border-b"
                >
                  <dd className="font-display text-h2 font-bold">
                    <span data-count={stat.value}>{stat.value}</span>
                    <span className="text-magenta">{stat.suffix}</span>
                  </dd>
                  <dt className="label mt-3 text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="label mb-4 text-muted">Qualités</p>
                <div className="flex flex-wrap gap-2">
                  {qualities.map((q) => (
                    <Tag key={q}>{q}</Tag>
                  ))}
                </div>
              </div>
              <div>
                <p className="label mb-4 text-muted">Langues</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <Tag key={l} tone="ink">
                      {l}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
