import { Layers, LayoutTemplate, Printer, ScanLine, Scissors, Signpost, type LucideIcon } from "lucide-react";
import type { ToolIcon as ToolIconName } from "@/data/profile";
import { cn } from "@/lib/cn";
import { IllustratorLogo, InDesignLogo, PhotoshopLogo } from "./BrandLogos";

const adobe = {
  photoshop: PhotoshopLogo,
  illustrator: IllustratorLogo,
  indesign: InDesignLogo,
} as const;

const craft: Record<Exclude<ToolIconName, keyof typeof adobe>, LucideIcon> = {
  layout: LayoutTemplate,
  imposition: Layers,
  plate: ScanLine,
  printer: Printer,
  laser: Scissors,
  signage: Signpost,
};

export function isAdobe(name: ToolIconName): name is keyof typeof adobe {
  return name in adobe;
}

/** Adobe apps use their official logo (tile included); craft skills get a stroked icon on an ink tile. */
export function ToolIcon({ name, className }: { name: ToolIconName; className?: string }) {
  if (isAdobe(name)) {
    const Logo = adobe[name];
    return <Logo className={cn("h-full w-full", className)} />;
  }
  const Icon = craft[name];
  return <Icon aria-hidden strokeWidth={1.75} className={cn("h-1/2 w-1/2", className)} />;
}
