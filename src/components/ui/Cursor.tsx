"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Two-part cursor (GSAP quickTo). Hidden on touch devices and with reduced motion. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
      let shown = false;

      const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
      const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
      const ringX = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
      const ringY = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

      const move = (e: PointerEvent) => {
        if (!shown) {
          shown = true;
          gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
          gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
        }
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };

      const over = (e: PointerEvent) => {
        const interactive = Boolean((e.target as HTMLElement).closest("a, button, [data-cursor]"));
        ring.current!.toggleAttribute("data-active", interactive);
        gsap.to(ring.current, { scale: interactive ? 1.9 : 1, duration: 0.35, ease: "expo.out" });
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerover", over);
      return () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", over);
      };
    });
  });

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none invisible fixed top-0 left-0 z-[100] h-10 w-10 rounded-full border-2 border-ink mix-blend-multiply transition-colors duration-300 data-active:bg-yellow prepress:border prepress:border-ink/55 prepress:data-active:border-transparent prepress:data-active:bg-magenta/85 swiss:rounded-none swiss:border-[1.5px] swiss:data-active:border-transparent swiss:data-active:bg-magenta/85 neon:border neon:border-cyan/60 neon:data-active:border-transparent neon:data-active:bg-magenta/40 neon:data-active:glow-magenta"
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none invisible fixed top-0 left-0 z-[101] h-2 w-2 rotate-45 bg-magenta outline-2 outline-ink prepress:h-1.5 prepress:w-1.5 prepress:rotate-0 prepress:rounded-full prepress:outline-0 swiss:rotate-0 swiss:outline-0 neon:h-1.5 neon:w-1.5 neon:rotate-0 neon:rounded-full neon:bg-yellow neon:outline-0 neon:shadow-[0_0_10px_2px_rgb(198_255_61_/_0.7)]"
      />
    </>
  );
}
