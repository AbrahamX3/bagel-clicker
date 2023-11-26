import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { type Upgrade } from "~/hooks/useBagel";
import { cn } from "~/utils/cn";
import { formatNumber, romanize } from "~/utils/helpers";

interface BuildingProps {
  building: Upgrade;
  buildingId: number;
  bagels: number;
  handleBuyUpgrade: (buildingId: number, building: Upgrade) => void;
}

export default function UpgradeButton({
  building,
  buildingId,
  bagels,
  handleBuyUpgrade,
}: BuildingProps) {
  const { resolvedTheme } = useTheme();

  const isDisabled = bagels <= building.current_cost;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={building.name}
      disabled={isDisabled}
      className={cn(
        "group/rays flex items-center rounded-lg  px-2 py-1 align-middle shadow ",
        "text-center backdrop-blur-md transition-colors duration-150 ease-in",
        " text-neutral-950",
        "dark:text-neutral-50",
        "bg-muted disabled:cursor-not-allowed disabled:bg-background disabled:dark:bg-neutral-900",
        "border border-zinc-600 hover:border-zinc-300 disabled:hover:border-zinc-900 dark:hover:border-zinc-100",
      )}
      onClick={() => handleBuyUpgrade(buildingId, building)}
    >
      <div className="relative z-10 flex flex-1 overflow-hidden">
        <div className="flex flex-col gap-2 text-left">
          <h3 className="font-bold">{building.name}</h3>
          <p className="flex items-center gap-1 align-middle text-sm">
            <Image
              src="/bagel.webp"
              className="h-4 w-4"
              width={30}
              height={30}
              alt="Bagel"
            />
            {formatNumber(building.current_cost)}
          </p>
        </div>
        <div className="absolute right-0 top-0 z-20 overflow-visible text-6xl font-bold">
          {romanize(building.level)}
        </div>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-md">
        <div
          className={cn(
            "rays absolute -inset-3 opacity-0 transition-opacity duration-200 ease-in",
            resolvedTheme === "dark" ? "dark" : "",
            !isDisabled ? "opacity-0 group-hover/rays:opacity-100" : "",
          )}
        />
      </div>
    </motion.button>
  );
}
