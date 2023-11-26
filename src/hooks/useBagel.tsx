import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

export interface SaveBagel {
  buildings: Building[];
  bagels: number;
}

export interface Building {
  id: number;
  name: string;
  level: number;
  base_cps: number;
  base_cost: number;
  current_cps: number;
  current_cost: number;
  cost_scale: number;
  cps_scale: number;
  upgrade: Upgrade;
}

export interface Upgrade {
  name: string;
  current_cps: number;
  current_cost: number;
  level: number;
  required_level: number;
  base_cost: number;
}

const COOKIE_NAME = "bagel-clicker";

export default function useBagel({ bagels, buildings }: SaveBagel) {
  const [loadBagels, setCookieValue] = useState(() => {
    const cookie = Cookies.get(COOKIE_NAME);
    return cookie ? (JSON.parse(cookie) as SaveBagel) : null;
  });

  const saveBagels = () => {
    Cookies.set(COOKIE_NAME, JSON.stringify({ bagels, buildings }));
    setCookieValue({ bagels, buildings });
    toast.success("Bagels have been stored in the freezer!");
  };

  useEffect(() => {
    const cookie = Cookies.get(COOKIE_NAME);

    if (cookie) {
      setCookieValue(JSON.parse(cookie) as SaveBagel);
    }
  }, [setCookieValue]);

  return { loadBagels, saveBagels };
}
