"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { education } from "@/data/profile";
import { duration, ease, spring } from "@/lib/tokens";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CropMarks } from "@/components/ui/CropMarks";

const accents = ["bg-cyan", "bg-magenta", "bg-yellow"];
const accentGlow = ["text-cyan", "text-magenta", "text-yellow"];

function EducationCard({ item, index }: { item: (typeof education)[number]; index: number }) {
  const rx = useSpring(useMotionValue(0), spring.gentle);
  const ry = useSpring(useMotionValue(0), spring.gentle);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.55), transparent 55%)`;

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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: duration.slow, ease: ease.out.motion, delay: index * 0.12 }}
      style={{ perspective: 1000 }}
      className="relative text-ink/30"
    >
      <CropMarks />
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        data-cursor
        className="relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[4px] bg-paper-dim p-7 text-ink shadow-[0_30px_60px_-35px_rgba(13,13,13,0.45)] md:p-9"
      >
        <motion.span aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: glare }} />
        <div className="relative flex items-start justify-between">
          <span
            className={`h-10 w-10 rounded-full ${accents[index % accents.length]} mix-blend-multiply ${accentGlow[index % accentGlow.length]}`}
          />
          <span className="label text-muted">{item.period}</span>
        </div>
        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <p className="label mb-3 text-magenta">{item.school}</p>
          <h3 className="font-display text-h3 font-bold">{item.degree}</h3>
          <p className="mt-4 text-ink-soft">{item.note}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-section">
      <div className="container-x">
        <SectionHeading
          index="05"
          kicker="Formation"
          title="Un parcours tourné vers l’image."
          description="De l’infographie technique à la communication visuelle : une formation construite pour concevoir et produire."
        />
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {education.map((item, i) => (
            <EducationCard key={item.degree} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
