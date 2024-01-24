import { FrownIcon } from "lucide-react";

import { cn } from "~/utils/cn";

export default function NoUpgradeButton({ theme }: { theme: string }) {
  return (
    <div
      className={cn(
        "flex items-center rounded-lg border border-neutral-200 bg-neutral-50/10 text-neutral-950 shadow",
        "dark:border-neutral-50/20 dark:bg-neutral-950 dark:text-neutral-50",
        "p-4 text-center align-middle backdrop-blur-sm",
      )}
    >
      <div className="relative z-10 flex flex-1 items-center justify-between gap-4 overflow-hidden align-middle">
        <p className="font-semibold">No Upgrades Available</p>
        <FrownIcon className="h-4 w-4" />
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-md">
        <div
          className={cn(
            "rays absolute -inset-3 opacity-20 backdrop-blur-2xl transition-opacity duration-300 ease-in",
            theme === "dark" ? "dark" : "",
          )}
        />
      </div>
    </div>
  );
}
