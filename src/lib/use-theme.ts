"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, readTheme, subscribeTheme, type Theme } from "@/lib/theme";

const getServerTheme = (): Theme => DEFAULT_THEME;

/** Active design system, read from <html data-theme>. Renders the default on the server. */
export function useTheme() {
  return useSyncExternalStore(subscribeTheme, readTheme, getServerTheme);
}
