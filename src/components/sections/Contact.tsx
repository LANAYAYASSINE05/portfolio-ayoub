"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, FileDown, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease, spring } from "@/lib/tokens";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/icons/BrandLogos";

type Status = "idle" | "sent";

const fields = [
  { name: "name", label: "Nom", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Sujet", type: "text", autoComplete: "off" },
] as const;

function Field({
  label,
  textarea,
  ...props
}: { label: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="block">
      <span className="label mb-2.5 block font-medium text-ink-soft">{label}</span>
      <Tag
        {...(props as object)}
        className={cn(
          "w-full resize-none rounded-tile border-2 border-ink bg-paper px-4 py-3 text-lg text-ink transition-[box-shadow,translate,border-color] duration-200 placeholder:text-muted",
          "focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[4px_4px_0_0_var(--color-ink)] focus-visible:outline-none",
          "neon:border neon:border-ink/15 neon:bg-ink/5 neon:focus-visible:translate-0 neon:focus-visible:border-yellow neon:focus-visible:shadow-[0_0_0_3px_rgb(198_255_61_/_0.25)]",
          textarea && "min-h-36",
        )}
      />
    </label>
  );
}

const channelTone = [
  "[--card-bg:var(--color-yellow)] text-key neon:text-ink",
  "",
  "[--card-bg:var(--color-cyan)] text-key neon:text-ink",
  "",
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = String(data.get("subject") || "Nouveau projet");
    const body = `Bonjour Ayoub,\n\n${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
    e.currentTarget.reset();
  };

  const channels: { label: string; value: string; icon: React.ReactNode; href: string; download?: string; wide?: boolean }[] = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail aria-hidden className="h-5 w-5" />, wide: true },
    { label: "Téléphone", value: profile.phone, href: profile.phoneHref, icon: <Phone aria-hidden className="h-5 w-5" /> },
    { label: "WhatsApp", value: "Écrire sur WhatsApp", href: profile.whatsapp, icon: <BrandIcon name="whatsapp" className="h-5 w-5" /> },
    {
      label: "Curriculum vitæ",
      value: "Télécharger le CV (PDF)",
      href: profile.cv,
      download: profile.cvFileName,
      icon: <FileDown aria-hidden className="h-5 w-5" />,
      wide: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-y-[3px] border-ink bg-magenta py-section text-key neon:border-0 neon:bg-[#0c0c14] neon:text-ink"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden neon:block">
        <div className="absolute -top-48 -left-40 h-[40rem] w-[40rem] rounded-full bg-magenta/35 blur-[150px]" />
        <div className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-yellow/10 blur-[150px]" />
        <div className="neon-grid absolute inset-0 opacity-60" />
      </div>
      <div className="container-x relative">
        <SectionHeading
          index="08"
          kicker="Contact"
          title="Un projet ? Parlons-en."
          description="Identité visuelle, campagne social media ou support imprimé : je réponds rapidement à chaque demande."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 space-y-6 lg:col-span-5">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {channels.map((c, i) => (
                <motion.li
                  key={c.label}
                  initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: duration.base, ease: ease.out.motion, delay: i * 0.08 }}
                  className={cn(c.wide && "sm:col-span-2")}
                >
                  <a
                    href={c.href}
                    download={c.download}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className={cn("card hard-lift group flex h-full items-center justify-between gap-4 p-5", channelTone[i])}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-paper text-ink neon:rounded-full neon:border-ink/15 neon:bg-ink/5 neon:text-cyan">
                        {c.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="label block opacity-70">{c.label}</span>
                        <span className="mt-1.5 block font-semibold break-words md:text-lg">{c.value}</span>
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-ink text-paper transition-transform duration-300",
                        "neon:border-0 neon:bg-ink/10 neon:text-ink neon:group-hover:bg-yellow neon:group-hover:text-key",
                        c.download ? "group-hover:translate-y-0.5" : "group-hover:rotate-45",
                      )}
                    >
                      {c.download ? <Download aria-hidden className="h-4 w-4" /> : <ArrowIcon />}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hard hard-lift inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-3 text-sm font-bold text-ink [--hard-k:0.6] hover:bg-yellow hover:text-key neon:bg-ink/5 neon:hover:bg-magenta"
                >
                  <BrandIcon name={s.brand} />
                  {s.label}
                </a>
              ))}
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <MapPin aria-hidden className="h-4 w-4" /> {profile.location}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: duration.slow, ease: ease.out.motion }}
            className="card relative p-6 text-ink md:p-10 lg:col-span-7 neon:shadow-[0_40px_120px_-40px_rgb(166_107_255_/_0.5)]"
          >
            <div className="absolute -top-5 right-6">
              <Sticker tone="yellow" className="rotate-6">Réponse sous 24 h</Sticker>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={spring.gentle}
                  className="flex min-h-[26rem] flex-col items-start justify-center gap-6"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-yellow text-key neon:border-0 neon:glow-yellow">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                      <motion.path
                        d="M4 12.5L9.5 18L20 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: duration.slow, ease: ease.out.motion, delay: 0.2 }}
                      />
                    </svg>
                  </span>
                  <p className="font-display text-h3 font-extrabold neon:font-bold">Votre messagerie s’est ouverte.</p>
                  <p className="max-w-md text-ink-soft">
                    Il ne reste qu’à envoyer l’email préparé. Vous pouvez aussi écrire directement à {profile.email}.
                  </p>
                  <Button variant="outline" onClick={() => setStatus("idle")}>
                    Nouveau message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6 md:grid-cols-2"
                >
                  {fields.map((f) => (
                    <div key={f.name} className={f.name === "subject" ? "md:col-span-2" : undefined}>
                      <Field label={f.label} name={f.name} type={f.type} autoComplete={f.autoComplete} required />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <Field label="Message" name="message" textarea rows={4} required placeholder="Parlez-moi de votre projet…" />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Envoyer le message <ArrowIcon />
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
