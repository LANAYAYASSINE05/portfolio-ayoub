"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger as animeStagger, svg } from "animejs";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease, ms } from "@/lib/tokens";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { ColorBar } from "@/components/ui/ColorBar";
import { RegistrationMark } from "@/components/ui/RegistrationMark";

const covers = [
  { src: "/projects/ain-ifrane.jpg", alt: "Campagne Aïn Ifrane", position: "top-[50%] -right-[2%] w-[12vw]", tilt: "rotate-[8deg]", speed: -160 },
  { src: "/projects/healthy-food.jpg", alt: "Healthy Food", position: "top-[36%] -left-[1.5%] w-[10vw]", tilt: "-rotate-[10deg]", speed: -240 },
];

const inks = [
  { color: "bg-cyan", position: "top-0 left-0", from: { x: -140, y: -60 }, drift: { x: -50, y: -20 } },
  { color: "bg-magenta", position: "top-0 right-0", from: { x: 140, y: -60 }, drift: { x: 50, y: -20 } },
  { color: "bg-yellow", position: "bottom-0 left-[0.265em]", from: { x: 0, y: 140 }, drift: { x: 0, y: 50 } },
];

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
  const mark = useRef<HTMLDivElement>(null);

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
            "[data-ink]",
            {
              x: (i) => inks[i].from.x,
              y: (i) => inks[i].from.y,
              scale: 0.4,
              opacity: 0,
              duration: duration.slower,
              stagger: 0.1,
            },
            0.2,
          )
          .from("[data-cover]", { y: 160, opacity: 0, duration: duration.slower, stagger: 0.12 }, 0.5)
          .from("[data-meta]", { y: 20, opacity: 0, duration: duration.base, stagger: 0.06 }, 0.8)
          .from("[data-badge]", { scale: 0, rotate: -120, duration: duration.slow }, 0.9);

        // Scroll: inks drift out of register, the name splits apart, covers float at different speeds.
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 };
        gsap
          .timeline({ scrollTrigger: scrub })
          .to("[data-ink-drift]", { x: (i) => inks[i].drift.x, y: (i) => inks[i].drift.y, ease: "none" }, 0)
          .to("[data-line='first']", { xPercent: -8, ease: "none" }, 0)
          .to("[data-line='last']", { xPercent: 8, ease: "none" }, 0);

        gsap.utils.toArray<HTMLElement>("[data-cover-parallax]").forEach((cover, i) => {
          gsap.to(cover, { y: covers[i].speed, ease: "none", scrollTrigger: { ...scrub, scrub: true } });
        });
      });
    },
    { scope: root },
  );

  useEffect(() => {
    const el = mark.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const paths = svg.createDrawable(el.querySelectorAll("[data-draw]"));
    const draw = animate(paths, {
      draw: ["0 0", "0 1"],
      duration: ms(duration.slower),
      delay: animeStagger(140, { start: 900 }),
      ease: ease.inOut.anime,
    });
    const spin = animate(el, { rotate: 360, duration: 24000, loop: true, ease: "linear" });
    return () => {
      draw.revert();
      spin.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="grain relative flex min-h-[100svh] flex-col justify-between gap-10 overflow-hidden pt-24 pb-8 md:pt-28"
    >
      <div className="container-x flex items-start justify-between">
        <p data-meta className="label text-muted">
          Portfolio <span className="text-magenta">©</span>2026
        </p>
        <p data-meta className="label hidden text-right leading-relaxed text-muted sm:block">
          {profile.location} <br /> 33.57° N — 7.58° W
        </p>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {covers.map((cover) => (
          <div key={cover.src} data-cover-parallax className={cn("absolute hidden lg:block", cover.position)}>
            <div
              data-cover
              className={cn(
                "relative aspect-[4/5] overflow-hidden rounded-tile shadow-[0_30px_60px_-20px_rgba(13,13,13,0.45)]",
                cover.tilt,
              )}
            >
              <Image src={cover.src} alt={cover.alt} fill sizes="15vw" className="object-cover" priority />
            </div>
          </div>
        ))}

        <div ref={mark} className="absolute top-[13%] left-[44%] h-12 w-12 text-ink/70 md:h-16 md:w-16">
          <RegistrationMark className="h-full w-full" />
        </div>
      </div>

      <div className="relative container-x">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-0.06em] right-[var(--spacing-gutter)] h-[0.9em] w-[1.15em] font-display text-display"
        >
          {inks.map((ink) => (
            <span key={ink.color} data-ink-drift className="absolute inset-0">
              <span
                data-ink
                className={cn(
                  "absolute h-[0.62em] w-[0.62em] rounded-full mix-blend-multiply",
                  ink.color,
                  ink.position,
                )}
              />
            </span>
          ))}
        </div>
        <h1 data-hero-reveal className="reveal-init font-display text-display font-extrabold uppercase">
          <span className="sr-only">
            {profile.firstName} {profile.lastName} — {profile.role}
          </span>
          <SplitChars text={profile.firstName} line="first" />
          <SplitChars text={profile.lastName} line="last" className="text-outline-ink text-right" />
        </h1>
      </div>

      <div className="relative container-x grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <div data-meta className="mb-5 flex items-center gap-3">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-[0_0_0_2px_var(--color-paper),0_0_0_3.5px_var(--color-magenta)]">
              <Image src={profile.photo} alt="" fill sizes="48px" className="object-cover" priority />
            </span>
            <span>
              <span className="label block text-magenta">● {profile.role}</span>
              <span className="label mt-1 block text-muted">{profile.location}</span>
            </span>
          </div>
          <p data-meta className="max-w-md text-lead text-ink-soft">
            {profile.tagline} Identités visuelles, social media &amp; print.
          </p>
        </div>

        <div data-meta className="flex flex-wrap gap-3 md:col-span-4 md:col-start-6 lg:col-start-7 lg:col-span-4">
          <Button href="#projects" size="lg">
            Voir les projets <ArrowIcon />
          </Button>
          <Button href="#contact" variant="outline" size="lg">
            Me contacter
          </Button>
        </div>

        <div className="flex items-end justify-between gap-6 md:col-span-3 md:col-start-10 md:flex-col md:items-end lg:col-span-2 lg:col-start-11">
          <a href="#about" data-badge aria-label="Défiler vers À propos" className="relative block h-24 w-24 md:h-28 md:w-28">
            <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow" aria-hidden>
              <defs>
                <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-ink font-mono text-[8.5px] uppercase">
                <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">
                  Graphic designer • Print • Branding •
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-magenta text-paper">
              <ArrowIcon className="rotate-[135deg]" />
            </span>
          </a>
          <ColorBar compact className="md:hidden" />
        </div>
      </div>
    </section>
  );
}
