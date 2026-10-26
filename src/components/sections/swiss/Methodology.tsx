import { ArrowRight } from "lucide-react";
import { methodology } from "@/data/profile";
import { Caption, Panel, Title } from "@/components/swiss/parts";

export function Methodology() {
  return (
    <Panel
      id="methodology"
      className="story:w-max"
      bodyClassName="grid gap-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 story:flex story:gap-0"
    >
      <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-3 story:w-[28vw] story:justify-between story:pr-[clamp(2rem,4vw,4rem)]">
        <Title accent="étapes.">Cinq</Title>
        <Caption className="max-w-xs text-base">
          Du brief au fichier prêt à imprimer : la même méthode pour un logo, une campagne ou une enseigne.
        </Caption>
      </div>

      {methodology.map((step, i) => (
        <article
          key={step.step}
          data-reveal
          style={{ "--i": i } as React.CSSProperties}
          className="flex flex-col border-t-2 border-ink pt-4 story:w-[clamp(15rem,18vw,19rem)] story:pt-[calc(var(--i)*7svh)] story:border-t-0 story:pr-6"
        >
          <span className="font-display text-[clamp(4.5rem,min(9vw,17svh),10rem)] leading-[0.8] font-bold tracking-[-0.07em] text-magenta tabular-nums">
            {step.step}
          </span>
          <div className="mt-5 flex items-center gap-3 border-t-2 border-ink pt-4">
            <h3 className="text-2xl leading-tight font-bold tracking-[-0.03em]">{step.title}</h3>
            {i < methodology.length - 1 && <ArrowRight aria-hidden className="ml-auto hidden h-5 w-5 shrink-0 story:block" />}
          </div>
          <p className="mt-3 text-ink-soft">{step.description}</p>
        </article>
      ))}
    </Panel>
  );
}
