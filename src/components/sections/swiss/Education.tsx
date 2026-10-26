import { education } from "@/data/profile";
import { Caption, Panel, Title } from "@/components/swiss/parts";

export function Education() {
  return (
    <Panel id="education" className="story:w-[105vw]" bodyClassName="grid gap-12 md:grid-cols-12 md:gap-x-6">
      <div className="flex flex-col gap-6 md:col-span-12 story:col-span-3 story:justify-between">
        <Title accent="& diplômes.">Formation</Title>
        <Caption className="max-w-xs text-base">Communication visuelle, infographie et prépresse — trois étapes, trois diplômes.</Caption>
      </div>

      {education.map((item, i) => (
        <article
          key={item.degree}
          data-reveal
          className="flex flex-col justify-between gap-8 border-t-2 border-ink pt-4 md:col-span-4 story:col-span-3"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-magenta tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm font-medium text-muted">{item.school}</span>
          </div>
          <div>
            <p className="font-display text-[clamp(3rem,min(5.4vw,12svh),6rem)] leading-[0.85] font-bold tracking-[-0.06em] tabular-nums">
              {item.period.replace(/(\d{4})\s*—\s*\d{2}(\d{2})/, "$1–$2")}
            </p>
            <h3 className="mt-6 text-2xl leading-tight font-bold tracking-[-0.03em]">{item.degree}</h3>
            <p className="mt-3 max-w-sm text-ink-soft">{item.note}</p>
          </div>
        </article>
      ))}
    </Panel>
  );
}
