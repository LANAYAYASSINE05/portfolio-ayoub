"use client";

import { useRef } from "react";
import Link from "next/link";
import { animate, stagger as animeStagger } from "animejs";
import { FileDown } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { BrandIcon } from "@/components/icons/BrandLogos";
import { duration, ease, ms } from "@/lib/tokens";
import { useAnimeInView } from "@/lib/use-anime-in-view";
import { Marquee } from "@/components/ui/Marquee";
import { Sticker } from "@/components/ui/Sticker";

const services = ["Identité visuelle", "Social media", "Print & édition", "Prépresse", "Signalétique", "Retouche"];
const letterInks = ["--color-cyan", "--color-magenta", "--color-yellow", "--color-paper"];

export function Footer({ basePath = "" }: { basePath?: string }) {
  const wordRef = useRef<HTMLParagraphElement>(null);

  useAnimeInView(
    wordRef,
    (root) => {
      const letters = root.querySelectorAll<HTMLElement>("[data-letter]");
      animate(letters, {
        y: ["100%", "0%"],
        opacity: { to: 1, duration: 10 },
        duration: ms(duration.slow),
        delay: animeStagger(50),
        ease: ease.out.anime,
      });
    },
    { threshold: 0.4 },
  );

  const onLetter = (e: React.PointerEvent<HTMLSpanElement>) => {
    const i = Number(e.currentTarget.dataset.index);
    const css = getComputedStyle(e.currentTarget);
    const ink = css.getPropertyValue(letterInks[i % letterInks.length]).trim();
    const rest = css.getPropertyValue("--color-paper").trim();
    animate(e.currentTarget, {
      y: [{ to: "-18%", duration: 220, ease: "outQuad" }, { to: "0%", duration: 700, ease: "outElastic(1, .4)" }],
      color: [{ to: ink, duration: 120 }, { to: rest, duration: 900, delay: 400 }],
    });
  };

  return (
    <footer data-surface="ink" className="relative isolate overflow-hidden bg-ink pt-20 text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 hidden h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-magenta/20 blur-[140px] neon:block"
      />
      <div className="-mx-[2%] w-[104%] -rotate-1 border-y-[3px] border-ink bg-yellow text-key neon:rotate-0 neon:border-y neon:border-line-inverse neon:bg-transparent neon:text-paper">
        <Marquee
          items={services}
          className="py-5 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-extrabold neon:font-bold"
        />
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-12 lg:col-span-4">
          <p className="max-w-sm text-lead text-paper/70">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Sticker tone="magenta">Fait à Casablanca</Sticker>
            <Sticker tone="cyan" className="rotate-3">Print + écran</Sticker>
          </div>
        </div>

        <nav aria-label="Pied de page" className="md:col-span-6 lg:col-span-4 lg:col-start-6">
          <p className="label mb-5 text-paper/40">Navigation</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-paper/80">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`${basePath}#${item.id}`} className="transition-colors hover:text-magenta">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/design-system" className="transition-colors hover:text-magenta">
                Design system
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-6 lg:col-span-3 lg:col-start-10">
          <p className="label mb-5 text-paper/40">Contact</p>
          <ul className="space-y-2 text-paper/80">
            <li>
              <a href={`mailto:${profile.email}`} className="break-all transition-colors hover:text-magenta">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.phoneHref} className="transition-colors hover:text-magenta">
                {profile.phone}
              </a>
            </li>
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-magenta"
                >
                  <BrandIcon name={s.brand} />
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.cv}
                download={profile.cvFileName}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-magenta"
              >
                <FileDown aria-hidden className="h-4 w-4" />
                Télécharger le CV
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x">
        <p
          ref={wordRef}
          aria-label={profile.lastName}
          className="flex justify-between pb-3 font-display text-display font-extrabold whitespace-nowrap uppercase md:pb-5"
        >
          {profile.lastName.split("").map((letter, i) => (
            <span key={i} className="mask-line inline-block pb-[0.06em]">
              <span data-letter data-index={i} onPointerEnter={onLetter} className="reveal-init inline-block" aria-hidden>
                {letter}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-line-inverse py-6 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {profile.firstName} {profile.lastName} — {profile.role}, {profile.location}
        </p>
        <a href={`${basePath}#hero`} className="label transition-colors hover:text-paper">
          Retour en haut ↑
        </a>
      </div>
    </footer>
  );
}
