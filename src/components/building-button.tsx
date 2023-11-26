import Image from "next/image";
import { motion } from "framer-motion";

import { type Building } from "~/hooks/useBagel";
import { cn } from "~/utils/cn";
import { formatNumber } from "~/utils/helpers";

interface BuildingProps {
  building: Building;
  buildingId: number;
  bagels: number;
  handleBuyBuilding: (buildingId: number, building: Building) => void;
}

export default function BuildingButton({
  building,
  buildingId,
  bagels,
  handleBuyBuilding,
}: BuildingProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={building.name}
      disabled={bagels < building.current_cost}
      className={cn(
        "group/lights flex items-center rounded-lg border border-neutral-300 text-neutral-950 shadow dark:border-neutral-200",
        "dark:border-neutral-50/20 dark:text-neutral-50",
        "bg-white px-2 py-1 text-center align-middle backdrop-blur-sm transition-colors duration-150 ease-in dark:bg-neutral-700",
        "disabled:cursor-not-allowed disabled:bg-white/5 disabled:hover:border-slate-100/20",
        "hover:border-slate-100/50",
      )}
      onClick={() => handleBuyBuilding(buildingId, building)}
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
          {Intl.NumberFormat("en-US").format(building.level)}
        </div>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-md">
        <div className="rays absolute -inset-3 opacity-0 backdrop-blur-2xl transition-opacity duration-300 ease-in  group-hover/lights:opacity-90" />
      </div>
    </motion.button>
  );
}
