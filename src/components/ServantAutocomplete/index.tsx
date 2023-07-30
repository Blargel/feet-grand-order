import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import { useAutocompleteOptions } from "./useAutocompleteOptions";
import { ServantAutocompleteOption } from "./types";
import {
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { ListboxComponent } from "./ListboxComponent";

function getOptionLabel(option: ServantAutocompleteOption) {
  return option.alias ?? option.name;
}

function isOptionEqualToValue(
  option: ServantAutocompleteOption,
  value: ServantAutocompleteOption,
) {
  return option.id === value.id && value.alias == null;
}

function renderInput(props: AutocompleteRenderInputParams) {
  return <TextField {...props} label="Choose a servant" />;
}

function renderOption(
  props: HTMLAttributes<HTMLLIElement>,
  option: ServantAutocompleteOption,
  state: AutocompleteRenderOptionState,
) {
  return [props, option, state.inputValue] as ReactNode;
}

export * from "./types";

export interface ServantAutocompleteProps {
  value: ServantAutocompleteOption | null;
  onValueChange: Dispatch<SetStateAction<ServantAutocompleteOption | null>>;
  classFilter: number[];
}

export function ServantAutocomplete({
  value,
  onValueChange,
  classFilter,
}: ServantAutocompleteProps) {
  const autocompleteOptions = useAutocompleteOptions(classFilter);
  const [inputValue, setInputValue] = useState("");

  const handleChange = useCallback(
    (_: unknown, newValue: ServantAutocompleteOption | null) => {
      if (newValue == null) {
        onValueChange(null);
      } else {
        onValueChange({ ...newValue, alias: null });
        setInputValue(newValue.name);
      }
    },
    [onValueChange],
  );

  const handleInputChange = useCallback(
    (_: unknown, value: string) => {
      setInputValue(value);
    },
    [setInputValue],
  );

  return (
    <Autocomplete
      sx={{ maxWidth: 500, width: "100%" }}
      disableListWrap
      ListboxComponent={ListboxComponent}
      options={autocompleteOptions}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={renderInput}
      renderOption={renderOption}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
    />
  );
}
