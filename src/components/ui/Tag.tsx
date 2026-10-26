import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  tone?: "outline" | "ink" | "paper" | "magenta" | "cyan" | "yellow";
  className?: string;
};

const tones: Record<NonNullable<TagProps["tone"]>, string> = {
  outline:
    "bg-paper text-ink prepress:bg-transparent prepress:text-current prepress:ring-1 prepress:ring-current/25 prepress:ring-inset swiss:bg-transparent neon:bg-ink/5 neon:backdrop-blur-xl",
  ink: "bg-ink text-paper neon:border-magenta/45 neon:bg-magenta/15 neon:text-magenta",
  paper: "bg-paper text-ink",
  magenta: "bg-magenta text-key prepress:text-paper neon:border-transparent neon:glow-magenta",
  cyan: "bg-cyan text-key neon:border-transparent neon:glow-cyan",
  yellow: "bg-yellow text-key neon:border-transparent neon:glow-yellow",
};

export function Tag({ children, tone = "outline", className }: TagProps) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2 rounded-full border-2 border-ink px-3.5 py-2 font-medium whitespace-nowrap",
        "prepress:border-0 prepress:font-normal swiss:rounded-none swiss:border-[1.5px] swiss:border-current swiss:font-normal neon:border neon:border-ink/12",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
