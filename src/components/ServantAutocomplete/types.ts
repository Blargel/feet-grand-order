import type { ServantClass } from "@/servants"

export interface ServantAutocompleteOption {
  name: string
  alias: string | null
  class: ServantClass
}