"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import type { Theme } from "@/lib/theme";
import { useTheme } from "@/lib/use-theme";

/**
 * Each design system has its own composition: Prépresse is editorial, Studio néon is a bento
 * grid and Style suisse is a horizontal story. Only the active tree is mounted.
 */
export function ThemedLayout(layouts: Record<Theme, ReactNode>) {
  const theme = useTheme();

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [theme]);

  return (
    <div key={theme} data-layout={theme}>
      {layouts[theme]}
    </div>
  );
}
