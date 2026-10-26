import type { Metadata } from "next";
import { ThemedLayout } from "@/components/ThemedLayout";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Footer as EditorialFooter } from "@/components/sections/editorial";
import { Footer as SwissFooter } from "@/components/sections/swiss";
import { ColorSwatch } from "@/components/design-system/ColorSwatch";
import { EasingCurve, MotionDemos } from "@/components/design-system/MotionDemos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { ColorBar } from "@/components/ui/ColorBar";
import { CropMarks } from "@/components/ui/CropMarks";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { Sticker } from "@/components/ui/Sticker";
import { Tag } from "@/components/ui/Tag";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BrandIcon } from "@/components/icons/BrandLogos";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { ArrowRight, Download, FileDown, Mail, MapPin, Phone } from "lucide-react";
import { tools } from "@/data/profile";
import { cn } from "@/lib/cn";
import type { Theme } from "@/lib/theme";
import { colors, duration, ease, neonColors, neonLights, processInks, spring, swissColors, swissInks } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Design system — Ayoub Amensar",
  description:
    "Trois design systems pour le portfolio d’Ayoub Amensar — Prépresse, Studio néon et Style suisse : tokens, typographie, composants, layouts et animation.",
};

const themeOrder: Theme[] = ["print", "neon", "swiss"];

/** Literal class names (Tailwind must see them) to show a node in one system only. */
const only = {
  print: { inline: "hidden prepress:inline", block: "hidden prepress:block", grid: "hidden prepress:grid", flex: "hidden prepress:flex" },
  neon: { inline: "hidden neon:inline", block: "hidden neon:block", grid: "hidden neon:grid", flex: "hidden neon:flex" },
  swiss: { inline: "hidden swiss:inline", block: "hidden swiss:block", grid: "hidden swiss:grid", flex: "hidden swiss:flex" },
} as const;

/** Same token, one value per system. */
function Each({ print, neon, swiss }: Record<Theme, React.ReactNode>) {
  return (
    <>
      <span className={only.print.inline}>{print}</span>
      <span className={only.neon.inline}>{neon}</span>
      <span className={only.swiss.inline}>{swiss}</span>
    </>
  );
}

const craftIcons = tools
  .filter((t) => t.category !== "Adobe")
  .map((t) => ({ name: t.icon, label: t.name, print: { bg: t.color, ink: t.ink }, pop: { bg: t.pop.color, ink: t.pop.ink } }));

const uiIcons = [
  { label: "Email", Icon: Mail },
  { label: "Téléphone", Icon: Phone },
  { label: "Lieu", Icon: MapPin },
  { label: "CV", Icon: FileDown },
  { label: "Télécharger", Icon: Download },
];

const neutrals: Record<Theme, { name: string; token: string; hex: string }[]> = {
  print: [
    { name: "Paper", token: "paper", hex: colors.paper },
    { name: "Paper dim", token: "paper-dim", hex: colors.paperDim },
    { name: "Muted", token: "muted", hex: colors.muted },
    { name: "Ink soft", token: "ink-soft", hex: colors.inkSoft },
    { name: "Ink", token: "ink", hex: colors.ink },
  ],
  neon: [
    { name: "Night", token: "paper", hex: neonColors.paper },
    { name: "Night raised", token: "paper-dim", hex: neonColors.paperDim },
    { name: "Muted", token: "muted", hex: neonColors.muted },
    { name: "Moon soft", token: "ink-soft", hex: neonColors.inkSoft },
    { name: "Moon", token: "ink", hex: neonColors.ink },
  ],
  swiss: [
    { name: "Crème", token: "paper", hex: swissColors.paper },
    { name: "Crème dim", token: "paper-dim", hex: swissColors.paperDim },
    { name: "Lichen", token: "muted", hex: swissColors.muted },
    { name: "Mousse", token: "ink-soft", hex: swissColors.inkSoft },
    { name: "Encre forêt", token: "ink", hex: swissColors.ink },
  ],
};

const accents: Record<Theme, { label: string; swatches: { name: string; token: string; hex: string; meta: string }[] }> = {
  print: { label: "Encres process", swatches: processInks.map((c) => ({ ...c, meta: `CMJN ${c.cmyk}` })) },
  neon: { label: "Lumières", swatches: neonLights.map((c) => ({ ...c, meta: c.role })) },
  swiss: { label: "Un vert, et l’encre forêt", swatches: swissInks.map((c) => ({ ...c, meta: c.role })) },
};

const typeScale = [
  { token: "text-display", font: ["Syne 800", "Space Grotesk 700", "Inter Tight 700"], sample: "Aa", className: "font-display text-display font-extrabold uppercase swiss:font-bold swiss:normal-case" },
  { token: "text-h1", font: ["Syne 700", "Space Grotesk 700", "Inter Tight 700"], sample: "Identité visuelle", className: "font-display text-h1 font-bold swiss:tracking-[-0.055em]" },
  { token: "text-h2", font: ["Syne 700", "Space Grotesk 700", "Inter Tight 700"], sample: "Travaux sélectionnés", className: "font-display text-h2 font-bold swiss:tracking-[-0.05em]" },
  { token: "text-h3", font: ["Syne 700", "Space Grotesk 600", "Inter Tight 700"], sample: "Brief & écoute", className: "font-display text-h3 font-bold neon:font-semibold" },
  { token: "text-lead", font: ["Manrope 400", "Manrope 400", "Inter Tight 500"], sample: "Je traduis des idées en visuels clairs, modernes et impactants.", className: "text-lead swiss:font-medium" },
  { token: "text-base", font: ["Manrope 400", "Manrope 400", "Inter Tight 400"], sample: "Préparation des fichiers de montage pour impression offset avec précision.", className: "text-base" },
  { token: "label", font: ["JetBrains Mono 400", "JetBrains Mono 400", "JetBrains Mono 400"], sample: "(07) — Projets", className: "label" },
] as const;

const spacing = [
  { token: "1", px: 4 },
  { token: "2", px: 8 },
  { token: "4", px: 16 },
  { token: "6", px: 24 },
  { token: "10", px: 40 },
  { token: "16", px: 64 },
  { token: "gutter", px: 56, note: "clamp(1.25rem, 4vw, 3.5rem)" },
  { token: "section", px: 176, note: "clamp(6rem, 12vw, 11rem)" },
];

const principles: Record<Theme, { title: string; text: string }[]> = {
  print: [
    { title: "Le papier d’abord", text: "Fond papier, encre noire, et les quatre encres CMJN comme seuls accents. Rien qui ne s’imprime pas." },
    { title: "Repères visibles", text: "Traits de coupe, marques de repérage et barres de contrôle deviennent des éléments graphiques." },
    { title: "Typo éditoriale", text: "Syne pour la voix, Manrope pour la lecture, JetBrains Mono pour les annotations techniques." },
    { title: "Mouvement mesuré", text: "Une seule courbe (expo-out), trois librairies, et respect total de prefers-reduced-motion." },
  ],
  neon: [
    { title: "La nuit d’abord", text: "Fond nuit, texte lunaire, et trois lumières seulement : violet, lime acide et cyan." },
    { title: "Verre & lumière", text: "Les sections deviennent des grilles bento de verre dépoli ; les accents émettent un halo." },
    { title: "Typo technique", text: "Space Grotesk pour la voix, Manrope pour la lecture, JetBrains Mono pour les annotations (// 01)." },
    { title: "Même rythme", text: "Mêmes tokens d’animation que Prépresse : seul le rendu et la composition changent, jamais la cadence." },
  ],
  swiss: [
    { title: "Une seule couleur", text: "Papier crème, encre forêt, et un vert sapin réservé aux chiffres, aux repères et aux actions. Rien d’autre." },
    { title: "La grille commande", text: "Douze colonnes, des filets de 2px, aucun cadre ni arrondi : l’alignement fait tout le travail." },
    { title: "Fer à gauche", text: "Inter Tight serrée, en drapeau à droite, grands chiffres et hiérarchie par la taille plutôt que par la couleur." },
    { title: "Un récit horizontal", text: "Les chapitres défilent de gauche à droite au scroll ; sur mobile ou en mouvement réduit, ils s’empilent." },
  ],
};

const systems = [
  {
    id: "print",
    name: "Prépresse",
    tagline: "La chaîne graphique : papier, encres CMJN, repères d’impression, mise en page éditoriale.",
    specs: ["Fond papier #F3EFE7", "Encres CMJN en aplat", "Syne · Manrope · JetBrains", "Layouts éditoriaux", "Grain, trame, traits de coupe"],
  },
  {
    id: "neon",
    name: "Studio néon",
    tagline: "Le studio de nuit : grilles bento en verre dépoli, lumières et halos.",
    specs: ["Fond nuit #07070C", "Violet · lime acide · cyan", "Space Grotesk · Manrope · JetBrains", "Layouts bento", "Verre, halos, grille lumineuse"],
  },
  {
    id: "swiss",
    name: "Style suisse",
    tagline: "Le style typographique international : grille stricte, fer à gauche, crème et un seul vert sapin, en récit horizontal.",
    specs: ["Fond crème #F3EDDF", "Encre forêt + vert sapin #1E5A3C", "Inter Tight", "Récit horizontal (GSAP pin + scrub)", "Filets 2px, zéro arrondi"],
  },
] as const;

const comparison = [
  ["Layout", "Éditorial : grandes lignes, filets, colonnes", "Bento : grilles de cartes en verre", "Récit horizontal : chapitres côte à côte, défilement latéral"],
  ["Carte (.card)", "Papier, filet 1px", "Verre dépoli, liseré, rayon 1.75rem", "Pas de cadre : bloc suspendu à un filet noir de 2px"],
  ["Button", "Aplat magenta, remplissage encre au survol", "Lime acide + halo, texte nuit", "Rectangle vert sapin plein, encre au survol"],
  ["Tag", "Contour encre / aplat CMJN", "Puce de verre, pilule lumineuse", "Rectangle au trait, angles vifs"],
  ["SectionHeading", "(01) + filet encre", "// 01 + mot en dégradé", "N°01 sur aplat vert + filet 2px, dernier mot en vert"],
  ["Hero", "Nom géant, pastilles CMJN en multiply", "Nom + bento photo / tagline / stat, orbes et grille", "Nom sur 9 colonnes, portrait N&B, carré vert"],
  ["Expérience", "Frise verticale, progression magenta", "Cartes nuit empilées (sticky)", "Frise horizontale, de 2022 au poste actuel"],
  ["Navigation", "Menu + ancres", "Menu + ancres", "Barre de chapitres 01–09, progression verte, ← →"],
  ["Curseur", "Anneau encre, point magenta", "Anneau cyan, point lime lumineux", "Carré au trait, point carré vert"],
] as const;

function Block({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-20 md:py-28">
      <div className="container-x">{children}</div>
    </section>
  );
}

function PrintPreview() {
  return (
    <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden p-7" style={{ background: colors.paper, color: colors.ink }}>
      <div className="flex items-start justify-between">
        <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase" style={{ color: colors.muted }}>
          (01) — Prépresse
        </span>
        <span className="relative h-9 w-12">
          <span className="absolute left-0 h-7 w-7 rounded-full" style={{ background: colors.cyan, mixBlendMode: "multiply" }} />
          <span className="absolute left-4 h-7 w-7 rounded-full" style={{ background: colors.magenta, mixBlendMode: "multiply" }} />
          <span className="absolute top-3 left-2 h-7 w-7 rounded-full" style={{ background: colors.yellow, mixBlendMode: "multiply" }} />
        </span>
      </div>
      <p className="text-4xl leading-none font-extrabold uppercase" style={{ fontFamily: "var(--font-syne)" }}>
        Ayoub<span style={{ color: colors.magenta }}>.</span>
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full px-5 py-3 text-sm font-semibold" style={{ background: colors.magenta, color: colors.paper }}>
          Voir les projets ↗
        </span>
        <span className="rounded-full border px-4 py-2 font-mono text-[0.65rem] tracking-[0.16em] uppercase" style={{ borderColor: "rgb(13 13 13 / 0.25)" }}>
          Branding
        </span>
        <span className="flex">
          {[colors.cyan, colors.magenta, colors.yellow, colors.key].map((c) => (
            <span key={c} className="h-3.5 w-3.5" style={{ background: c }} />
          ))}
        </span>
      </div>
    </div>
  );
}

function NeonPreview() {
  return (
    <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden p-7" style={{ background: neonColors.paper, color: neonColors.ink }}>
      <div aria-hidden className="neon-grid absolute inset-0" />
      <div aria-hidden className="absolute -top-20 -right-10 h-56 w-56 rounded-full blur-[70px]" style={{ background: "rgb(166 107 255 / 0.45)" }} />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase" style={{ color: neonColors.cyan }}>
          {"// 02 — Studio néon"}
        </span>
        <span className="h-7 w-7 rounded-full" style={{ background: neonColors.magenta, boxShadow: `0 0 28px 4px ${neonColors.magenta}` }} />
      </div>
      <p className="relative text-4xl leading-none font-bold uppercase" style={{ fontFamily: "var(--font-grotesk)" }}>
        Ayoub<span style={{ color: neonColors.yellow }}>.</span>
      </p>
      <div className="relative flex flex-wrap items-center gap-3">
        <span className="glow-yellow rounded-full px-5 py-3 text-sm font-semibold" style={{ background: neonColors.yellow, color: neonColors.key }}>
          Voir les projets ↗
        </span>
        <span className="glass rounded-full px-4 py-2 font-mono text-[0.65rem] tracking-[0.16em] uppercase">Branding</span>
        <span className="flex gap-1">
          {[neonColors.magenta, neonColors.cyan, neonColors.yellow].map((c) => (
            <span key={c} className="h-3.5 w-3.5 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} />
          ))}
        </span>
      </div>
    </div>
  );
}

function SwissPreview() {
  return (
    <div
      className="relative flex h-full flex-col justify-between gap-6 overflow-hidden p-7"
      style={{ background: swissColors.paper, color: swissColors.ink, fontFamily: "var(--font-inter-tight)" }}
    >
      <div className="grid grid-cols-3 gap-4 border-b-2 pb-2 text-xs font-medium" style={{ borderColor: swissColors.ink }}>
        <span style={{ color: swissColors.magenta }}>03</span>
        <span>Style suisse</span>
        <span className="text-right">→</span>
      </div>
      <p className="text-6xl leading-[0.82] font-bold tracking-[-0.065em]">
        Ayoub
        <br />
        Amensar<span style={{ color: swissColors.magenta }}>.</span>
      </p>
      <div className="flex items-end justify-between gap-4">
        <span className="px-5 py-3 text-sm font-medium" style={{ background: swissColors.magenta, color: swissColors.paper }}>
          Voir les projets →
        </span>
        <span className="h-12 w-12" style={{ background: swissColors.magenta }} />
      </div>
    </div>
  );
}

const previews: Record<Theme, () => React.ReactNode> = { print: PrintPreview, neon: NeonPreview, swiss: SwissPreview };

const tableHead = "bg-paper-dim";
const tableBody = "divide-y divide-line";
const effectTile = "card relative h-40 items-center justify-center overflow-hidden";

export default function DesignSystemPage() {
  return (
    <>
      <Header basePath="/" />
      <main>
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44">
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden neon:block">
            <div className="neon-grid absolute inset-0" />
            <div className="absolute -top-40 right-[5%] h-[30rem] w-[30rem] rounded-full bg-magenta/25 blur-[140px]" />
          </div>
          <div className="relative container-x">
            <div className="mb-8">
              <p className={cn("label text-muted", only.print.block)}>
                (v3.0) — Design system · trois systèmes, un seul code
              </p>
              <Sticker tone="cyan" className="prepress:hidden">
                Design system v3.0 · trois systèmes, un seul code
              </Sticker>
            </div>
            <h1 className="font-display text-h1 font-bold uppercase">
              <Each
                print={
                  <>
                    Prépresse<span className="text-magenta">.</span>
                  </>
                }
                neon={<span className="neon-gradient-text">Studio néon.</span>}
                swiss={
                  <span className="normal-case tracking-[-0.06em]">
                    Style suisse<span className="text-magenta">.</span>
                  </span>
                }
              />
            </h1>
            <p className="mt-8 max-w-2xl text-lead text-ink-soft">
              <Each
                print="Le système d’origine du portfolio d’Ayoub Amensar : papier, encres CMJN, repères d’impression et mise en page éditoriale — de l’écran à la plaque."
                neon="La seconde construction du portfolio : des grilles bento rendues comme un studio de nuit — verre dépoli, lumières violettes, lime acide et halos cyan."
                swiss="La troisième construction : le style typographique international — grille stricte, Inter Tight au fer à gauche, papier crème et un seul vert sapin — raconté en chapitres qui défilent à l’horizontale."
              />{" "}
              Un même vocabulaire pour Tailwind, GSAP, Motion et anime.js.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ThemeToggle withLabels />
              <div className="flex flex-wrap gap-2.5">
                {["Systèmes", "Couleurs", "Typographie", "Espacements", "Composants", "Animation"].map((item) => (
                  <a key={item} href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
                    <Tag className="transition-colors hover:bg-yellow hover:text-key prepress:hover:bg-ink prepress:hover:text-paper">
                      {item}
                    </Tag>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Block id="systemes">
          <SectionHeading
            index="00"
            kicker="Systèmes"
            title="Trois systèmes, trois constructions."
            description="Prépresse compose les sections en mise en page éditoriale, Studio néon les reconstruit en grilles bento, Style suisse les aligne en chapitres qui défilent à l’horizontale. Tous lisent les mêmes noms de tokens (paper, ink, magenta…) : le thème actif change leurs valeurs et la composition des sections."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {systems.map((s) => {
              const Preview = previews[s.id];
              return (
                <article key={s.id} className="card flex flex-col overflow-hidden">
                  <div className="h-72 border-b border-line">
                    <Preview />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-7">
                    <div>
                      <h3 className="font-display text-h3 font-bold">{s.name}</h3>
                      <p className="mt-2 text-ink-soft">{s.tagline}</p>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {s.specs.map((spec) => (
                        <li key={spec}>
                          <Tag>{spec}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="card mt-10 overflow-x-auto">
            <table className="w-full min-w-[48rem] text-left text-sm">
              <thead className={tableHead}>
                <tr>
                  <th className="label p-4 font-normal">Composant</th>
                  <th className="label p-4 font-normal">Prépresse</th>
                  <th className="label p-4 font-normal">Studio néon</th>
                  <th className="label p-4 font-normal">Style suisse</th>
                </tr>
              </thead>
              <tbody className={tableBody}>
                {comparison.map(([component, print, neon, swiss]) => (
                  <tr key={component}>
                    <td className="p-4 font-mono">{component}</td>
                    <td className="p-4 text-ink-soft">{print}</td>
                    <td className="p-4 text-ink-soft">{neon}</td>
                    <td className="p-4 text-ink-soft">{swiss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block id="principes">
          <SectionHeading index="01" kicker="Principes" title="Quatre règles simples." />
          {themeOrder.map((theme) => (
            <div key={theme} className={cn("gap-5 md:grid-cols-2 lg:grid-cols-4", only[theme].grid)}>
              {principles[theme].map((p, i) => (
                <div key={p.title} className="card p-7">
                  <span className="label text-muted neon:text-cyan">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm opacity-80">{p.text}</p>
                </div>
              ))}
            </div>
          ))}
        </Block>

        <Block id="couleurs">
          <SectionHeading
            index="02"
            kicker="Couleurs"
            title="Mêmes tokens, trois palettes."
            description="Cliquez sur une couleur pour copier sa valeur hexadécimale. Encres CMJN, lumières néon ou vert sapin : les noms de tokens ne changent jamais."
          />
          {themeOrder.map((theme) => (
            <div key={theme} className={only[theme].block}>
              <p className="label mb-5 text-muted">Neutres</p>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                {neutrals[theme].map((c) => (
                  <ColorSwatch key={c.token} {...c} />
                ))}
              </div>
              <p className="label mt-14 mb-5 text-muted">{accents[theme].label}</p>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                {accents[theme].swatches.map((c) => (
                  <ColorSwatch key={c.token} name={c.name} token={c.token} hex={c.hex} meta={c.meta} />
                ))}
              </div>
            </div>
          ))}
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <div className={cn(effectTile, "[--card-bg:var(--color-paper-dim)]", only.print.flex)}>
              <div className="relative h-24 w-24">
                <span className="absolute inset-0 -translate-x-4 rounded-full bg-cyan mix-blend-multiply" />
                <span className="absolute inset-0 translate-x-4 rounded-full bg-magenta mix-blend-multiply" />
                <span className="absolute inset-0 translate-y-6 rounded-full bg-yellow mix-blend-multiply" />
              </div>
            </div>
            <div className={cn(effectTile, "halftone text-magenta [--card-bg:var(--color-paper-dim)]", only.print.flex)}>
              <span className="label rounded-full bg-paper px-3 py-2 text-ink">Trame · halftone</span>
            </div>
            <div className={cn(effectTile, "grain [--card-bg:var(--color-paper-dim)]", only.print.flex)}>
              <span className="label rounded-full bg-paper px-3 py-2 text-ink">Grain papier</span>
            </div>

            <div className={cn(effectTile, only.neon.flex)}>
              <span className="absolute h-24 w-24 -translate-x-6 rounded-full bg-cyan mix-blend-multiply blur-md" />
              <span className="absolute h-24 w-24 translate-x-6 rounded-full bg-magenta mix-blend-multiply blur-md" />
              <span className="label relative rounded-full bg-paper/60 px-3 py-2">Lumières additives</span>
            </div>
            <div className={cn(effectTile, only.neon.flex)}>
              <span className="neon-grid absolute inset-0" />
              <span className="label relative rounded-full bg-paper px-3 py-2 text-ink">Grille lumineuse</span>
            </div>
            <div className={cn(effectTile, only.neon.flex)}>
              <span className="absolute h-28 w-28 rounded-full bg-magenta/60 blur-2xl" />
              <span className="glass label relative rounded-full px-3 py-2">Verre dépoli</span>
            </div>

            <div className={cn(effectTile, "flex-col !items-stretch gap-3 px-6 [--card-bg:var(--color-paper-dim)]", only.swiss.flex)}>
              <div className="grid h-16 grid-cols-12 gap-1.5">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} className={i < 7 ? "bg-ink" : "bg-magenta/25"} />
                ))}
              </div>
              <span className="text-sm font-medium">Grille 12 colonnes · 7 + 5</span>
            </div>
            <div className={cn(effectTile, "!items-start !justify-start p-6 [--card-bg:var(--color-paper-dim)]", only.swiss.flex)}>
              <p className="text-3xl leading-[0.9] font-bold tracking-[-0.05em]">
                Fer à gauche,
                <br />
                drapeau
                <br />à droite<span className="text-magenta">.</span>
              </p>
            </div>
            <div className={cn(effectTile, "[--card-bg:var(--color-paper-dim)]", only.swiss.flex)}>
              <span className="absolute bottom-0 left-0 h-1/2 w-1/3 bg-magenta" />
              <span className="relative font-display text-7xl font-bold tracking-[-0.07em]">01</span>
            </div>
          </div>
        </Block>

        <Block id="typographie">
          <SectionHeading
            index="03"
            kicker="Typographie"
            title="Trois familles, une échelle fluide."
            description="Toutes les tailles utilisent clamp() pour s’adapter du mobile au grand écran. Chaque thème remplace la famille d’affichage : Space Grotesk en néon, Inter Tight en Style suisse (titres et texte courant, approche d’Helvetica)."
          />
          <div className={cn("card px-6 md:px-8", tableBody)}>
            {typeScale.map((t) => (
              <div key={t.token} className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
                <div className="md:col-span-3">
                  <p className="font-mono text-sm">{t.token}</p>
                  <p className="label mt-2 text-muted">
                    <Each print={t.font[0]} neon={t.font[1]} swiss={t.font[2]} />
                  </p>
                </div>
                <p className={`md:col-span-9 ${t.className} break-words`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="espacements">
          <SectionHeading index="04" kicker="Espacements" title="Grille, rythme & rayons." />
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="min-w-0 space-y-4">
              {spacing.map((s) => (
                <div
                  key={s.token}
                  className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:gap-x-5"
                >
                  <span className="font-mono text-sm">{s.token}</span>
                  <span
                    className="block h-4 rounded-sm bg-magenta neon:rounded-full neon:bg-gradient-to-r neon:from-magenta neon:to-cyan"
                    style={{ width: `min(${s.px}px, 100%)` }}
                  />
                  <span className="label col-start-2 text-muted sm:col-start-auto sm:text-right">{s.note ?? `${s.px}px`}</span>
                </div>
              ))}
            </div>
            <div className="min-w-0 space-y-8">
              <div className="grid h-32 grid-cols-12 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="rounded-sm bg-cyan/20 ring-1 ring-cyan/40 neon:rounded-md"
                  />
                ))}
              </div>
              <p className="label text-muted">Grille 12 colonnes · max 96rem · gouttière fluide</p>
              <div className="flex flex-wrap gap-5">
                {[
                  { label: "4px · repères", cls: "rounded-[4px]" },
                  { label: <Each print="tile · 0.75rem" neon="tile · 1rem" swiss="tile · 0" />, cls: "rounded-tile" },
                  { label: <Each print="card · 1.25rem" neon="card · 1.75rem" swiss="card · 0" />, cls: "rounded-card" },
                  { label: "full", cls: "rounded-full" },
                ].map((r) => (
                  <div key={r.cls} className="flex flex-col items-center gap-3">
                    <span className={`h-20 w-20 bg-ink neon:bg-paper-dim neon:shadow-[inset_0_0_0_1px_var(--color-line)] ${r.cls}`} />
                    <span className="label text-muted">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Block>

        <Block id="composants">
          <SectionHeading
            index="05"
            kicker="Composants"
            title="Les briques de l’interface."
            description="Basculez de système : chaque brique ci-dessous se reconstruit — aplats et encres en Prépresse, verre et lumière en Studio néon, filets et vert sapin unique en Style suisse."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-8">
              <p className="label mb-6 text-muted">Button · magnétique (Motion)</p>
              <div className="flex flex-wrap gap-4">
                <Button>
                  Primary <ArrowIcon />
                </Button>
                <Button variant="ink">Ink</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="mt-5">
                <Button size="lg">
                  Large <ArrowIcon />
                </Button>
              </div>
            </div>
            <div className="card p-8">
              <p className="label mb-6 text-muted">Tag · tons</p>
              <div className="flex flex-wrap gap-2.5">
                <Tag>Outline</Tag>
                <Tag tone="ink">Ink</Tag>
                <Tag tone="magenta">Magenta</Tag>
                <Tag tone="cyan">Cyan</Tag>
                <Tag tone="yellow">Yellow</Tag>
              </div>
              <p className="label mt-8 mb-4 text-muted">ThemeToggle · compact & libellé</p>
              <div className="flex flex-wrap items-center gap-4">
                <ThemeToggle />
                <ThemeToggle withLabels />
              </div>
            </div>
            <div className={cn("card p-8", only.print.block)}>
              <p className="label mb-8 text-muted">Repères d’impression</p>
              <div className="flex flex-wrap items-center gap-10">
                <div className="relative h-24 w-36 text-ink/50">
                  <CropMarks />
                  <div className="h-full w-full rounded-[4px] bg-paper-dim" />
                </div>
                <RegistrationMark className="h-16 w-16 text-ink" />
                <ColorBar />
              </div>
            </div>
            <div className="card p-8 prepress:hidden">
              <p className="label mb-8 text-muted">Sticker · tons</p>
              <div className="flex flex-wrap items-center gap-5">
                <Sticker>✶ Dispo</Sticker>
                <Sticker tone="magenta" className="rotate-6">
                  Graphic designer
                </Sticker>
                <Sticker tone="cyan">Hello ✌</Sticker>
                <Sticker tone="paper" className="rotate-3">
                  N°01
                </Sticker>
              </div>
            </div>
            <div className={cn("card p-6 md:p-8 lg:col-span-2", only.swiss.block)}>
              <p className="label mb-2 text-muted">Kit suisse · Story + Panel</p>
              <p className="mb-6 max-w-2xl text-sm text-ink-soft">
                Le récit horizontal : à partir de 1024 × 600 px, Story épingle les chapitres et traduit le scroll vertical
                en défilement latéral (GSAP ScrollTrigger, pin + scrub, ease « none »). Chaque Panel porte son numéro le
                long du bord gauche ; la barre de chapitres suit la progression, les flèches ← → sautent d’un chapitre à
                l’autre. Sur mobile ou en mouvement réduit, les mêmes panneaux s’empilent.
              </p>
              <ol className="hide-scrollbar -mx-6 flex snap-x snap-mandatory overflow-x-auto px-6 md:-mx-8 md:px-8">
                {[
                  { n: "01", label: "Accueil", title: "Ayoub Amensar.", w: "w-80" },
                  { n: "02", label: "À propos", title: "Du concept à la plaque.", w: "w-96" },
                  { n: "05", label: "Expérience", title: "Journal de bord.", w: "w-[28rem]" },
                  { n: "08", label: "Projets", title: "Travaux imprimés.", w: "w-96" },
                ].map((p) => (
                  <li key={p.n} className={cn("flex h-64 shrink-0 snap-start gap-4 border-l border-line px-4 first:border-l-0 first:pl-0", p.w)}>
                    <span className="flex rotate-180 items-center gap-3 text-xs font-medium [writing-mode:vertical-rl]">
                      <span className="text-magenta">{p.n}</span>
                      {p.label}
                      <span className="w-0.5 flex-1 bg-ink" />
                    </span>
                    <span className="flex flex-1 flex-col justify-between">
                      <span className="text-4xl leading-[0.88] font-bold tracking-[-0.05em]">{p.title}</span>
                      <span className="flex items-center justify-between border-t-2 border-ink pt-2 text-xs font-medium">
                        Chapitre {p.n} <ArrowRight aria-hidden className="h-4 w-4 text-magenta" />
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex h-10 items-center gap-4 border-t-2 border-ink text-xs font-medium">
                <span className="text-magenta tabular-nums">05/09</span>
                Expérience
                <span className="relative h-0.5 flex-1 bg-line">
                  <span className="absolute inset-y-0 left-0 w-[52%] bg-magenta" />
                </span>
                <span className="text-muted">Barre de chapitres</span>
              </div>
            </div>
            <div data-surface="ink" className="card p-8 text-paper [--card-bg:var(--color-ink)] [--hard-c:var(--color-magenta)]">
              <p className="label mb-6 text-paper/50">SectionHeading · inverse</p>
              <SectionHeading inverse index="09" kicker="Exemple" title="Titre de section." className="!mb-0" />
            </div>
            <div className="relative overflow-hidden rounded-card p-8 lg:col-span-2" style={{ background: neonColors.paper, color: neonColors.ink }}>
              <div aria-hidden className="neon-grid absolute inset-0" />
              <div aria-hidden className="absolute -top-24 left-1/3 h-72 w-72 rounded-full blur-[90px]" style={{ background: "rgb(166 107 255 / 0.4)" }} />
              <div className="relative">
                <p className="mb-2 font-mono text-[0.72rem] tracking-[0.16em] uppercase" style={{ color: neonColors.cyan }}>
                  {"// Primitives néon — utilitaires CSS"}
                </p>
                <p className="mb-8 max-w-xl text-sm" style={{ color: neonColors.inkSoft }}>
                  Les briques du Studio néon, utilisables partout via la variante neon: — par exemple neon:glass ou
                  neon:glow-yellow. En néon, .card devient automatiquement du verre.
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  {[
                    { label: "glass", node: <span className="glass block h-16 w-28 rounded-tile" /> },
                    { label: "glow-magenta", node: <span className="glow-magenta block h-16 w-16 rounded-full" style={{ background: neonColors.magenta }} /> },
                    { label: "glow-yellow", node: <span className="glow-yellow block h-16 w-16 rounded-full" style={{ background: neonColors.yellow }} /> },
                    { label: "glow-cyan", node: <span className="glow-cyan block h-16 w-16 rounded-full" style={{ background: neonColors.cyan }} /> },
                    { label: "neon-grid", node: <span className="neon-grid block h-16 w-28 rounded-tile" style={{ maskImage: "none", boxShadow: "inset 0 0 0 1px rgb(241 240 250 / 0.12)" }} /> },
                    {
                      label: "neon-gradient-text",
                      node: <span className="neon-gradient-text block font-[family-name:var(--font-grotesk)] text-4xl font-bold">Néon</span>,
                    },
                  ].map((p) => (
                    <div key={p.label} className="flex flex-col items-center gap-3">
                      <span className="flex h-20 items-center">{p.node}</span>
                      <span className="font-mono text-[0.65rem] tracking-[0.16em] uppercase" style={{ color: neonColors.muted }}>
                        {p.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card p-8 lg:col-span-2">
              <p className="label mb-2 text-muted">Logos officiels</p>
              <p className="mb-8 max-w-xl text-sm text-ink-soft">
                Marques reproduites à l’identique, jamais redessinées ni recolorées — dans chaque système. Version
                couleur en vitrine, version monochrome (currentColor) dans les boutons et les listes.
              </p>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
                {(["photoshop", "illustrator", "indesign"] as const).map((name) => (
                  <div key={name} className="flex flex-col items-center gap-3">
                    <span className="h-14 w-14">
                      <ToolIcon name={name} />
                    </span>
                    <span className="label text-muted">{name}</span>
                  </div>
                ))}
                {(["behance", "linkedin", "linktree", "whatsapp"] as const).map((name) => (
                  <div key={name} className="flex flex-col items-center gap-3">
                    <span className="hard flex h-14 w-14 items-center justify-center rounded-tile bg-paper [--hard-k:0.5] prepress:shadow-[inset_0_0_0_1px_var(--color-line)] swiss:bg-paper-dim neon:bg-[#f1f0fa]">
                      <BrandIcon name={name} colored className="h-7 w-7" />
                    </span>
                    <span className="label text-muted">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-8 lg:col-span-2">
              <p className="label mb-2 text-muted">Icônes · Lucide, trait 1.75</p>
              <p className="mb-8 max-w-xl text-sm text-ink-soft">
                Pour les savoir-faire sans logo officiel : une icône au trait posée sur une tuile d’aplat — encres CMJN en
                Prépresse, aplats pop en Studio néon, carré noir à angles vifs en Style suisse.
              </p>
              <div className="flex flex-wrap gap-5">
                {craftIcons.map((icon) => (
                  <div key={icon.name} className="flex flex-col items-center gap-3">
                    <span
                      className="hard flex h-14 w-14 items-center justify-center rounded-[10px] bg-[var(--pop-bg)] text-[var(--pop-ink)] [--hard-k:0.5] prepress:bg-[var(--print-bg)] prepress:text-[var(--print-ink)] prepress:shadow-[inset_0_0_0_1.5px_var(--print-ink)] swiss:rounded-none swiss:bg-ink swiss:text-paper"
                      style={
                        {
                          "--print-bg": icon.print.bg,
                          "--print-ink": icon.print.ink,
                          "--pop-bg": icon.pop.bg,
                          "--pop-ink": icon.pop.ink,
                        } as React.CSSProperties
                      }
                    >
                      <ToolIcon name={icon.name} />
                    </span>
                    <span className="label max-w-24 text-center text-muted">{icon.label}</span>
                  </div>
                ))}
                {uiIcons.map(({ label, Icon }) => (
                  <div key={label} className="flex flex-col items-center gap-3">
                    <span className="hard flex h-14 w-14 items-center justify-center rounded-[10px] bg-paper text-ink [--hard-k:0.5] prepress:bg-paper-dim swiss:rounded-none swiss:bg-transparent swiss:text-magenta swiss:shadow-[inset_0_0_0_1.5px_var(--color-ink)] neon:bg-ink/5 neon:text-cyan">
                      <Icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <span className="label text-muted">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Block>

        <Block id="animation">
          <SectionHeading
            index="06"
            kicker="Animation"
            title="Une courbe, trois librairies."
            description="Chaque librairie a un rôle précis. Les durées et courbes viennent de src/lib/tokens.ts et sont partagées par les trois systèmes."
          />
          <MotionDemos />

          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            <div className="grid gap-5 sm:grid-cols-3 lg:col-span-7">
              <EasingCurve name="out · expo" bezier={ease.out.motion} />
              <EasingCurve name="inOut · expo" bezier={ease.inOut.motion} />
              <EasingCurve name="soft · cubic" bezier={ease.soft.motion} />
            </div>
            <div className="card overflow-hidden lg:col-span-5">
              <table className="w-full text-left text-sm">
                <thead className={tableHead}>
                  <tr>
                    <th className="label p-4 font-normal">Token</th>
                    <th className="label p-4 font-normal">Valeur</th>
                    <th className="label p-4 font-normal">Usage</th>
                  </tr>
                </thead>
                <tbody className={tableBody}>
                  {[
                    ["duration.fast", `${duration.fast}s`, "Hover, états"],
                    ["duration.base", `${duration.base}s`, "Apparitions"],
                    ["duration.slow", `${duration.slow}s`, "Titres, cartes"],
                    ["duration.slower", `${duration.slower}s`, "Hero, tracés SVG"],
                    ["spring.snappy", `k${spring.snappy.stiffness} · d${spring.snappy.damping}`, "Pills, toggles"],
                    ["spring.gentle", `k${spring.gentle.stiffness} · d${spring.gentle.damping}`, "Cartes, layout"],
                    ["hard-lift", "0.25s · expo-out", "Soulèvement des cartes (néon)"],
                    ["theme switch", "0.9s · inOut", "Révélation circulaire (View Transitions)"],
                  ].map(([token, value, usage]) => (
                    <tr key={token}>
                      <td className="p-4 font-mono">{token}</td>
                      <td className="p-4 font-mono text-muted">{value}</td>
                      <td className="p-4 text-ink-soft">{usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Block>
      </main>
      <ThemedLayout
        print={<EditorialFooter basePath="/" />}
        neon={<Footer basePath="/" />}
        swiss={<SwissFooter basePath="/" />}
      />
    </>
  );
}
