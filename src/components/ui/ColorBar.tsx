import { cn } from "@/lib/cn";

const swatches = [
  "bg-cyan",
  "bg-magenta",
  "bg-yellow",
  "bg-key",
  "bg-cyan/60",
  "bg-magenta/60",
  "bg-yellow/60",
  "bg-key/60",
  "bg-cyan/25",
  "bg-magenta/25",
  "bg-yellow/25",
  "bg-key/25",
];

/** Print control strip (CMYK density patches). */
export function ColorBar({ className, compact = false }: { className?: string; compact?: boolean }) {
  const items = compact ? swatches.slice(0, 4) : swatches;
  return (
    <div aria-hidden className={cn("flex", className)}>
      {items.map((swatch, i) => (
        <span key={i} className={cn("block h-3 w-3 sm:h-3.5 sm:w-3.5", swatch)} />
      ))}
    </div>
  );
}
