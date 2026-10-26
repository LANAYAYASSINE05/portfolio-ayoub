import { skills } from "@/data/profile";
import { Caption, Panel, Title } from "@/components/swiss/parts";

export function Skills() {
  return (
    <Panel
      id="skills"
      className="story:w-max"
      bodyClassName="grid gap-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 story:flex story:gap-0"
    >
      <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-3 story:w-[30vw] story:justify-between story:pr-[clamp(2rem,4vw,4rem)]">
        <Title accent="faire.">Ce que je sais</Title>
        <Caption className="max-w-xs text-base">
          Cinq compétences, de la stratégie de marque à la gestion du planning d’impression.
        </Caption>
      </div>

      {skills.map((skill, i) => (
        <article
          key={skill.title}
          data-reveal
          className="group flex flex-col justify-between gap-8 border-t-2 border-ink pt-4 story:w-[clamp(15rem,19vw,21rem)] story:border-t-0 story:border-l story:border-line story:px-6 story:pt-0"
        >
          <span
            data-drift="12"
            aria-hidden
            className="block font-display text-[clamp(5rem,min(11vw,22svh),13rem)] leading-[0.8] font-bold tracking-[-0.07em] tabular-nums transition-colors duration-300 group-hover:text-magenta"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="border-t-2 border-ink pt-4 story:border-t-2">
            <h3 className="text-2xl leading-tight font-bold tracking-[-0.03em]">{skill.title}</h3>
            <p className="mt-3 text-ink-soft">{skill.description}</p>
          </div>
        </article>
      ))}
    </Panel>
  );
}
