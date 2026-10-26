import { cn } from "@/lib/cn";

/** Registration target. Paths carry `data-draw` so anime.js can draw them. */
export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={cn("overflow-visible", className)}>
      <circle data-draw cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" />
      <circle data-draw cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="1.5" />
      <path data-draw d="M50 4V96" stroke="currentColor" strokeWidth="1.5" />
      <path data-draw d="M4 50H96" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
