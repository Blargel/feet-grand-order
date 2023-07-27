export type ServantClass =
  | "saber"
  | "archer"
  | "lancer"
  | "rider"
  | "caster"
  | "assassin"
  | "berserker";

export interface ServantData {
  name: string;
  aliases: string[];
  footId: number;
  servantClass: ServantClass;
  inNa: boolean;
}
