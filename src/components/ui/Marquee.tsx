"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: string[];
  className?: string;
  speed?: number;
  separator?: React.ReactNode;
};

/** Infinite GSAP marquee that speeds up with scroll velocity. */
export function Marquee({ items, className, speed = 40, separator = "✺" }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(el, { xPercent: -50, duration: speed, ease: "none", repeat: -1 });
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 400);
            gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
          },
        });
        return () => {
          loop.kill();
          st.kill();
        };
      });
    },
    { scope: root },
  );

  const sequence = [...items, ...items];

  return (
    <div ref={root} className={cn("overflow-hidden whitespace-nowrap", className)} aria-hidden>
      <div ref={track} className="inline-flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {sequence.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="px-6 md:px-10">{item}</span>
                <span className="text-magenta [-webkit-text-stroke:2px_var(--color-key)] prepress:[-webkit-text-stroke:0] swiss:[-webkit-text-stroke:0] neon:[-webkit-text-stroke:0]">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
