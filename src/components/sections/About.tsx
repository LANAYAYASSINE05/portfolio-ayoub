"use client";

import { useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";
import { Download, FileText, Mail, MapPin, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutText, languages, profile, qualities, stats } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease, ms } from "@/lib/tokens";
import { useAnimeInView } from "@/lib/use-anime-in-view";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

const statCards = [
  "[--card-bg:var(--color-yellow)] text-key neon:text-ink",
  "",
  "[--card-bg:var(--color-cyan)] text-key neon:text-ink",
  "[--card-bg:var(--color-magenta)] text-key neon:text-ink",
];

export function About() {
  const root = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
            scrollTrigger: { trigger: textRef.current, start: "top 80%", end: "bottom 50%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-bcard]",
          { rotate: -7, y: 40 },
          {
            rotate: 2,
            y: -10,
            ease: "none",
            scrollTrigger: { trigger: "[data-bcard]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-bento]").forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: duration.slow,
            ease: ease.out.gsap,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  useAnimeInView(statsRef, (el) => {
    el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
      const target = Number(node.dataset.count);
      const counter = { value: 0 };
      animate(counter, {
        value: target,
        duration: ms(duration.slower),
        ease: ease.out.anime,
        onUpdate: () => {
          node.textContent = String(Math.round(counter.value));
        },
      });
    });
    el.querySelectorAll<HTMLElement>("[data-stat]").forEach((card, i) => {
      animate(card, {
        opacity: [0, 1],
        translateY: [40, 0],
        rotate: [i % 2 ? 6 : -6, 0],
        delay: i * 90,
        duration: ms(duration.slow),
        ease: ease.out.anime,
      });
    });
  });

  return (
    <section ref={root} id="about" className="relative py-section">
      <div className="container-x">
        <SectionHeading index="01" kicker="À propos" title="Le design, de l’écran à la plaque." />

        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          <div data-bento className="card p-6 md:col-span-12 md:p-10 lg:col-span-8">
            <Sticker tone="cyan" className="mb-6">Hello ✌</Sticker>
            <p
              ref={textRef}
              className="font-display text-h3 font-bold md:text-[clamp(1.6rem,2.8vw,2.6rem)] md:leading-[1.15] neon:font-semibold"
            >
              {aboutText.split(" ").map((word, i) => (
                <span key={i} data-about-word className="inline-block pr-[0.25em]">
                  {word}
                </span>
              ))}
            </p>
          </div>

          <div className="flex items-center justify-center py-6 md:col-span-6 md:py-0 lg:col-span-4">
            <div
              data-bcard
              data-surface="ink"
              className="card w-full max-w-sm p-5 text-paper [--card-bg:var(--color-ink)] [--hard-c:var(--color-magenta)] sm:p-6 neon:[--neon-card-bg:rgb(17_17_27_/_0.75)] neon:shadow-[0_30px_80px_-20px_rgb(62_230_255_/_0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-paper neon:border-cyan/60">
                  <Image src={profile.photo} alt="" fill sizes="64px" className="object-cover object-top" />
                </span>
                <span className="label rounded-full bg-yellow px-3 py-1.5 font-medium text-key">Carte de visite</span>
              </div>
              <p className="mt-6 font-display text-2xl font-extrabold tracking-tight neon:font-bold">
                {profile.lastName.toUpperCase()} {profile.firstName.toUpperCase()}
              </p>
              <p className="label mt-1.5 text-magenta">{profile.role}</p>
              <ul className="mt-5 space-y-1.5 border-t-2 border-dashed border-paper/25 pt-4 text-sm text-paper/80 neon:border-solid neon:border-t">
                {[
                  { Icon: Mail, value: profile.email },
                  { Icon: Phone, value: profile.phone },
                  { Icon: MapPin, value: profile.location },
                ].map(({ Icon, value }) => (
                  <li key={value} className="flex items-center gap-2">
                    <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-yellow" strokeWidth={2.2} />
                    <span className="truncate">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            data-bento
            className="card flex flex-col justify-between gap-8 p-6 text-key [--card-bg:var(--color-magenta)] md:col-span-6 md:p-8 lg:col-span-5 neon:text-ink neon:[--neon-card-bg:rgb(166_107_255_/_0.08)]"
          >
            <p className="text-lead font-medium">{profile.summary}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={profile.cv} download={profile.cvFileName} variant="ink">
                Télécharger mon CV <Download aria-hidden className="h-4 w-4" />
              </Button>
              <Button href={profile.cv} external variant="outline">
                Voir le PDF <FileText aria-hidden className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-5 md:col-span-12 md:grid-cols-4 md:gap-6 lg:col-span-7">
            {stats.map((stat, i) => (
              <div key={stat.label} data-stat className={cn("card reveal-init flex flex-col justify-between gap-6 p-5 md:p-6", statCards[i])}>
                <p className="font-display text-h2 font-extrabold neon:font-bold">
                  <span data-count={stat.value}>{stat.value}</span>
                  <span className="text-magenta neon:text-yellow">{stat.suffix}</span>
                </p>
                <p className="label leading-snug font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          <div data-bento className="card p-6 md:col-span-7 md:p-8">
            <p className="label mb-5 font-medium text-muted">Qualités</p>
            <div className="flex flex-wrap gap-2.5">
              {qualities.map((q, i) => (
                <Tag key={q} tone={(["yellow", "outline", "cyan", "magenta", "outline"] as const)[i % 5]}>
                  {q}
                </Tag>
              ))}
            </div>
          </div>

          <div
            data-bento
            className="card p-6 text-key [--card-bg:var(--color-yellow)] md:col-span-5 md:p-8 neon:text-ink neon:[--neon-card-bg:rgb(198_255_61_/_0.06)]"
          >
            <p className="label mb-5 font-medium">Langues</p>
            <ul className="flex flex-wrap gap-2.5">
              {languages.map((l) => (
                <li key={l}>
                  <Tag tone="ink">{l}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
