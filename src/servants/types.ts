export type ServantClass = "saber" | "archer" | "lancer" | "rider" | "caster";

export interface ServantData {
  name: string;
  aliases: string[];
  footId: number;
  servantClass: ServantClass;
  inNa: boolean;
}
