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

export interface ClickIndicator {
  id: number;
  x: number;
  y: number;
  bagels: number;
}
