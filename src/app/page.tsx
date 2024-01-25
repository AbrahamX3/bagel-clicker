"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type Building, type ClickIndicator, type SaveBagel, type Upgrade } from "bagel";
import { AnimatePresence, motion } from "framer-motion";
import { SaveIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

import Bagel from "~/components/bagel";
import BuildingButton from "~/components/building-button";
import NoUpgradeButton from "~/components/no-upgrade-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import UpgradeButton from "~/components/upgrade-button";
import { cn } from "~/utils/cn";
import { formatNumber } from "~/utils/helpers";

const LOCALSTORAGE_NAME = "bagel-clicker";

const initialBuildings: Building[] = [
  {
    id: 0,
    name: "Cursor",
    level: 0,
    current_cps: 1,
    current_cost: 15,
    base_cps: 1,
    base_cost: 15,
    cost_scale: 1.15,
    cps_scale: 0.1,
    upgrade: {
      name: "Cursor Power",
      level: 0,
      current_cost: 100,
      base_cost: 100,
      required_level: 1,
      current_cps: 0,
    },
  },
  {
    id: 1,
    name: "Frozen Bagel",
    level: 0,
    current_cps: 4,
    current_cost: 100,
    base_cps: 4,
    base_cost: 100,
    cost_scale: 1.2,
    cps_scale: 0.15,
    upgrade: {
      name: "Frozen Bagel Power",
      level: 0,
      current_cost: 1000,
      base_cost: 1000,
      required_level: 1,
      current_cps: 0,
    },
  },
  {
    id: 2,
    name: "Bagel Bakery",
    level: 0,
    current_cps: 8,
    current_cost: 1100,
    base_cps: 8,
    base_cost: 1100,
    cost_scale: 1.7,
    cps_scale: 0.2,
    upgrade: {
      required_level: 1,
      name: "Bagel Bakery Power",
      level: 0,
      current_cost: 11000,
      base_cost: 11000,
      current_cps: 0,
    },
  },
  {
    id: 3,
    name: "Super Market",
    level: 0,
    current_cps: 47,
    current_cost: 12000,
    base_cps: 47,
    base_cost: 12000,
    cost_scale: 2.2,
    cps_scale: 0.25,
    upgrade: {
      required_level: 1,
      name: "Super Market Power",
      level: 0,
      current_cost: 120000,
      base_cost: 120000,
      current_cps: 0,
    },
  },
  {
    id: 4,
    name: "Factory",
    level: 0,
    current_cps: 260,
    current_cost: 130000,
    base_cps: 260,
    base_cost: 130000,
    cost_scale: 2.7,
    cps_scale: 0.3,
    upgrade: {
      required_level: 1,
      name: "Factory Power",
      level: 0,
      current_cost: 1300000,
      base_cost: 1300000,
      current_cps: 0,
    },
  },
  {
    id: 5,
    name: "Bagel Emporium",
    level: 0,
    current_cps: 1400,
    current_cost: 1400000,
    base_cps: 1400,
    base_cost: 1400000,
    cost_scale: 3.2,
    cps_scale: 0.35,
    upgrade: {
      required_level: 1,
      name: "Bagel Emporium Power",
      level: 0,
      current_cost: 14000000,
      base_cost: 14000000,
      current_cps: 0,
    },
  },
  {
    id: 6,
    name: "Cream Cheese Creamery",
    level: 0,
    current_cps: 7800,
    current_cost: 20000000,
    base_cps: 7800,
    base_cost: 20000000,
    cost_scale: 3.7,
    cps_scale: 0.4,
    upgrade: {
      required_level: 1,
      name: "Cream Cheese Creamery Power",
      level: 0,
      current_cost: 200000000,
      base_cost: 200000000,
      current_cps: 0,
    },
  },
  {
    id: 7,
    name: "Bagel Seasoning Factory",
    level: 0,
    current_cps: 44000,
    current_cost: 330000000,
    base_cps: 44000,
    base_cost: 330000000,
    cost_scale: 4.2,
    cps_scale: 0.45,
    upgrade: {
      required_level: 1,
      name: "Bagel Seasoning Factory Power",
      level: 0,
      current_cost: 3300000000,
      base_cost: 3300000000,
      current_cps: 0,
    },
  },
  {
    id: 8,
    name: "Bagel Multiverse",
    level: 0,
    current_cps: 260000,
    current_cost: 5100000000,
    base_cps: 260000,
    base_cost: 5100000000,
    cost_scale: 4.7,
    cps_scale: 0.5,
    upgrade: {
      required_level: 1,
      name: "Bagel Multiverse Power",
      level: 0,
      current_cost: 51000000000,
      base_cost: 51000000000,
      current_cps: 0,
    },
  },
  {
    id: 9,
    name: "Your Fridge",
    level: 0,
    current_cps: 1600000,
    current_cost: 7500000000,
    base_cps: 1600000,
    base_cost: 7500000000,
    cost_scale: 5.2,
    cps_scale: 0.55,
    upgrade: {
      required_level: 1,
      name: "Your Fridge Power",
      level: 0,
      current_cost: 75000000000,
      base_cost: 75000000000,
      current_cps: 0,
    },
  },
];

export default function Shell() {
  const gameSaveTimer = useRef(0);
  const [loadGameSave, setGameSave] = useLocalStorage<SaveBagel>(
    LOCALSTORAGE_NAME,
    {
      bagels: 0,
      buildings: initialBuildings,
    },
  );
  const [bagels, setBagels] = useState(0);
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [perSecond, setPerSecond] = useState(0);
  const [clickIndicators, setClickIndicators] = useState<ClickIndicator[]>([]);
  const { resolvedTheme = "dark" } = useTheme();

  function saveTrigger() {
    setGameSave({
      bagels,
      buildings,
    });
    toast.success("Bagels have been stored in the freezer!");
  }

  useHotkeys("ctrl+s", (event) => {
    event.preventDefault();
    saveTrigger();
  });

  useEffect(() => {
    if (loadGameSave) {
      setBuildings(loadGameSave.buildings);
      setBagels(loadGameSave.bagels);
    }
  }, [loadGameSave]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event) {
        const clickAmount =
          buildings[0]?.upgrade.level === 0
            ? 1
            : buildings[0]?.upgrade.current_cps &&
                buildings[0]?.upgrade.current_cps > 0
              ? buildings[0]?.upgrade.current_cps
              : 1;

        const newClickIndicator: ClickIndicator = {
          id: Date.now(),
          x: event.pageX,
          y: event.pageY,
          bagels: clickAmount,
        };
        setClickIndicators([...clickIndicators, newClickIndicator]);

        setBagels((prevCount) => prevCount + clickAmount);
      }
    },
    [buildings, clickIndicators],
  );

  const handleAutoClick = useCallback(() => {
    setBagels((prevCount) => prevCount + perSecond);
  }, [perSecond]);

  const handleBuyBuilding = useCallback(
    (buildingId: number, building: Building) => {
      if (bagels >= building.current_cost) {
        setBagels((prevCount) => prevCount - building.current_cost);
        setBuildings((prevBuildings) => {
          return prevBuildings.map((building) => {
            if (building.id === buildingId) {
              return {
                ...building,
                current_cost: Math.floor(
                  building.base_cost *
                    building.cost_scale ** (building.level + 1) +
                    building.current_cost,
                ),
                current_cps:
                  building.base_cps *
                    (1 + building.level * building.cps_scale) +
                  building.current_cps,
                level: building.level + 1,
              };
            }
            return building;
          });
        });
      }
    },
    [bagels],
  );

  const handleBuyUpgrade = useCallback(
    (buildingId: number, upgrade: Upgrade) => {
      setBuildings((prevBuildings) => {
        return prevBuildings.map((building) => {
          if (building.id === buildingId && bagels >= upgrade.current_cost) {
            return {
              ...building,
              current_cps:
                building.base_cps *
                  (1 + upgrade.level * (building.cps_scale * 4)) +
                building.current_cps,
              upgrade: {
                ...upgrade,
                current_cps:
                  upgrade.current_cps + upgrade.level === 0
                    ? 2
                    : upgrade.level++ * ((building.id === 0 ? 2 : 1) * 4),
                current_cost: Math.floor(
                  upgrade.base_cost * 1.5 ** (upgrade.level + 1) +
                    upgrade.current_cost,
                ),
                level: upgrade.level + 1,
                required_level:
                  upgrade.level === 0 ? 5 : upgrade.required_level + 5,
              },
            };
          }
          return building;
        });
      });

      setBagels((prevCount) => prevCount - upgrade.current_cost);
    },
    [bagels],
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let bagelsPerSecond = 0;

    if (buildings.some((building) => building.level > 0)) {
      bagelsPerSecond = buildings.reduce((totalBPS, building) => {
        if (building.level > 0 && building.id !== 0) {
          return totalBPS + building.current_cps;
        } else if (building.id === 0) {
          return totalBPS + building.current_cps + (building.level * 0.3 - 0.1);
        }
        return totalBPS;
      }, 0);
    }

    setPerSecond(bagelsPerSecond);

    if (bagelsPerSecond > 0) {
      interval = setInterval(() => {
        handleAutoClick();
        gameSaveTimer.current += 1;
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [buildings, handleAutoClick]);

  if (gameSaveTimer.current === 20) {
    gameSaveTimer.current = 0;
    saveTrigger();
  }

  useEffect(() => {
    const clearIndicator = (id: number) => {
      setClickIndicators((prevIndicators) =>
        prevIndicators.filter((indicator) => indicator.id !== id),
      );
    };

    clickIndicators.forEach((indicator) => {
      const timeout = setTimeout(() => clearIndicator(indicator.id), 500);
      return () => clearTimeout(timeout);
    });
  }, [clickIndicators]);

  const isUpgradeAvaliable = buildings
    .map((building) => {
      return { ...building.upgrade, currentLevel: building.level };
    })
    .some((upgrade) => upgrade.currentLevel >= upgrade.required_level);

  return (
    <main className="container grid w-full flex-grow grid-cols-1 gap-4 overflow-y-auto py-2 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {formatNumber(bagels)} Bagels
          </CardTitle>
          <CardDescription className="text-sm">
            {formatNumber(perSecond)} bagels/s
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-between gap-2">
            <button
              className="p-4 outline-none transition-all duration-75 focus:border-none active:scale-105"
              onClick={(e) => {
                e.preventDefault();
                handleClick(e);
              }}
            >
              <Bagel />
            </button>
            <button
              onClick={saveTrigger}
              className={cn(
                "flex items-center rounded-lg border border-neutral-200 bg-neutral-50/10 text-neutral-950 shadow hover:bg-neutral-50/40",
                "dark:border-neutral-50/20 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-900",
                "w-full p-2 text-center align-middle backdrop-blur-sm transition-colors duration-150 ease-in-out",
              )}
            >
              <div className="relative z-10 flex flex-1 items-center justify-between gap-4 overflow-hidden align-middle">
                <p className="font-semibold">Save bagels</p>
                <SaveIcon className="h-4 w-4" />
              </div>
              <div className="absolute inset-0 z-0 overflow-hidden rounded-md">
                <div
                  className={cn(
                    "rays absolute -inset-3 opacity-20 backdrop-blur-2xl transition-opacity duration-300 ease-in",
                    resolvedTheme === "dark" ? "dark" : "",
                  )}
                />
              </div>
            </button>
          </div>
          <AnimatePresence initial={false}>
            {clickIndicators.map((indicator) => (
              <motion.span
                key={indicator.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none absolute z-10 text-sm font-semibold"
                style={{
                  left: indicator.x,
                  top: indicator.y,
                }}
              >
                +{formatNumber(indicator.bagels)}
              </motion.span>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upgrades</CardTitle>
        </CardHeader>
        <ScrollArea className="h-full max-h-[70vh] pb-8">
          <AnimatePresence initial={false}>
            <CardContent className="flex flex-col gap-4 align-middle">
              {isUpgradeAvaliable ? (
                buildings
                  .map((building) => {
                    return {
                      ...building.upgrade,
                      currentLevel: building.level,
                    };
                  })
                  .map(
                    (upgrade, index) =>
                      upgrade.currentLevel >= upgrade.required_level &&
                      upgrade.currentLevel !== 0 && (
                        <UpgradeButton
                          theme={resolvedTheme}
                          building={upgrade}
                          buildingId={index}
                          bagels={bagels}
                          handleBuyUpgrade={handleBuyUpgrade}
                          key={upgrade.name}
                        />
                      ),
                  )
              ) : (
                <NoUpgradeButton theme={resolvedTheme} />
              )}
            </CardContent>
          </AnimatePresence>
        </ScrollArea>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Buildings</CardTitle>
        </CardHeader>
        <ScrollArea className="h-full max-h-[70vh] pb-8">
          <AnimatePresence>
            <CardContent className="flex flex-col gap-4 align-middle">
              {buildings.map((building) => (
                <BuildingButton
                  building={building}
                  theme={resolvedTheme}
                  buildingId={building.id}
                  bagels={bagels}
                  key={building.name}
                  handleBuyBuilding={handleBuyBuilding}
                />
              ))}
            </CardContent>
          </AnimatePresence>
        </ScrollArea>
      </Card>
    </main>
  );
}
