"use client";

import { useEffect, type RefObject } from "react";
import { createScope, type Scope } from "animejs";

type Cleanup = void | (() => void);

/**
 * Runs an anime.js setup once the element enters the viewport.
 * Animations created inside `setup` are bound to an anime.js Scope and
 * reverted on unmount; `setup` may also return its own cleanup.
 */
export function useAnimeInView(
  ref: RefObject<HTMLElement | null>,
  setup: (root: HTMLElement) => Cleanup,
  { threshold = 0.25 }: { threshold?: number } = {},
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let scope: Scope | null = null;
    let cleanup: Cleanup;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        scope = createScope({ root }).add(() => {
          cleanup = setup(root);
        });
      },
      { threshold },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      if (typeof cleanup === "function") cleanup();
      scope?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, threshold]);
}
