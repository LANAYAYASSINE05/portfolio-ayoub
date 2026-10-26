"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Download } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { BrandIcon } from "@/components/icons/BrandLogos";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { useTheme } from "@/lib/use-theme";
import { duration, ease, spring } from "@/lib/tokens";

export function Header({ basePath = "" }: { basePath?: string }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  // Each system renders its own section tree: re-observe after a switch.
  const theme = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 240 && !open);
    setScrolled(latest > 24);
  });

  useEffect(() => {
    if (basePath) return;
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [basePath, theme]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 80rem)");
    const close = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  const links = navItems.filter((item) => item.id !== "hero");

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: duration.base, ease: ease.out.motion }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
      >
        <div
          className={cn(
            "hard mx-auto flex h-14 max-w-[96rem] items-center justify-between rounded-full bg-paper pr-2 pl-2.5 [--hard-k:0.8] prepress:pl-5 swiss:rounded-none swiss:pl-4",
            "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
            scrolled || open
              ? "prepress:bg-paper/80 prepress:shadow-[0_1px_0_var(--color-line)] prepress:backdrop-blur-xl neon:bg-paper/60 neon:backdrop-blur-xl swiss:shadow-[0_2px_0_var(--color-ink)]"
              : "prepress:bg-transparent neon:border-transparent neon:bg-transparent swiss:shadow-[0_2px_0_var(--color-ink)]",
          )}
        >
          <a href={`${basePath}#hero`} className="group flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="relative hidden h-7 w-7 items-center justify-center prepress:flex">
              <span className="absolute h-4 w-4 -translate-x-1 rounded-full bg-cyan mix-blend-multiply" />
              <span className="absolute h-4 w-4 translate-x-1 rounded-full bg-magenta mix-blend-multiply" />
              <span className="absolute h-4 w-4 translate-y-1.5 rounded-full bg-yellow mix-blend-multiply" />
            </span>
            <span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-[0.6rem] border-2 border-ink bg-magenta font-display text-lg font-extrabold text-key transition-transform duration-300 group-hover:rotate-6 prepress:hidden swiss:rotate-0 swiss:rounded-none swiss:border-0 swiss:bg-magenta swiss:text-paper swiss:group-hover:rotate-0 neon:rotate-0 neon:rounded-full neon:border-0 neon:bg-yellow neon:glow-yellow">
              A
            </span>
            <span className="font-display text-base font-extrabold tracking-tight prepress:font-bold swiss:font-bold swiss:tracking-[-0.03em] neon:font-bold">
              {profile.firstName.toUpperCase()}
              <span className="text-magenta">.</span>
            </span>
          </a>

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {links.map((item) => (
                <li key={item.id}>
                  <a
                    href={`${basePath}#${item.id}`}
                    className="relative block rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap"
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={spring.snappy}
                        className="absolute inset-0 rounded-full border-2 border-ink bg-yellow prepress:border-0 prepress:bg-ink swiss:rounded-none swiss:border-0 swiss:bg-magenta neon:border-0 neon:bg-magenta/20 neon:shadow-[inset_0_0_0_1px_rgb(166_107_255_/_0.6),0_0_24px_-6px_rgb(166_107_255_/_0.8)]"
                      />
                    )}
                    <span
                      className={cn(
                        "relative font-semibold transition-colors duration-300 prepress:font-medium",
                        active === item.id
                          ? "text-key prepress:text-paper swiss:text-paper neon:text-ink"
                          : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.cv}
              download={profile.cvFileName}
              aria-label="Télécharger le CV (PDF)"
              className="hard hard-lift hidden h-10 items-center gap-2 rounded-full bg-paper px-4 text-sm font-bold [--hard-k:0.6] hover:bg-cyan hover:text-key prepress:border prepress:border-ink/15 prepress:bg-transparent prepress:font-semibold prepress:hover:border-ink prepress:hover:bg-ink prepress:hover:text-paper swiss:rounded-none swiss:shadow-[inset_0_0_0_1.5px_var(--color-ink)] swiss:hover:bg-ink swiss:hover:text-paper neon:bg-ink/5 neon:hover:bg-cyan/10 neon:hover:text-cyan md:inline-flex"
            >
              <Download aria-hidden className="h-4 w-4" />
              CV
            </a>
            <a
              href={`${basePath}#contact`}
              className="hard hard-lift hidden h-10 items-center gap-2 rounded-full bg-magenta px-5 text-sm font-bold text-key [--hard-k:0.6] hover:bg-yellow prepress:bg-ink prepress:font-semibold prepress:text-paper prepress:hover:bg-magenta swiss:rounded-none swiss:bg-ink swiss:text-paper swiss:hover:bg-magenta neon:bg-yellow neon:glow-yellow neon:hover:bg-ink lg:inline-flex xl:hidden 2xl:inline-flex"
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-full border-2 border-ink bg-[#3ddc84] prepress:h-2 prepress:w-2 prepress:border-0 swiss:rounded-none swiss:border-0 neon:border-0 neon:bg-key" />
              Disponible
            </a>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="hard relative flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-key [--hard-k:0.6] prepress:bg-ink prepress:text-paper swiss:rounded-none swiss:bg-ink swiss:text-paper neon:bg-ink/10 neon:text-ink xl:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                className="absolute h-[2.5px] w-4 rounded-full bg-current prepress:h-[1.5px] neon:h-[1.5px]"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                className="absolute h-[2.5px] w-4 rounded-full bg-current prepress:h-[1.5px] neon:h-[1.5px]"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: duration.slow * 0.7, ease: ease.inOut.motion }}
            data-surface="ink"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-ink px-6 pt-28 pb-10 text-paper xl:hidden"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-32 hidden h-96 w-96 rounded-full bg-magenta/30 blur-[100px] neon:block"
            />
            <ul className="relative space-y-1">
              {links.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`${basePath}#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: duration.base, ease: ease.out.motion, delay: 0.15 + i * 0.04 }}
                    className="flex items-baseline gap-4 font-display text-[2.6rem] leading-[1.05] font-bold"
                  >
                    <span className="label text-yellow prepress:text-paper/40 swiss:text-magenta neon:text-cyan">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="relative flex flex-wrap gap-x-6 gap-y-3 text-sm text-paper/70"
            >
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 underline-offset-4 hover:text-paper hover:underline"
                >
                  <BrandIcon name={s.brand} />
                  {s.label}
                </a>
              ))}
              <a
                href={profile.cv}
                download={profile.cvFileName}
                className="inline-flex items-center gap-2 text-yellow underline-offset-4 hover:underline md:hidden"
              >
                <Download aria-hidden className="h-4 w-4" />
                Télécharger le CV
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
