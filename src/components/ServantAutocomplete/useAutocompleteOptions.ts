import { useMemo } from "react";
import type { ServantAutocompleteOption } from "./types";
import { useGameContext } from "@/contexts";

export function useAutocompleteOptions(classFilter: number[]) {
  const { allServants, naOnly } = useGameContext();

  const autocompleteOptions = useMemo(() => {
    const mainOptions: ServantAutocompleteOption[] = [];
    const aliasOptions: ServantAutocompleteOption[] = [];

    for (const servant of allServants) {
      if (
        (naOnly && !servant.inNa) ||
        (classFilter.length > 0 && !classFilter.includes(servant.classId))
      ) {
        continue;
      }

      mainOptions.push({
        id: servant.id,
        name: servant.servantName,
        alias: null,
        classId: servant.classId,
      });
      for (const alias of servant.aliases) {
        aliasOptions.push({
          id: servant.id,
          name: servant.servantName,
          alias: alias,
          classId: servant.classId,
        });
      }
    }

    return mainOptions.concat(aliasOptions);
  }, [allServants, classFilter, naOnly]);

  return autocompleteOptions;
}
