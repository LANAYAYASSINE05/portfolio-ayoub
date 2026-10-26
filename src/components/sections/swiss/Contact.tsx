import { ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { BrandIcon } from "@/components/icons/BrandLogos";
import { Button } from "@/components/ui/Button";
import { Caption, Panel } from "@/components/swiss/parts";

const channels = [
  { label: "Téléphone", value: profile.phone, href: profile.phoneHref },
  { label: "WhatsApp", value: "Écrire sur WhatsApp", href: profile.whatsapp, external: true },
  { label: "Lieu", value: profile.location },
];

export function Contact() {
  return (
    <Panel
      id="contact"
      className="story:w-screen"
      bodyClassName="flex flex-col gap-12 story:grid story:grid-rows-[auto_minmax(0,1fr)_auto] story:gap-6"
    >
      <h2
        data-reveal
        className="font-display text-[clamp(3.5rem,13vw,7rem)] leading-[0.84] font-bold tracking-[-0.065em] story:text-[clamp(4.5rem,min(10vw,20svh),14rem)]"
      >
        Parlons
        <br />
        de votre projet<span className="text-magenta">.</span>
      </h2>

      <a
        data-reveal
        href={`mailto:${profile.email}`}
        className="group flex items-center gap-4 self-start border-b-2 border-ink pb-2 text-[clamp(1.35rem,4.2vw,3.75rem)] leading-none font-bold tracking-[-0.04em] break-all transition-colors hover:border-magenta hover:text-magenta story:self-center"
      >
        <Mail aria-hidden className="hidden h-[0.8em] w-[0.8em] shrink-0 text-magenta sm:block" strokeWidth={2.25} />
        {profile.email}
        <ArrowUpRight
          aria-hidden
          className="h-[0.8em] w-[0.8em] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </a>

      <div data-reveal className="grid gap-8 border-t-2 border-ink pt-4 sm:grid-cols-2 md:grid-cols-12 md:gap-x-6">
        {channels.map((c) => (
          <div key={c.label} className="md:col-span-3">
            <Caption>{c.label}</Caption>
            {c.href ? (
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer noopener" : undefined}
                className="mt-1 block text-lg font-medium transition-colors hover:text-magenta"
              >
                {c.value}
              </a>
            ) : (
              <p className="mt-1 text-lg font-medium">{c.value}</p>
            )}
          </div>
        ))}
        <div className="md:col-span-3">
          <Caption>Réseaux</Caption>
          <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-lg font-medium transition-colors hover:text-magenta"
                >
                  <BrandIcon name={s.brand} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3 sm:col-span-2 md:col-span-12">
          <Button href={`mailto:${profile.email}`} magnetic={false}>
            Écrire un email <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Button>
          <Button href={profile.cv} download={profile.cvFileName} variant="outline" magnetic={false}>
            Télécharger le CV <Download aria-hidden className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Panel>
  );
}
