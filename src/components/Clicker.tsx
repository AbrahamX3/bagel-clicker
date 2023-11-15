"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { romanize } from "~/utils/helpers";

interface Building {
  id: number;
  name: string;
  level: number;
  perSecond: number;
  multipler: number;
  cost: number;
  upgrade: Upgrade;
}

interface Upgrade {
  name: string;
  multiplier: number;
  cost: number;
  level: number;
  requiredLevel: number;
}

const initialBuildings: Building[] = [
  {
    id: 0,
    name: "Cursor",
    level: 0,
    perSecond: 0.1,
    cost: 15,
    multipler: 1,
    upgrade: {
      name: "Cursor Power I",
      level: 0,
      cost: 100,
      requiredLevel: 1,
      multiplier: 1,
    },
  },
  {
    id: 1,
    name: "Frozen Bagel",
    level: 0,
    perSecond: 1,
    cost: 100,
    multipler: 1,
    upgrade: {
      requiredLevel: 1,
      name: "Frozen Bagel Power I",
      level: 0,
      cost: 1000,
      multiplier: 1,
    },
  },
  {
    id: 2,
    name: "Bagel Bakery",
    level: 0,
    perSecond: 8,
    cost: 1100,
    multipler: 1,
    upgrade: {
      requiredLevel: 1,
      name: "Bagel Bakery Power I",
      level: 0,
      cost: 11000,
      multiplier: 1,
    },
  },
  {
    id: 3,
    name: "Super Market",
    level: 0,
    perSecond: 47,
    cost: 12000,
    multipler: 1,
    upgrade: {
      requiredLevel: 1,
      name: "Super Market Power I",
      level: 0,
      cost: 120000,
      multiplier: 1,
    },
  },
  {
    id: 4,
    name: "Bagel Factory",
    level: 0,
    perSecond: 260,
    cost: 130000,
    multipler: 1,
    upgrade: {
      requiredLevel: 1,
      name: "Bagel Factory Power I",
      level: 0,
      cost: 1300000,
      multiplier: 1,
    },
  },
];

interface ClickIndicator {
  id: number;
  x: number;
  y: number;
}

export default function Clicker() {
  const [count, setCount] = useState(0);
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [perSecond, setPerSecond] = useState(0);
  const [clickIndicators, setClickIndicators] = useState<ClickIndicator[]>([]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event) {
        const newClickIndicator: ClickIndicator = {
          id: Date.now(),
          x: event.pageX,
          y: event.pageY,
        };
        setClickIndicators([...clickIndicators, newClickIndicator]);
        setCount((prevCount) => prevCount + buildings[0].multipler * 1);
      }
    },
    [buildings, clickIndicators]
  );

  const handleAutoClick = useCallback(() => {
    console.log("auto");
    setCount((prevCount) => prevCount + perSecond);
  }, [perSecond]);

  const handleBuilding = useCallback(
    (index: number, building: Building) => {
      if (count >= building.cost) {
        setCount((prevCount) => prevCount - building.cost);

        setBuildings((prevBuildings) => {
          return prevBuildings.map((building, idx) => {
            if (idx === index) {
              return {
                ...building,
                cost: Math.floor(building.cost * 1.5),
                level: building.level + 1,
                perSecond: building.perSecond * 1.5,
              };
            }
            return building;
          });
        });
      }
    },
    [count]
  );

  function handleUpgrade(buildingId: number, upgrade: Upgrade) {
    setBuildings((prevBuildings) => {
      return prevBuildings.map((building) => {
        if (building.id === buildingId && count >= upgrade.cost) {
          const updatedBuilding = {
            ...building,
            level: building.level + 1,
            cost: Math.floor(building.cost * 1.5),
            perSecond: building.perSecond * 1.5,
            upgrade: {
              ...upgrade,
              cost: Math.floor(upgrade.cost * 1.5),
              name: `${building.name} Power ${romanize(
                upgrade.level === 0 ? 2 : upgrade.level + 1
              )}`,
              multiplier: upgrade.multiplier * 1.25,
              level: upgrade.level + 1,
              requiredLevel: upgrade.requiredLevel * 5,
            },
          };
          return updatedBuilding;
        }

        return building;
      });
    });

    setCount((prevCount) => prevCount - upgrade.cost);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let bagelsPerSecond = 0;

    if (buildings.some((building) => building.level > 0)) {
      bagelsPerSecond = buildings.reduce((totalBPS, building) => {
        if (building.level > 0) {
          return totalBPS + building.perSecond * building.multipler;
        }
        return totalBPS;
      }, 0);
    }

    setPerSecond(bagelsPerSecond);

    if (bagelsPerSecond > 0) {
      interval = setInterval(() => {
        handleAutoClick();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [buildings, handleAutoClick]);

  useEffect(() => {
    const clearIndicator = (id: number) => {
      setClickIndicators((prevIndicators) =>
        prevIndicators.filter((indicator) => indicator.id !== id)
      );
    };

    clickIndicators.forEach((indicator) => {
      const timeout = setTimeout(() => clearIndicator(indicator.id), 500);
      return () => clearTimeout(timeout);
    });
  }, [clickIndicators]);

  return (
    <div className="flex gap-4">
      <div>
        <div className="text-center flex gap-2 flex-col">
          <span className="font-bold text-lg ">{count.toFixed(0)} Bagels</span>
          <span className="font-semibold text-xs">
            {perSecond.toFixed(2)} bagels/s
          </span>
        </div>
        <button
          className="p-4 active:scale-105 transition-all duration-75  outline-none focus:border-none"
          onClick={(e) => {
            e.preventDefault();
            handleClick(e);
          }}
        >
          <Image
            src="/bagel.webp"
            alt="Bagel"
            draggable={false}
            width={150}
            height={150}
            className="w-full h-auto aspect-square"
          />
        </button>

        <AnimatePresence initial={false}>
          {clickIndicators.map((indicator) => (
            <motion.span
              key={indicator.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="font-semibold pointer-events-none text-sm absolute"
              style={{
                left: indicator.x,
                top: indicator.y,
              }}
            >
              +{buildings[0].multipler * 1}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg">Upgrades</h2>
        <AnimatePresence>
          <div className="flex flex-row gap-4">
            {buildings
              .map((building) => {
                return { ...building.upgrade, currentLevel: building.level };
              })
              .some(
                (upgrade) => upgrade.currentLevel >= upgrade.requiredLevel
              ) ? (
              buildings
                .map((building) => {
                  return { ...building.upgrade, currentLevel: building.level };
                })
                .map(
                  (upgrade, index) =>
                    upgrade.currentLevel >= upgrade.requiredLevel && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key={upgrade.name}
                        className="flex flex-col gap-2"
                      >
                        <h3>{upgrade.name}</h3>
                        <p>Cost: {upgrade.cost}</p>
                        <button
                          disabled={upgrade.cost >= count}
                          className="bg-green-700 p-2 rounded-md disabled:bg-green-950"
                          onClick={() => handleUpgrade(index, upgrade)}
                        >
                          Purchase
                        </button>
                      </motion.div>
                    )
                )
            ) : (
              <span>No upgrades available</span>
            )}
          </div>
        </AnimatePresence>
        <h2 className="font-bold text-lg">Buildings</h2>
        <AnimatePresence>
          <div className="flex flex-row gap-4">
            {buildings.map((building, index) =>
              index !== 0 ? (
                building.level !== 0 ||
                (count >= building.cost ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={building.name}
                    className="flex flex-col gap-2"
                  >
                    <h3>
                      {building.name} - {building.level}
                    </h3>
                    <p>Cost: {building.cost}</p>
                    <button
                      disabled={count < building.cost}
                      className="bg-blue-700 p-2 rounded-md disabled:bg-blue-950"
                      onClick={() => handleBuilding(index, building)}
                    >
                      Purchase
                    </button>
                  </motion.div>
                ) : (
                  buildings[index - 1].level !== 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      key={building.name}
                      className="flex flex-col gap-2"
                    >
                      <h3>
                        {building.name} - {building.level}
                      </h3>
                      <p>Cost: {building.cost}</p>
                      <button
                        disabled={count < building.cost}
                        className="bg-blue-700 p-2 rounded-md disabled:bg-blue-950"
                        onClick={() => handleBuilding(index, building)}
                      >
                        Purchase
                      </button>
                    </motion.div>
                  )
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  key={building.name}
                  className="flex flex-col gap-2"
                >
                  <h3>
                    {building.name} - {building.level}
                  </h3>
                  <p>Cost: {building.cost}</p>
                  <button
                    disabled={count < building.cost}
                    className="bg-blue-700 p-2 rounded-md disabled:bg-blue-950"
                    onClick={() => handleBuilding(index, building)}
                  >
                    Purchase
                  </button>
                </motion.div>
              )
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
