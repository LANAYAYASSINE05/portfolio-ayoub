import { cn } from "@/lib/cn";

type StickerProps = {
  children: React.ReactNode;
  tone?: "yellow" | "magenta" | "cyan" | "paper";
  className?: string;
};

const tones: Record<NonNullable<StickerProps["tone"]>, string> = {
  yellow: "bg-yellow neon:glow-yellow",
  magenta: "bg-magenta neon:glow-magenta",
  cyan: "bg-cyan neon:glow-cyan",
  paper: "bg-paper text-ink! neon:bg-ink/10 neon:backdrop-blur-xl",
};

/** Tilted label slapped on a card. Néon straightens it into a glowing pill. */
export function Sticker({ children, tone = "yellow", className }: StickerProps) {
  return (
    <span
      className={cn(
        "hard inline-flex -rotate-6 items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-extrabold tracking-tight text-key uppercase [--hard-k:0.6]",
        "swiss:rotate-0 swiss:rounded-none swiss:font-semibold swiss:tracking-normal swiss:normal-case neon:rotate-0 neon:font-semibold neon:normal-case",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
