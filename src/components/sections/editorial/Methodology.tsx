"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { methodology } from "@/data/profile";
import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";

const inkBg: Record<(typeof methodology)[number]["ink"], string> = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  yellow: "bg-yellow",
  key: "bg-paper",
};

const inkGlow: Record<(typeof methodology)[number]["ink"], string> = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  yellow: "text-yellow",
  key: "text-paper",
};

export function Methodology() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(el, { x: () => -distance(), ease: "none" }, 0).fromTo(
          "[data-method-progress]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );

        gsap.utils.toArray<HTMLElement>("[data-method-card]").forEach((card) => {
          gsap.from(card.querySelector("[data-method-ink]"), {
            scale: 0.2,
            rotate: -90,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 95%",
              end: "left 45%",
              scrub: true,
            },
          });
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-method-card]").forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="methodology" data-surface="ink" className="relative overflow-hidden bg-ink text-paper">
      <div ref={pin} className="flex flex-col justify-center py-section lg:min-h-[100svh] lg:py-12">
        <div className="container-x">
          <SectionHeading
            inverse
            index="06"
            kicker="Méthode"
            title="Cinq étapes, du brief au fichier final."
            className="lg:mb-12"
          />
        </div>

        <div
          ref={track}
          className="flex flex-col gap-4 px-[var(--spacing-gutter)] lg:w-max lg:flex-row lg:gap-6 lg:pr-[30vw]"
        >
          {methodology.map((item) => (
            <article
              key={item.step}
              data-method-card
              className="group relative flex flex-col justify-between overflow-hidden rounded-card border border-line-inverse p-7 lg:min-h-[52vh] lg:w-[min(30rem,34vw)] lg:p-8 xl:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-[clamp(4rem,8vw,7.5rem)] leading-none font-extrabold text-outline-paper">
                  {item.step}
                </span>
                <span
                  data-method-ink
                  aria-hidden
                  className={cn(
                    "h-12 w-12 rounded-full lg:h-16 lg:w-16",
                    inkBg[item.ink],
                    inkGlow[item.ink],
                  )}
                />
              </div>
              <div className="mt-10 lg:mt-8">
                <h3 className="font-display text-h3 font-bold">{item.title}</h3>
                <p className="mt-4 max-w-sm text-paper/70">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="container-x mt-10 hidden lg:block">
          <div className="h-px w-full bg-line-inverse">
            <div
              data-method-progress
              className="h-px origin-left bg-magenta"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
