import {
  Autocomplete,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { AUTOCOMPLETE_OPTIONS } from "./options";
import { ServantAutocompleteOption } from "./types";
import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  cloneElement,
  forwardRef,
  useCallback,
  useState,
} from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from "react-virtualized";
import { ClassIcon } from "../ClassIcon";

function getOptionLabel(option: ServantAutocompleteOption) {
  return option.alias ?? option.name;
}

function renderInput(props: AutocompleteRenderInputParams) {
  return <TextField {...props} label="Choose a servant" />;
}

function boldHighlight(parts: { text: string; highlight: boolean }[]) {
  return parts.map((part, index) => (
    <span
      key={index}
      style={{
        fontWeight: part.highlight ? 700 : 400,
      }}
    >
      {part.text}
    </span>
  ));
}

function renderOption(
  props: HTMLAttributes<HTMLLIElement>,
  option: ServantAutocompleteOption,
  { inputValue }: AutocompleteRenderOptionState,
) {
  let name: string | { text: string; highlight: boolean }[];
  let alias: { text: string; highlight: boolean }[] | null;

  if (option.alias == null) {
    const matches = match(option.name, inputValue, { insideWords: true });
    name = parse(option.name, matches);
    alias = null;
  } else {
    const matches = match(option.alias, inputValue, { insideWords: true });
    name = option.name;
    alias = parse(option.alias, matches);
  }

  return (
    <Box component="li" {...props} key={option.alias ?? option.name}>
      <div className="flex items-center">
        <div className="pr-2 pt-2">
          <ClassIcon servantClass={option.servantClass} />
        </div>
        <div>
          <Typography>
            {typeof name === "string" ? name : boldHighlight(name)}
          </Typography>
          {alias != null && (
            <Typography variant="caption">
              (aka {boldHighlight(alias)})
            </Typography>
          )}
        </div>
      </div>
    </Box>
  );
}

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 45,
  fixedWidth: true,
});

const ListboxComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ListboxComponent(props, ref) {
  const { children, role, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;

  if (!Array.isArray(children)) {
    return null;
  }

  return (
    <div ref={ref}>
      <div {...other}>
        <div className="h-[240px]">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                width={width}
                deferredMeasurementCache={cellMeasurerCache}
                rowHeight={cellMeasurerCache.rowHeight}
                overscanCount={5}
                rowCount={itemCount}
                rowRenderer={({ index, key, style, parent }) => (
                  <CellMeasurer
                    key={key}
                    cache={cellMeasurerCache}
                    columnIndex={0}
                    parent={parent}
                    rowIndex={index}
                  >
                    {({ registerChild }) => (
                      <div ref={registerChild as any /* typing bug? */}>
                        {cloneElement(children[index], {
                          style: props.style,
                        })}
                      </div>
                    )}
                  </CellMeasurer>
                )}
                role={role}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
});

function isOptionEqualToValue(
  option: ServantAutocompleteOption,
  value: ServantAutocompleteOption,
) {
  return option.name === value.name && value.alias == null;
}

export * from "./types";

export interface ServantAutocompleteProps {
  value: ServantAutocompleteOption | null;
  onValueChange: Dispatch<SetStateAction<ServantAutocompleteOption | null>>;
}

export function ServantAutocomplete({
  value,
  onValueChange,
}: ServantAutocompleteProps) {
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
      options={AUTOCOMPLETE_OPTIONS}
      getOptionLabel={getOptionLabel}
      disableListWrap
      ListboxComponent={ListboxComponent}
      renderInput={renderInput}
      renderOption={renderOption}
      isOptionEqualToValue={isOptionEqualToValue}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
    />
  );
}
