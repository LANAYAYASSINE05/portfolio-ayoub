"use client";

import { useId, useLayoutEffect } from "react";
import { motion } from "motion/react";
import { Grid3x3, Printer, Sparkles } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { setTheme, syncStoredTheme, themes, type Theme } from "@/lib/theme";
import { useTheme } from "@/lib/use-theme";
import { spring } from "@/lib/tokens";

const options: { id: Theme; Icon: typeof Printer }[] = [
  { id: "print", Icon: Printer },
  { id: "neon", Icon: Sparkles },
  { id: "swiss", Icon: Grid3x3 },
];

export function ThemeToggle({ withLabels = false, className }: { withLabels?: boolean; className?: string }) {
  const theme = useTheme();
  const thumbId = useId();

  // React resets <html> attributes on the dev Strict Mode remount; re-apply the saved choice.
  useLayoutEffect(syncStoredTheme, []);

  const choose = (next: Theme, e: React.MouseEvent<HTMLButtonElement>) => {
    if (next === theme) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTheme(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    document.fonts.ready.then(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
  };

  return (
    <div
      role="radiogroup"
      aria-label="Design system"
      className={cn(
        "hard relative flex h-10 items-center rounded-full bg-paper p-0.5 [--hard-k:0.6]",
        "prepress:border prepress:border-ink/15 prepress:bg-transparent prepress:p-1 neon:bg-ink/5 neon:backdrop-blur-xl swiss:rounded-none swiss:bg-transparent swiss:p-0",
        className,
      )}
    >
      {options.map(({ id, Icon }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`Design system ${themes[id].name}`}
            title={themes[id].name}
            onClick={(e) => choose(id, e)}
            className={cn(
              "relative flex h-8 items-center justify-center gap-1.5 rounded-full text-xs font-bold transition-colors duration-300 prepress:font-semibold swiss:h-10 swiss:rounded-none swiss:font-medium",
              withLabels ? "px-3.5" : "w-9",
              active ? "text-key prepress:text-paper swiss:text-paper" : "text-ink-soft hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={thumbId}
                transition={spring.snappy}
                className="absolute inset-0 rounded-full bg-magenta ring-2 ring-ink prepress:bg-ink prepress:ring-0 neon:bg-yellow neon:ring-0 neon:glow-yellow swiss:rounded-none swiss:bg-magenta swiss:ring-0"
              />
            )}
            <Icon aria-hidden className="relative h-4 w-4" strokeWidth={2.2} />
            {withLabels && <span className="relative">{themes[id].label}</span>}
          </button>
        );
      })}
    </div>
  );
}
