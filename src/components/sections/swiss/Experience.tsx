import { FileDown } from "lucide-react";
import { experiences, profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Caption, Panel, Title } from "@/components/swiss/parts";

/** Read left to right, oldest first: the timeline ends on the current job. */
const timeline = [...experiences].reverse();

const yearOf = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

export function Experience() {
  return (
    <Panel id="experience" className="story:w-max" bodyClassName="flex flex-col gap-14 story:flex-row story:gap-0">
      <div className="flex flex-col gap-8 story:w-[28vw] story:justify-between story:pr-[clamp(2rem,4vw,4rem)]">
        <Title accent="de bord.">Journal</Title>
        <div data-reveal className="border-t-2 border-ink pt-3">
          <p className="font-display text-[clamp(4rem,min(9vw,17svh),10rem)] leading-[0.8] font-bold tracking-[-0.06em] text-magenta">
            4+
          </p>
          <Caption className="mt-2 text-ink-soft">ans entre agences, studios et imprimerie</Caption>
          <Button href={profile.cv} download={profile.cvFileName} variant="ink" magnetic={false} className="mt-6">
            CV complet <FileDown aria-hidden className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ol className="grid gap-12 md:grid-cols-2 story:flex story:items-start story:gap-0 story:self-center">
        {timeline.map((job, i) => (
          <li
            key={job.company}
            data-reveal
            className="relative story:w-[clamp(17rem,22vw,23rem)] story:pr-[clamp(1.5rem,2.5vw,2.5rem)]"
          >
            <p
              className={cn(
                "font-display text-[clamp(3rem,min(6vw,11svh),6.5rem)] leading-[0.85] font-bold tracking-[-0.06em] tabular-nums",
                job.current ? "text-magenta" : i > 0 && yearOf(timeline[i - 1].period) === yearOf(job.period) ? "text-ink/20" : "text-ink",
              )}
            >
              {yearOf(job.period)}
            </p>
            <div className="relative mt-4 border-t-2 border-ink pt-5">
              <span
                aria-hidden
                className={cn("absolute -top-[7px] left-0 h-3 w-3", job.current ? "bg-magenta" : "bg-ink")}
              />
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted">
                {job.period}
                {job.current && <span className="bg-magenta px-1.5 py-0.5 text-xs text-paper">En cours</span>}
              </p>
              <h3 className="mt-3 text-[clamp(1.6rem,2.3vw,2.4rem)] leading-none font-bold tracking-[-0.04em]">
                {job.company}
              </h3>
              <p className="mt-1.5 font-medium">{job.role}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                {job.tasks.map((task) => (
                  <li key={task} className="grid grid-cols-[1rem_minmax(0,1fr)]">
                    <span aria-hidden className="text-magenta">
                      –
                    </span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
