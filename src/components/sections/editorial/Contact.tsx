"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, FileDown, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { duration, ease, spring } from "@/lib/tokens";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="group relative block">
      <span className={cn("label mb-3 block transition-colors", focused ? "text-paper" : "text-paper/55")}>{label}</span>
      <Tag
        {...(props as object)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full resize-none bg-transparent pb-3 text-lg text-paper outline-none placeholder:text-paper/30 md:text-xl",
          textarea && "min-h-32",
        )}
      />
      <span className="absolute bottom-0 left-0 h-px w-full bg-paper/25" />
      <motion.span
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: duration.base, ease: ease.out.motion }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-yellow"
      />
    </label>
  );
}

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

  const channels: { label: string; value: string; icon: React.ReactNode; href?: string; download?: string }[] = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail aria-hidden className="h-5 w-5" /> },
    { label: "Téléphone", value: profile.phone, href: profile.phoneHref, icon: <Phone aria-hidden className="h-5 w-5" /> },
    { label: "WhatsApp", value: "Écrire sur WhatsApp", href: profile.whatsapp, icon: <BrandIcon name="whatsapp" className="h-5 w-5" /> },
    {
      label: "Curriculum vitæ",
      value: "Télécharger le CV (PDF)",
      href: profile.cv,
      download: profile.cvFileName,
      icon: <FileDown aria-hidden className="h-5 w-5" />,
    },
    { label: "Localisation", value: profile.location, icon: <MapPin aria-hidden className="h-5 w-5" /> },
  ];

  return (
    <section
      id="contact"
      data-surface="ink"
      className="grain relative isolate overflow-hidden bg-magenta py-section text-paper"
    >
      <div className="container-x relative">
        <SectionHeading
          inverse
          index="08"
          kicker="Contact"
          title="Un projet ? Parlons-en."
          description="Identité visuelle, campagne social media ou support imprimé : je réponds rapidement à chaque demande."
        />

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-5">
            <ul className="divide-y divide-paper/20 border-y border-paper/20">
              {channels.map((c, i) => (
                <motion.li
                  key={c.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: duration.base, ease: ease.out.motion, delay: i * 0.08 }}
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      download={c.download}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between gap-4 py-5"
                    >
                      <span className="flex min-w-0 items-center gap-4">
                        <span className="text-paper/80">{c.icon}</span>
                        <span className="min-w-0">
                          <span className="label block text-paper/60">{c.label}</span>
                          <span className="mt-1.5 block text-lg font-semibold break-words md:text-xl">{c.value}</span>
                        </span>
                      </span>
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/40 transition-all duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-magenta",
                          c.download ? "group-hover:translate-y-0.5" : "group-hover:rotate-45",
                        )}
                      >
                        {c.download ? <Download aria-hidden className="h-4 w-4" /> : <ArrowIcon />}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-5">
                      <span className="text-paper/80">{c.icon}</span>
                      <span>
                        <span className="label block text-paper/60">{c.label}</span>
                        <span className="mt-1.5 block text-lg font-semibold md:text-xl">{c.value}</span>
                      </span>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              {profile.socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  whileHover={{ y: -4 }}
                  transition={spring.snappy}
                  className="inline-flex items-center gap-2.5 rounded-full border border-paper/40 px-5 py-3 text-sm font-semibold transition-colors hover:bg-paper hover:text-magenta"
                >
                  <BrandIcon name={s.brand} />
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: duration.slow, ease: ease.out.motion }}
            className="relative rounded-card bg-ink p-7 md:p-10 lg:col-span-7"
          >
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
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow text-ink">
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
                  <p className="font-display text-h3 font-bold">Votre messagerie s’est ouverte.</p>
                  <p className="max-w-md text-paper/70">
                    Il ne reste qu’à envoyer l’email préparé. Vous pouvez aussi écrire directement à {profile.email}.
                  </p>
                  <Button variant="outline" onClick={() => setStatus("idle")} className="text-paper">
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
                  className="grid gap-8 md:grid-cols-2"
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
