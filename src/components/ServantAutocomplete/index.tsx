import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import Typography from "@mui/material/Typography";
import { useAutocompleteOptions } from "./useAutocompleteOptions";
import { ServantAutocompleteOption } from "./types";
import {
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { Box } from "@mui/material";
import { ClassIcon } from "../ClassIcon";

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

function boldHighlight(parts: { text: string; highlight: boolean }[] | string) {
  if (typeof parts === "string") {
    return parts;
  }

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

type ItemData = [
  HTMLAttributes<HTMLLIElement> & { key: string },
  ServantAutocompleteOption,
  string,
];

function renderRow(props: ListChildComponentProps<ItemData[]>) {
  const { data, index, style } = props;
  const [liProps, option, inputValue] = data[index];

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
    <Box component="li" {...liProps} style={style} key={liProps.key}>
      <div className="flex items-center">
        <div className="pr-2 pt-2">
          <ClassIcon classId={option.classId} />
        </div>
        <div>
          <Typography textOverflow="clip" whiteSpace="nowrap" variant="body2">
            {typeof name === "string" ? name : boldHighlight(name)}
          </Typography>
          {alias != null && (
            <Typography
              textOverflow="clip"
              whiteSpace="nowrap"
              variant="caption"
            >
              (aka {boldHighlight(alias)})
            </Typography>
          )}
        </div>
      </div>
    </Box>
  );
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>(
  function OuterElementType(props, ref) {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  },
);

function useResetCache(data: any) {
  const ref = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = children as ItemData[];

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;

  const getChildSize = useCallback((child: ItemData) => {
    return child[1].alias == null ? 48 : 60;
  }, []);

  const getHeight = useCallback(() => {
    if (itemCount < 8) {
      return Math.min(
        itemData.map(getChildSize).reduce((a, b) => a + b, 0),
        300,
      );
    }
    return 300;
  }, [getChildSize, itemCount, itemData]);

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight()}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export * from "./types";

export interface ServantAutocompleteProps {
  value: ServantAutocompleteOption | null;
  onValueChange: Dispatch<SetStateAction<ServantAutocompleteOption | null>>;
}

export function ServantAutocomplete({
  value,
  onValueChange,
}: ServantAutocompleteProps) {
  const autocompleteOptions = useAutocompleteOptions();
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
      PopperComponent={StyledPopper}
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
