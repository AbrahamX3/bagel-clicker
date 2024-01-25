import Image from "next/image";
import { type Building } from "bagel";
import { motion } from "framer-motion";

import { cn } from "~/utils/cn";
import { formatNumber } from "~/utils/helpers";

interface BuildingButtonProps {
  building: Building;
  buildingId: number;
  theme: string;
  bagels: number;
  handleBuyBuilding: (buildingId: number, building: Building) => void;
}

export default function BuildingButton({
  building,
  buildingId,
  bagels,
  theme,
  handleBuyBuilding,
}: BuildingButtonProps) {
  const isDisabled = bagels < building.current_cost;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={building.name}
      disabled={isDisabled}
      className={cn(
        "group/rays flex items-center rounded-lg  px-2 py-1 align-middle  ",
        "text-center backdrop-blur-md transition-colors duration-150 ease-in",
        "text-neutral-950",
        "dark:border-zinc-600 dark:text-neutral-50",
        "bg-muted disabled:cursor-not-allowed disabled:bg-background disabled:dark:bg-neutral-900",
        "border border-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-500",
      )}
      onClick={() => handleBuyBuilding(buildingId, building)}
    >
      <div className="relative z-10 flex flex-1 overflow-hidden">
        <div className="flex flex-col gap-2 text-left">
          <h3 className="font-bold">{building.name}</h3>
          <p className="flex items-center gap-1 align-middle text-sm">
            <Image
              src="/bagel.webp"
              width={30}
              height={30}
              className="h-auto w-5"
              alt="Bagel"
            />
            {formatNumber(building.current_cost)}
          </p>
        </div>
        <div className="absolute right-0 top-0 z-20 overflow-visible text-6xl font-bold">
          {Intl.NumberFormat("en-US").format(building.level)}
        </div>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-md">
        <div
          className={cn(
            "rays absolute -inset-3 opacity-0 transition-opacity duration-200 ease-in",
            theme === "dark" ? "dark" : "",
            !isDisabled ? "opacity-0 group-hover/rays:opacity-100" : "",
          )}
        />
      </div>
    </motion.button>
  );
}
