export type ServantClass = 
  | 'saber'

export interface ServantData {
  name: string;
  aliases: string[];
  footId: number;
  class: ServantClass;
  inNA: boolean;
}