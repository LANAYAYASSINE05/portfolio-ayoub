import Link from "next/link";
import { navItems, profile } from "@/data/profile";
import { BrandIcon } from "@/components/icons/BrandLogos";

/** The poster's last sheet: one green field, the name set as large as the grid allows. */
export function Footer({ basePath = "" }: { basePath?: string }) {
  return (
    <footer className="overflow-hidden bg-magenta text-paper">
      <div className="grid gap-10 px-gutter pt-12 pb-8 md:grid-cols-12 md:gap-x-6">
        <p className="max-w-md text-xl leading-snug font-medium tracking-[-0.02em] md:col-span-5">{profile.summary}</p>

        <nav aria-label="Pied de page" className="md:col-span-4 md:col-start-7">
          <p className="border-b-2 border-paper pb-2 text-sm font-medium">Chapitres</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a href={`${basePath}#${item.id}`} className="flex gap-3 hover:underline hover:underline-offset-4">
                  <span className="w-5 tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/design-system" className="flex gap-3 hover:underline hover:underline-offset-4">
                <span className="w-5 opacity-60">→</span>
                Design system
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-2 md:col-start-11">
          <p className="border-b-2 border-paper pb-2 text-sm font-medium">Contact</p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <a href={`mailto:${profile.email}`} className="hover:underline hover:underline-offset-4">
                Email
              </a>
            </li>
            <li>
              <a href={profile.phoneHref} className="hover:underline hover:underline-offset-4">
                Téléphone
              </a>
            </li>
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 hover:underline hover:underline-offset-4"
                >
                  <BrandIcon name={s.brand} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="px-gutter font-display text-[clamp(4rem,19.5vw,24rem)] leading-[0.78] font-bold tracking-[-0.075em] whitespace-nowrap"
      >
        {profile.lastName}
      </p>

      <div className="mt-6 flex flex-col gap-2 border-t-2 border-paper px-gutter py-5 text-sm font-medium sm:flex-row sm:justify-between">
        <p>
          © 2026 {profile.firstName} {profile.lastName} — {profile.role}, {profile.location}
        </p>
        <p>Composé en Inter Tight, grille de 12 colonnes, une seule couleur.</p>
        <a href={`${basePath}#hero`} className="hover:underline hover:underline-offset-4">
          Retour au début ↑
        </a>
      </div>
    </footer>
  );
}
