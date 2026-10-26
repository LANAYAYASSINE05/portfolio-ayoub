"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { gsap, useGSAP } from "@/lib/gsap";
import { duration, ease, stagger } from "@/lib/tokens";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/swiss/parts";

const meta = ["Portfolio 2026", profile.role, profile.location];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: ease.out.gsap } })
          .from("[data-line]", { yPercent: 105, duration: duration.slower, stagger: stagger.loose })
          .from("[data-meta]", { y: 12, opacity: 0, duration: duration.base, stagger: stagger.base }, 0.2)
          .from("[data-photo]", { clipPath: "inset(100% 0 0 0)", duration: duration.slow }, 0.3)
          .from("[data-square]", { scale: 0, transformOrigin: "0% 100%", duration: duration.base }, 0.9)
          .from("[data-foot]", { y: 16, opacity: 0, duration: duration.base, stagger: stagger.base }, 0.7);
      });
    },
    { scope: root },
  );

  return (
    <Panel id="hero" first className="story:w-screen">
      <div
        ref={root}
        className="grid gap-y-10 md:grid-cols-12 md:gap-x-6 story:h-full story:grid-rows-[auto_minmax(0,1fr)_auto] story:gap-y-6"
      >
        <ul className="col-span-full grid grid-cols-2 gap-x-6 gap-y-1 text-sm font-medium md:grid-cols-12">
          {meta.map((item) => (
            <li key={item} data-meta className="md:col-span-3">
              {item}
            </li>
          ))}
          <li data-meta className="flex items-center gap-2 text-magenta md:col-span-3">
            <span aria-hidden className="h-2 w-2 animate-pulse bg-magenta" />
            Disponible
          </li>
        </ul>

        <h1 className="col-span-full self-end font-display text-[clamp(3.75rem,18vw,9rem)] leading-[0.84] font-bold tracking-[-0.065em] md:col-span-12 story:col-span-9 story:text-[clamp(5rem,min(14vw,25svh),17rem)]">
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-line className="block">
              {profile.firstName}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-line className="block">
              {profile.lastName}
              <span className="text-magenta">.</span>
            </span>
          </span>
        </h1>

        <figure
          data-photo
          className="relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-paper-dim md:col-span-5 story:col-span-3 story:col-start-10 story:row-start-2 story:aspect-auto story:h-full story:max-w-none"
        >
          <Image
            src={profile.photo}
            alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
            fill
            priority
            sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 40vw, 90vw"
            className="object-cover grayscale contrast-125"
          />
          <span data-square aria-hidden className="absolute bottom-0 left-0 h-1/5 w-2/5 bg-magenta" />
        </figure>

        <div className="col-span-full grid gap-6 border-t-2 border-ink pt-5 md:grid-cols-12 md:gap-x-6">
          <p
            data-foot
            className="text-xl leading-snug font-medium tracking-[-0.02em] md:col-span-6 story:col-span-5 story:text-[clamp(1.125rem,1.45vw,1.5rem)]"
          >
            {profile.tagline}
          </p>
          <div data-foot className="flex flex-wrap gap-3 md:col-span-6 story:col-span-4 story:col-start-6">
            <Button href="#projects" magnetic={false} className="min-w-52">
              Voir les projets <ArrowRight aria-hidden className="h-4 w-4" />
            </Button>
            <Button href={profile.cv} download={profile.cvFileName} variant="outline" magnetic={false} className="min-w-40">
              CV <Download aria-hidden className="h-4 w-4" />
            </Button>
          </div>
          <p data-foot className="hidden items-start justify-end gap-3 text-sm font-medium story:col-span-3 story:flex">
            Faites défiler
            <ArrowRight aria-hidden className="h-5 w-5 animate-pulse text-magenta" />
          </p>
        </div>
      </div>
    </Panel>
  );
}
