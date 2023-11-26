import { FrownIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "~/utils/cn";

export default function NoUpgradeButton() {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={cn(
        "flex items-center rounded-lg border border-neutral-200 text-neutral-950 shadow",
        "dark:border-neutral-50/20 dark:text-neutral-50",
        "bg-neutral-950 p-4 text-center align-middle backdrop-blur-sm",
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
            resolvedTheme === "dark" ? "dark" : "",
          )}
        />
      </div>
    </div>
  );
}
