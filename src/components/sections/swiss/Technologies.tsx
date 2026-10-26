import { tools, type Tool } from "@/data/profile";
import { ToolIcon, isAdobe } from "@/components/icons/ToolIcon";
import { Caption, Panel, Title } from "@/components/swiss/parts";

const categories: Tool["category"][] = ["Adobe", "Prépresse", "Production"];

export function Technologies() {
  return (
    <Panel
      id="technologies"
      className="story:w-[112vw]"
      bodyClassName="grid gap-12 md:grid-cols-12 md:gap-x-6 story:grid-rows-[auto_minmax(0,1fr)] story:gap-y-0"
    >
      <div className="flex flex-col gap-6 md:col-span-12 story:col-span-3 story:row-span-2 story:justify-between">
        <Title accent="à outils.">La boîte</Title>
        <Caption className="max-w-xs text-base">
          Trois logiciels Adobe pour créer, six savoir-faire d’atelier pour que le fichier sorte juste — du montage
          offset à la découpe laser.
        </Caption>
      </div>

      {categories.map((category, c) => {
        const items = tools.filter((t) => t.category === category);
        return (
          <div key={category} data-reveal className="md:col-span-4 story:col-span-3 story:row-start-2 story:self-end">
            <div className="flex items-baseline justify-between border-t-2 border-ink pt-3">
              <h3 className="text-xl font-bold tracking-[-0.02em]">{category}</h3>
              <span className="text-sm font-medium text-magenta tabular-nums">0{c + 1}</span>
            </div>
            <ul className="mt-6">
              {items.map((tool) => {
                const n = tools.indexOf(tool) + 1;
                return (
                  <li
                    key={tool.name}
                    className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-line py-3"
                  >
                    <span
                      className={
                        isAdobe(tool.icon)
                          ? "block h-12 w-12"
                          : "flex h-12 w-12 items-center justify-center bg-ink text-paper transition-colors group-hover:bg-magenta"
                      }
                    >
                      <ToolIcon name={tool.icon} />
                    </span>
                    <span className="text-lg leading-tight font-medium tracking-[-0.01em] transition-colors group-hover:text-magenta">
                      {tool.name}
                    </span>
                    <span className="text-sm text-muted tabular-nums">{String(n).padStart(2, "0")}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </Panel>
  );
}
