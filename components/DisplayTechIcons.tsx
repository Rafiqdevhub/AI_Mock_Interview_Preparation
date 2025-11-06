import Image from "next/image";
import { cache } from "react";

import { cn, getTechLogos } from "@/lib/utils";

const getCachedTechLogos = cache(getTechLogos);

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getCachedTechLogos(techStack);

  const visibleIcons = techIcons.slice(0, 3);

  const totalTechs = techStack.length;
  const hiddenTechs = totalTechs > 3 ? totalTechs - 3 : 0;

  return (
    <div
      className="flex flex-row"
      role="group"
      aria-label={`Technology stack: ${techStack.join(", ")}`}
    >
      {visibleIcons.map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>

          <Image
            src={url}
            alt={tech}
            width={20}
            height={20}
            className="size-5"
            loading="lazy"
          />
        </div>
      ))}

      {hiddenTechs > 0 && (
        <div
          className="relative group bg-dark-300 rounded-full p-2 flex flex-center -ml-3"
          aria-label={`${hiddenTechs} more technologies`}
        >
          <span className="tech-tooltip">+{hiddenTechs} more</span>
          <span className="text-xs font-medium">+{hiddenTechs}</span>
        </div>
      )}
    </div>
  );
};

export default DisplayTechIcons;
