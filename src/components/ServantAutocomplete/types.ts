import type { HTMLAttributes } from "react";

export interface ServantAutocompleteOption {
  id: number;
  name: string;
  alias: string | null;
  classId: number;
}

export type ItemData = [
  HTMLAttributes<HTMLLIElement> & { key: string },
  ServantAutocompleteOption,
  string,
];
