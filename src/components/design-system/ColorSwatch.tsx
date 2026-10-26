"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/tokens";

type ColorSwatchProps = {
  name: string;
  token: string;
  hex: string;
  meta?: string;
  className?: string;
};

/** Relative luminance (WCAG) — picks dark or light text so any swatch stays readable in both themes. */
function isLight(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.3;
}

export function ColorSwatch({ name, token, hex, meta, className }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={spring.snappy}
      className={cn(
        "hard relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-card p-5 text-left",
        className,
      )}
      style={{ backgroundColor: hex, color: isLight(hex) ? "#0b0b0b" : "#fff6e6" }}
      aria-label={`Copier ${hex}`}
    >
      <span className="label opacity-70">--color-{token}</span>
      <span>
        <span className="block font-display text-2xl font-bold">{name}</span>
        <span className="mt-1 block font-mono text-sm uppercase opacity-80">{hex}</span>
        {meta && <span className="label mt-2 block opacity-60">{meta}</span>}
      </span>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="label absolute top-4 right-4 rounded-full bg-paper px-3 py-1.5 text-ink"
          >
            Copié
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
