import { editable, getGlobal } from "@/lib/cms";
import { iconFor } from "@/lib/icons";

export default async function SafetyDiagram() {
  const [page, ed] = await Promise.all([getGlobal("fleet-page"), editable("fleet-page")]);
  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 md:grid-cols-4 lg:px-8">
      {(page.safety ?? []).map((item, i) => {
        const Icon = iconFor(item.icon);
        return (
          <li key={item.id ?? i} className="flex flex-col items-center gap-4 text-center">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy text-gold shadow-lg ring-4 ring-gold/30">
              <Icon className="h-9 w-9" strokeWidth={1.6} />
            </span>
            <span className="text-base font-bold leading-snug text-navy" {...ed(`safety.${i}.text`)}>
              {item.text}
            </span>
            {item.sub && (
              <span className="-mt-2 text-sm leading-snug text-navy/70" {...ed(`safety.${i}.sub`)}>
                {item.sub}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
