"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, svg } from "animejs";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile, stats } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease, ms } from "@/lib/tokens";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Sticker } from "@/components/ui/Sticker";

const cardTilt = [-5, 4, -3];

/** 12-point burst, drawn once at module load. */
const burstPoints = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
  const r = i % 2 === 0 ? 48 : 38;
  return `${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

function SplitChars({ text, line, className }: { text: string; line: string; className?: string }) {
  return (
    <span data-line={line} className={cn("block whitespace-nowrap", className)} aria-hidden>
      {text.split("").map((char, i) => (
        <span key={i} className="mask-line inline-block">
          <span data-char className="inline-block will-change-transform">
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const squiggle = useRef<SVGSVGElement>(null);
  const burst = useRef<SVGSVGElement>(null);
  const years = stats.find((s) => s.label.startsWith("Années")) ?? stats[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: ease.out.gsap }, delay: 0.15 });

        tl.set("[data-hero-reveal]", { opacity: 1 })
          .from("[data-line='first'] [data-char]", {
            yPercent: 115,
            rotate: 8,
            duration: duration.slower,
            stagger: 0.06,
          })
          .from("[data-line='last'] [data-char]", { yPercent: -115, duration: duration.slower, stagger: 0.045 }, 0.25)
          .from(
            "[data-card]",
            {
              y: 120,
              rotate: (i) => cardTilt[i] ?? 0,
              opacity: 0,
              duration: duration.slower,
              stagger: 0.12,
            },
            0.45,
          )
          .from("[data-meta]", { y: 20, opacity: 0, duration: duration.base, stagger: 0.06 }, 0.8)
          .from("[data-pop]", { scale: 0, rotate: -90, duration: duration.slow, ease: "back.out(2.2)", stagger: 0.1 }, 1);

        // Scroll: the two lines of the name slide apart.
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 } })
          .to("[data-line='first']", { xPercent: -8, ease: "none" }, 0)
          .to("[data-line='last']", { xPercent: 8, ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anims: { revert: () => void }[] = [];
    if (squiggle.current) {
      const paths = svg.createDrawable(squiggle.current.querySelectorAll("[data-draw]"));
      anims.push(animate(paths, { draw: ["0 0", "0 1"], duration: ms(duration.slower), delay: 1300, ease: ease.inOut.anime }));
    }
    if (burst.current) {
      anims.push(animate(burst.current, { rotate: 360, duration: 16000, loop: true, ease: "linear" }));
    }
    return () => anims.forEach((a) => a.revert());
  }, []);

  return (
    <section ref={root} id="hero" className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden neon:block">
        <div className="neon-grid absolute inset-0" />
        <div className="absolute -top-40 left-[10%] h-[34rem] w-[34rem] rounded-full bg-magenta/25 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[30rem] w-[30rem] rounded-full bg-cyan/15 blur-[140px]" />
      </div>

      <div className="relative container-x flex items-start justify-between gap-4">
        <p data-meta className="label font-medium text-ink-soft">
          Portfolio <span className="text-magenta">©</span>2026
          <span className="text-cyan"> · Studio néon</span>
        </p>
        <p data-meta className="label hidden text-right leading-relaxed text-ink-soft sm:block">
          {profile.location} <br /> 33.57° N — 7.58° W
        </p>
      </div>

      <div className="relative container-x mt-6 md:mt-10">
        <h1 data-hero-reveal className="reveal-init font-display text-display font-extrabold uppercase neon:font-bold">
          <span className="sr-only">
            {profile.firstName} {profile.lastName} — {profile.role}
          </span>
          <SplitChars text={profile.firstName} line="first" />
          <SplitChars text={profile.lastName} line="last" className="text-outline-ink text-hard-shadow text-right" />
        </h1>
        <div data-pop className="absolute top-[18%] right-[var(--spacing-gutter)] hidden md:block">
          <Sticker tone="magenta" className="rotate-[8deg] text-base">
            ✶ Graphic designer
          </Sticker>
        </div>
      </div>

      <div className="relative container-x mt-10 grid gap-5 md:mt-14 md:grid-cols-12 md:gap-6">
        <figure
          data-card
          className="card relative h-80 overflow-hidden md:col-span-5 md:h-auto md:min-h-[22rem] lg:col-span-3"
        >
          <Image
            src={profile.photo}
            alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
            fill
            priority
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 100vw"
            className="object-cover object-top"
          />
          <div data-pop className="absolute top-4 left-4">
            <Sticker tone="yellow">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full border-2 border-ink bg-[#3ddc84] neon:border-0" />
              Dispo
            </Sticker>
          </div>
          <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-tile border-2 border-ink bg-paper px-4 py-3 neon:border-ink/15 neon:bg-paper/70 neon:backdrop-blur-xl">
            <span className="font-display font-extrabold tracking-tight neon:font-semibold">{profile.role}</span>
            <span className="label text-muted">CMN</span>
          </figcaption>
        </figure>

        <div
          data-card
          className="card flex flex-col justify-between gap-8 p-6 text-key [--card-bg:var(--color-yellow)] md:col-span-7 md:p-8 lg:col-span-6 neon:text-ink neon:[--neon-card-bg:rgb(198_255_61_/_0.06)]"
        >
          <div>
            <p className="label mb-5 font-medium">● {profile.role} — {profile.location}</p>
            <p className="font-display text-h3 font-extrabold neon:font-semibold">
              {profile.tagline}
            </p>
            <svg ref={squiggle} viewBox="0 0 220 24" fill="none" aria-hidden className="mt-3 h-5 w-44 text-magenta">
              <path
                data-draw
                d="M3 14 Q 16 3 29 14 T 55 14 T 81 14 T 107 14 T 133 14 T 159 14 T 185 14 T 217 12"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            <p className="mt-4 max-w-md text-ink-soft neon:text-ink-soft">
              Identités visuelles, social media &amp; print — de l’écran jusqu’à la plaque d’impression.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="#projects" variant="ink">
              Voir les projets <ArrowIcon />
            </Button>
            <Button href="#contact" variant="outline">
              Me contacter
            </Button>
          </div>
        </div>

        <div
          data-card
          className="card relative flex items-end justify-between gap-6 overflow-hidden p-6 text-key [--card-bg:var(--color-cyan)] md:col-span-12 md:p-8 lg:col-span-3 lg:flex-col lg:items-start neon:text-ink neon:[--neon-card-bg:rgb(62_230_255_/_0.06)]"
        >
          <div>
            <p className="font-display text-[clamp(4.5rem,8vw,7rem)] leading-[0.8] font-extrabold tracking-tight neon:font-bold">
              {years.value}
              <span className="text-magenta">{years.suffix}</span>
            </p>
            <p className="label mt-4 font-medium">{years.label}</p>
          </div>
          <a
            href="#about"
            data-pop
            aria-label="Défiler vers À propos"
            className="group relative block h-24 w-24 shrink-0 lg:self-end"
          >
            <svg ref={burst} viewBox="0 0 100 100" aria-hidden className="h-full w-full overflow-visible">
              <polygon
                points={burstPoints}
                className="fill-yellow stroke-ink neon:stroke-transparent"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform duration-300 group-hover:scale-110 neon:border-0 neon:bg-key neon:text-yellow">
              <ArrowIcon className="rotate-[135deg]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
