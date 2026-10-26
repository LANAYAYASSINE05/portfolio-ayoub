"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { methodology } from "@/data/profile";
import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Ink = (typeof methodology)[number]["ink"];

const cardTone: Record<Ink, string> = {
  cyan: "[--card-bg:var(--color-cyan)]",
  magenta: "[--card-bg:var(--color-magenta)]",
  yellow: "[--card-bg:var(--color-yellow)]",
  key: "[--card-bg:var(--color-paper)]",
};

const dotTone: Record<Ink, string> = {
  cyan: "neon:bg-cyan neon:text-cyan",
  magenta: "neon:bg-magenta neon:text-magenta",
  yellow: "neon:bg-yellow neon:text-yellow",
  key: "neon:bg-paper neon:text-paper",
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

        gsap.utils.toArray<HTMLElement>("[data-method-card]").forEach((card, i) => {
          gsap.from(card, {
            rotate: i % 2 ? 6 : -6,
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 100%",
              end: "left 55%",
              scrub: true,
            },
          });
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
          className="flex flex-col gap-5 px-[var(--spacing-gutter)] lg:w-max lg:flex-row lg:gap-8 lg:pr-[30vw]"
        >
          {methodology.map((item) => (
            <article
              key={item.step}
              data-method-card
              className={cn(
                "card relative flex flex-col justify-between p-7 text-key [--hard-c:var(--color-paper)] neon:text-paper lg:min-h-[52vh] lg:w-[min(30rem,34vw)] lg:p-8 xl:p-10",
                cardTone[item.ink],
              )}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-[clamp(4rem,8vw,7.5rem)] leading-none font-extrabold text-outline-ink">
                  {item.step}
                </span>
                <span
                  data-method-ink
                  aria-hidden
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full bg-ink lg:h-16 lg:w-16",
                    "neon:opacity-90 neon:shadow-[0_0_40px_4px_currentColor]",
                    dotTone[item.ink],
                  )}
                >
                  <span className="h-3 w-3 rotate-45 bg-paper neon:hidden" />
                </span>
              </div>
              <div className="mt-10 lg:mt-8">
                <h3 className="font-display text-h3 font-extrabold neon:font-bold">{item.title}</h3>
                <p className="mt-4 max-w-sm opacity-80">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="container-x mt-10 hidden lg:block">
          <div className="h-3 w-full overflow-hidden rounded-full border-2 border-paper neon:h-px neon:border-0 neon:bg-line-inverse">
            <div
              data-method-progress
              className="h-full origin-left bg-yellow neon:h-[2px] neon:bg-gradient-to-r neon:from-magenta neon:via-cyan neon:to-yellow neon:shadow-[0_0_12px_rgb(62_230_255_/_0.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
