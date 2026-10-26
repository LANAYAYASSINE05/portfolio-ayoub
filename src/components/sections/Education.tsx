"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease, spring } from "@/lib/tokens";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tones = [
  "[--card-bg:var(--color-cyan)] neon:[--neon-card-bg:rgb(62_230_255_/_0.06)]",
  "[--card-bg:var(--color-magenta)] neon:[--neon-card-bg:rgb(166_107_255_/_0.08)]",
  "[--card-bg:var(--color-yellow)] neon:[--neon-card-bg:rgb(198_255_61_/_0.06)]",
];

/** Deterministic bar widths so server and client render the same barcode. */
const barcode = [3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1];

function EducationTicket({ item, index }: { item: (typeof education)[number]; index: number }) {
  const rx = useSpring(useMotionValue(0), spring.gentle);
  const ry = useSpring(useMotionValue(0), spring.gentle);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.35), transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 12);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, rotate: index % 2 ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: duration.slow, ease: ease.out.motion, delay: index * 0.12 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        data-cursor
        className={cn("card relative flex h-full flex-col text-key neon:text-ink", tones[index % tones.length])}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ backgroundImage: glare }}
        />

        <div className="relative flex flex-1 flex-col gap-8 p-6 md:p-8" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink bg-paper text-ink neon:rounded-full neon:border-ink/15 neon:bg-ink/5 neon:text-cyan">
              <GraduationCap aria-hidden className="h-6 w-6" strokeWidth={2} />
            </span>
            <span className="label font-medium">Ticket N°0{index + 1}</span>
          </div>
          <div className="mt-auto">
            <p className="label mb-3 font-medium opacity-75">{item.school}</p>
            <h3 className="font-display text-h3 font-extrabold neon:font-semibold">{item.degree}</h3>
            <p className="mt-3 opacity-80">{item.note}</p>
          </div>
        </div>

        <div aria-hidden className="relative h-0 border-t-[3px] border-dashed border-ink neon:border-t neon:border-ink/20">
          <span className="absolute -top-3.5 -left-3.5 h-7 w-7 rounded-full border-[2.5px] border-ink bg-paper neon:border-ink/15" />
          <span className="absolute -top-3.5 -right-3.5 h-7 w-7 rounded-full border-[2.5px] border-ink bg-paper neon:border-ink/15" />
        </div>

        <div className="relative flex items-end justify-between gap-4 px-6 py-5 md:px-8">
          <div>
            <p className="label mb-1.5 opacity-70">Période</p>
            <p className="font-display text-lg font-extrabold neon:font-semibold">{item.period}</p>
          </div>
          <div aria-hidden className="flex h-10 items-stretch gap-[2px]">
            {barcode.map((w, i) => (
              <span key={i} className="bg-current" style={{ width: w * 1.5 }} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Education() {
  return (
    <section id="education" className="relative overflow-x-clip py-section">
      <div className="container-x">
        <SectionHeading
          index="05"
          kicker="Formation"
          title="Un parcours tourné vers l’image."
          description="De l’infographie technique à la communication visuelle : une formation construite pour concevoir et produire."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {education.map((item, i) => (
            <EducationTicket key={item.degree} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
