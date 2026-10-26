import { aboutText, languages, qualities, stats } from "@/data/profile";
import { Caption, Panel, Title } from "@/components/swiss/parts";

export function About() {
  return (
    <Panel
      id="about"
      className="story:w-[128vw]"
      bodyClassName="grid gap-14 md:grid-cols-12 md:gap-x-6 story:flex story:gap-[clamp(2.5rem,4.5vw,5rem)]"
    >
      <div className="flex flex-col gap-10 md:col-span-12 story:w-[46vw] story:justify-between">
        <Title accent="à la plaque.">Du concept</Title>
        <p data-reveal className="text-[clamp(1.25rem,1.9vw,2rem)] leading-[1.22] font-medium tracking-[-0.02em]">
          {aboutText}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-7 story:w-[36vw] story:content-between story:gap-y-0">
        {stats.map((s) => (
          <div key={s.label} data-reveal className="flex flex-col-reverse border-t-2 border-ink pt-3">
            <dt className="mt-2 text-sm font-medium text-ink-soft">{s.label}</dt>
            <dd className="font-display text-[clamp(4rem,min(9vw,17svh),10rem)] leading-[0.8] font-bold tracking-[-0.06em] text-magenta tabular-nums">
              {s.value}
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-10 sm:grid-cols-2 md:col-span-5 md:grid-cols-1 story:flex story:w-[22vw] story:flex-col story:justify-between">
        <div data-reveal>
          <Caption>Qualités</Caption>
          <ol className="mt-3 border-t-2 border-ink">
            {qualities.map((q, i) => (
              <li key={q} className="flex gap-4 border-b border-line py-2 text-lg font-medium tracking-[-0.01em]">
                <span className="w-5 text-magenta tabular-nums">{i + 1}</span>
                {q}
              </li>
            ))}
          </ol>
        </div>
        <div data-reveal>
          <Caption>Langues</Caption>
          <ol className="mt-3 border-t-2 border-ink">
            {languages.map((l, i) => (
              <li key={l} className="flex gap-4 border-b border-line py-2 text-lg font-medium tracking-[-0.01em]">
                <span className="w-5 text-magenta tabular-nums">{i + 1}</span>
                {l}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Panel>
  );
}
