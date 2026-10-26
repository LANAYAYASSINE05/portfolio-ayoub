/**
 * JS mirror of the design tokens declared in globals.css (@theme).
 * Keep both files in sync: CSS drives Tailwind utilities, this file drives
 * GSAP, Motion and anime.js so every library shares the same rhythm.
 */

/** Prépresse (default system). */
export const colors = {
  paper: "#f3efe7",
  paperDim: "#e7e1d4",
  ink: "#0d0d0d",
  inkSoft: "#2a2826",
  muted: "#6f6a62",
  cyan: "#00a0e3",
  magenta: "#e5007d",
  yellow: "#ffdd00",
  key: "#0d0d0d",
} as const;

export const processInks = [
  { name: "Cyan", token: "cyan", hex: colors.cyan, cmyk: "100 · 0 · 0 · 0" },
  { name: "Magenta", token: "magenta", hex: colors.magenta, cmyk: "0 · 100 · 0 · 0" },
  { name: "Yellow", token: "yellow", hex: colors.yellow, cmyk: "0 · 0 · 100 · 0" },
  { name: "Key", token: "key", hex: colors.key, cmyk: "0 · 0 · 0 · 100" },
] as const;

/** Studio néon values for the same token names (see `[data-theme="neon"]` in globals.css). */
export const neonColors = {
  paper: "#07070c",
  paperDim: "#0f0f18",
  ink: "#f1f0fa",
  inkSoft: "#bdbbd2",
  muted: "#84819c",
  cyan: "#3ee6ff",
  magenta: "#a66bff",
  yellow: "#c6ff3d",
  key: "#07070c",
} as const;

export const neonLights = [
  { name: "Violet", token: "magenta", hex: neonColors.magenta, role: "Accent principal" },
  { name: "Acid lime", token: "yellow", hex: neonColors.yellow, role: "Action · CTA" },
  { name: "Cyan", token: "cyan", hex: neonColors.cyan, role: "Contours lumineux" },
  { name: "Night", token: "key", hex: neonColors.key, role: "Texte sur lumière" },
] as const;

/** Swiss values for the same token names (see `[data-theme="swiss"]` in globals.css). */
export const swissColors = {
  paper: "#f3eddf",
  paperDim: "#e7dfcc",
  ink: "#13211a",
  inkSoft: "#33433a",
  muted: "#6f7a70",
  cyan: "#6f8f74",
  magenta: "#1e5a3c",
  yellow: "#d9b45a",
  key: "#13211a",
} as const;

export const swissInks = [
  { name: "Vert sapin", token: "magenta", hex: swissColors.magenta, role: "Accent unique · chiffres, actions" },
  { name: "Encre forêt", token: "key", hex: swissColors.key, role: "Texte, filets, aplats" },
  { name: "Sauge", token: "cyan", hex: swissColors.cyan, role: "Teinte secondaire · rare" },
  { name: "Ocre", token: "yellow", hex: swissColors.yellow, role: "Sélection · rare" },
] as const;

/** Durations in seconds (GSAP / Motion). Use `ms()` for anime.js. */
export const duration = {
  instant: 0.15,
  fast: 0.3,
  base: 0.6,
  slow: 1.1,
  slower: 1.6,
} as const;

export const ms = (seconds: number) => Math.round(seconds * 1000);

/** One easing language, three dialects. */
export const ease = {
  out: {
    css: "cubic-bezier(0.16, 1, 0.3, 1)",
    motion: [0.16, 1, 0.3, 1] as [number, number, number, number],
    gsap: "expo.out",
    anime: "outExpo",
  },
  inOut: {
    css: "cubic-bezier(0.87, 0, 0.13, 1)",
    motion: [0.87, 0, 0.13, 1] as [number, number, number, number],
    gsap: "expo.inOut",
    anime: "inOutExpo",
  },
  soft: {
    css: "cubic-bezier(0.22, 1, 0.36, 1)",
    motion: [0.22, 1, 0.36, 1] as [number, number, number, number],
    gsap: "power3.out",
    anime: "outCubic",
  },
} as const;

export const spring = {
  snappy: { type: "spring", stiffness: 420, damping: 32, mass: 0.6 },
  gentle: { type: "spring", stiffness: 160, damping: 22 },
  magnetic: { type: "spring", stiffness: 260, damping: 18, mass: 0.4 },
} as const;

export const stagger = {
  tight: 0.03,
  base: 0.07,
  loose: 0.14,
} as const;
