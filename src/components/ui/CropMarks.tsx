import { cn } from "@/lib/cn";

type CropMarksProps = {
  className?: string;
  size?: number;
  offset?: number;
};

/** Printer's crop marks drawn on the four corners of the parent (needs `relative`). */
export function CropMarks({ className, size = 18, offset = -10 }: CropMarksProps) {
  const corners = [
    { top: offset, left: offset, rotate: 0 },
    { top: offset, right: offset, rotate: 90 },
    { bottom: offset, right: offset, rotate: 180 },
    { bottom: offset, left: offset, rotate: 270 },
  ];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {corners.map(({ rotate, ...pos }, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 18 18"
          className="absolute"
          style={{ ...pos, transform: `rotate(${rotate}deg)` }}
        >
          <path d="M0 8H6M8 0V6" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      ))}
    </div>
  );
}
