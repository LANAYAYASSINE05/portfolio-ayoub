import { colors, neonColors, swissColors, ease } from "@/lib/tokens";

export type Theme = "print" | "neon" | "swiss";

export const THEMES: Theme[] = ["print", "neon", "swiss"];

export const DEFAULT_THEME: Theme = "print";

export const THEME_STORAGE_KEY = "amensar-theme";

export const themes: Record<Theme, { label: string; name: string; themeColor: string }> = {
  print: { label: "Print", name: "Prépresse", themeColor: colors.paper },
  neon: { label: "Néon", name: "Studio néon", themeColor: neonColors.paper },
  swiss: { label: "Swiss", name: "Style suisse", themeColor: swissColors.paper },
};

/** Runs in <head> before first paint so a saved theme never flashes the default one. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="neon"||t==="swiss")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const isTheme = (value: unknown): value is Theme => THEMES.includes(value as Theme);

export function readTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  return isTheme(t) ? t : DEFAULT_THEME;
}

export function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(t) ? t : null;
  } catch {
    return null;
  }
}

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themes[theme].themeColor);
}

export function syncStoredTheme() {
  const t = storedTheme();
  if (t && t !== readTheme()) apply(t);
}

/** Switches theme with a circular reveal from `origin` (View Transitions API when available). */
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable */
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced) {
    apply(theme);
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  // Each system has its own layout: let React commit the swap before the snapshot.
  const transition = document.startViewTransition(async () => {
    apply(theme);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 900, easing: ease.inOut.css, pseudoElement: "::view-transition-new(root)" },
    );
  });
}
