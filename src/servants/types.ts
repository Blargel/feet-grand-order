export type ServantClass =
  | "saber"
  | "archer"
  | "lancer"
  | "rider"
  | "caster"
  | "assassin";

export interface ServantData {
  name: string;
  aliases: string[];
  footId: number;
  servantClass: ServantClass;
  inNa: boolean;
}
