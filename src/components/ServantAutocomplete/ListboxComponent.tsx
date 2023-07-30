import {
  HTMLAttributes,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ItemData } from "./types";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { Box, Typography } from "@mui/material";
import { ClassIcon } from "../ClassIcon";

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

// Adapter for react-window
export const ListboxComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = children as ItemData[];
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
