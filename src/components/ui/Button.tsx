"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/tokens";

type Variant = "primary" | "ink" | "outline" | "ghost";
type Size = "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  download?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  magnetic?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "hard hard-lift bg-yellow text-key hover:bg-magenta prepress:bg-magenta prepress:text-paper swiss:bg-magenta swiss:text-paper swiss:hover:bg-ink neon:bg-yellow neon:glow-yellow neon:hover:bg-ink",
  ink: "hard hard-lift bg-ink text-paper hover:bg-cyan hover:text-key prepress:hover:bg-ink prepress:hover:text-paper swiss:hover:bg-magenta swiss:hover:text-paper neon:text-key neon:hover:bg-magenta",
  outline:
    "hard hard-lift bg-paper text-ink hover:bg-cyan hover:text-key prepress:border prepress:border-current prepress:bg-transparent prepress:text-current prepress:hover:bg-transparent prepress:hover:text-paper swiss:bg-transparent swiss:text-current swiss:shadow-[inset_0_0_0_1.5px_currentColor] swiss:hover:bg-ink swiss:hover:text-paper neon:bg-ink/5 neon:backdrop-blur-xl neon:hover:bg-magenta",
  ghost: "text-current underline-offset-4 hover:underline",
};

/** Prépresse keeps its ink-fill hover: a second plate rises from the bottom. */
const fills: Record<Variant, string> = {
  primary: "bg-ink",
  ink: "bg-magenta",
  outline: "bg-ink",
  ghost: "",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-sm [--hard-k:0.8]",
  lg: "h-16 px-9 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  download,
  type = "button",
  disabled,
  onClick,
  className,
  magnetic = true,
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(0), spring.magnetic);
  const y = useSpring(useMotionValue(0), spring.magnetic);

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || !ref.current || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-bold tracking-tight prepress:font-semibold",
    "swiss:rounded-none swiss:font-medium swiss:tracking-[-0.01em]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 hidden origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-y-100 prepress:block",
            fills[variant],
          )}
        />
      )}
      <span className="relative inline-flex items-center gap-3">{children}</span>
    </>
  );

  const shared = {
    onPointerMove: onMove,
    onPointerLeave: reset,
    style: { x, y },
    className: classes,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        data-cursor="hover"
        {...shared}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-cursor="hover"
      {...shared}
    >
      {content}
    </motion.button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn("h-4 w-4", className)}>
      <path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
    </svg>
  );
}
