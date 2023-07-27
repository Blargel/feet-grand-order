export type ServantClass =
  | "saber"
  | "archer"
  | "lancer"
  | "rider"
  | "caster"
  | "assassin"
  | "berserker"
  | "shielder"
  | "ruler"
  | "alter-ego"
  | "avenger"
  | "moon-cancer"
  | "foreigner"
  | "pretender"
  | "beast";

export interface ServantData {
  name: string;
  aliases: string[];
  footId: number;
  servantClass: ServantClass;
  inNa: boolean;
}
