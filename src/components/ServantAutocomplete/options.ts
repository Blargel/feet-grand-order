import { SERVANTS } from "@/servants"
import { ServantAutocompleteOption } from "./types"

function buildServantAutocompleteOptions() {
  const mainOptions: ServantAutocompleteOption[] = []
  const aliasOptions: ServantAutocompleteOption[] = []
  for(const servant of SERVANTS) {
    mainOptions.push({
      name: servant.name,
      alias: null,
      className: servant.class,
    })
    for (const alias of servant.aliases) {
      aliasOptions.push({
        name: servant.name,
        alias: alias,
        className: servant.class,
      })
    }
  }

  return mainOptions.concat(aliasOptions)
}

export const AUTOCOMPLETE_OPTIONS = buildServantAutocompleteOptions()