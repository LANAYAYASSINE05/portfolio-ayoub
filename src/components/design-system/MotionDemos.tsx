"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { animate as animeAnimate, stagger as animeStagger, type JSAnimation } from "animejs";
import { gsap, useGSAP } from "@/lib/gsap";
import { duration, ease, ms, spring } from "@/lib/tokens";

function DemoCard({
  library,
  title,
  usage,
  onReplay,
  children,
}: {
  library: string;
  title: string;
  usage: string;
  onReplay: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="flex h-56 items-center justify-center border-b-[2.5px] border-ink bg-paper-dim p-6 neon:border-b neon:border-line">
        {children}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="label font-medium text-magenta">{library}</span>
          <button
            type="button"
            onClick={onReplay}
            className="hard hard-lift label rounded-full bg-paper px-3 py-2 font-medium [--hard-k:0.5] hover:bg-yellow hover:text-key neon:bg-ink/5"
          >
            Rejouer ↺
          </button>
        </div>
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="text-sm text-ink-soft">{usage}</p>
      </div>
    </div>
  );
}

function GsapDemo() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ defaults: { ease: ease.out.gsap, duration: duration.slow } })
        .from("[data-g='bar']", { scaleY: 0, transformOrigin: "bottom", stagger: 0.08 })
        .from("[data-g='dot']", { scale: 0, ease: "back.out(3)", duration: duration.base }, "-=0.5")
        .to(
          "[data-g='bar']",
          {
            backgroundColor: (i: number) =>
              getComputedStyle(root.current!).getPropertyValue(
                ["--color-cyan", "--color-magenta", "--color-yellow", "--color-ink"][i],
              ),
            stagger: 0.06,
          },
          "-=0.3",
        );
    },
    { scope: root },
  );

  return (
    <DemoCard
      library="GSAP · timeline"
      title="Séquences & scroll"
      usage="Hero, titres de section, timeline d’expérience, méthode en scroll horizontal épinglé, marquee, curseur."
      onReplay={() => tl.current?.restart()}
    >
      <div ref={root} className="flex h-full items-end gap-3">
        {[96, 136, 72, 160].map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span data-g="dot" className="h-3 w-3 rounded-full bg-ink" />
            <span data-g="bar" className="block w-10 rounded-t-md bg-ink/20" style={{ height: h }} />
          </div>
        ))}
      </div>
    </DemoCard>
  );
}

function MotionDemo() {
  const [on, setOn] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <DemoCard
      library="Motion · spring & layout"
      title="Interactions & états"
      usage="Header et menu, bouton magnétique, filtres de projets (layout), cartes 3D, formulaire de contact."
      onReplay={() => {
        setKey((k) => k + 1);
        setOn(false);
      }}
    >
      <div key={key} className="flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          aria-pressed={on}
          className={`flex h-14 w-28 items-center rounded-full p-1.5 transition-colors duration-500 ${on ? "justify-end bg-magenta" : "justify-start bg-ink/15"}`}
        >
          <motion.span layout transition={spring.snappy} className="h-11 w-11 rounded-full bg-paper shadow-md" />
        </button>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...spring.gentle, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.1 }}
              className={`h-10 w-10 rounded-full ${["bg-cyan", "bg-magenta", "bg-yellow"][i]} mix-blend-multiply`}
            />
          ))}
        </div>
      </div>
    </DemoCard>
  );
}

function AnimeDemo() {
  const root = useRef<HTMLDivElement>(null);
  const anim = useRef<JSAnimation | null>(null);

  const play = () => {
    if (!root.current) return;
    anim.current?.revert();
    anim.current = animeAnimate(root.current.querySelectorAll("[data-a]"), {
      scale: [0.2, 1],
      rotate: [90, 0],
      opacity: [0, 1],
      duration: ms(duration.slow),
      delay: animeStagger(45, { grid: [6, 4], from: "center" }),
      ease: ease.out.anime,
    });
  };

  useEffect(() => {
    play();
    return () => {
      anim.current?.revert();
    };
  }, []);

  return (
    <DemoCard
      library="anime.js · stagger & SVG"
      title="Grilles & tracés"
      usage="Grille d’outils (stagger depuis le centre), titres splittés des compétences, compteurs, marque de repérage tracée."
      onReplay={play}
    >
      <div ref={root} className="grid grid-cols-6 gap-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            data-a
            className={`h-6 w-6 rounded-[5px] ${["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"][(i + Math.floor(i / 6)) % 4]}`}
          />
        ))}
      </div>
    </DemoCard>
  );
}

export function MotionDemos() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <GsapDemo />
      <MotionDemo />
      <AnimeDemo />
    </div>
  );
}

export function EasingCurve({ name, bezier }: { name: string; bezier: [number, number, number, number] }) {
  const [x1, y1, x2, y2] = bezier;
  const path = `M0,100 C${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`;
  return (
    <div className="card p-5">
      <svg viewBox="-10 -10 120 120" className="h-32 w-full" aria-hidden>
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--color-line)" />
        <line x1="0" y1="100" x2={x1 * 100} y2={100 - y1 * 100} stroke="var(--color-magenta)" strokeDasharray="2 2" />
        <line x1="100" y1="0" x2={x2 * 100} y2={100 - y2 * 100} stroke="var(--color-magenta)" strokeDasharray="2 2" />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: bezier }}
        />
      </svg>
      <p className="mt-3 font-display text-lg font-bold">{name}</p>
      <p className="font-mono text-xs text-muted">cubic-bezier({bezier.join(", ")})</p>
    </div>
  );
}
