import { Autocomplete, AutocompleteRenderInputParams, AutocompleteRenderOptionState, Box, TextField, Typography } from '@mui/material'
import { AUTOCOMPLETE_OPTIONS } from './options'
import { ServantAutocompleteOption } from './types'
import { Dispatch, HTMLAttributes, SetStateAction, useCallback, useState } from 'react'
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { ClassIcon } from '../ClassIcon';

function getOptionLabel(option: ServantAutocompleteOption) {
  return option.alias ?? option.name
}

function renderInput(props: AutocompleteRenderInputParams) {
  return <TextField {...props} label="Choose a servant" />
}

function boldHighlight(parts: { text: string, highlight: boolean }[]) {
  return parts.map((part, index) => (
    <span
      key={index}
      style={{
        fontWeight: part.highlight ? 700 : 400,
      }}
    >
      {part.text}
    </span>
  ))
}

function renderOption(
  props: HTMLAttributes<HTMLLIElement>,
  option: ServantAutocompleteOption,
  { inputValue }: AutocompleteRenderOptionState,
) {
  let name: string | { text: string, highlight: boolean }[];
  let alias: { text: string, highlight: boolean }[] | null;

  if (option.alias == null) {
    const matches = match(option.name, inputValue, { insideWords: true });
    name = parse(option.name, matches);
    alias = null
  } else {
    const matches = match(option.alias, inputValue, { insideWords: true });
    name = option.name
    alias = parse(option.alias, matches)
  }

  return (
    <Box component="li" {...props} key={option.alias ?? option.name}>
      <div className="flex items-center">
        <div className="pr-2 pt-2">
          <ClassIcon servantClass={option.servantClass}/>
        </div>
        <div>
          <Typography>
            {
              typeof name === 'string' ?
                name :
                boldHighlight(name)
            }
          </Typography>
        {
          alias != null && 
            <Typography variant='caption'>
              (aka{' '}
                {
                  boldHighlight(alias)
                }
              )
            </Typography>
        }
        </div>
      </div>
    </Box>
  )
}

function isOptionEqualToValue(
  option: ServantAutocompleteOption,
  value: ServantAutocompleteOption,
) {
  return option.name === value.name && value.alias == null
}

export * from './types'

export interface ServantAutocompleteProps {
  value: ServantAutocompleteOption | null;
  onValueChange: Dispatch<SetStateAction<ServantAutocompleteOption | null>>;
}

export function ServantAutocomplete({
  value,
  onValueChange,
}: ServantAutocompleteProps) {
  const [inputValue, setInputValue] = useState("")

  const handleChange = useCallback((
    _: unknown, 
    newValue: ServantAutocompleteOption | null
  ) => {
    if (newValue == null) {
      onValueChange(null)
    } else {
      onValueChange({...newValue, alias: null})
      setInputValue(newValue.name)
    }
  }, [onValueChange])

  const handleInputChange = useCallback((
    _: unknown,
    value: string,
  ) => {
    setInputValue(value)
  }, [setInputValue])

  return (
    <Autocomplete
      sx={{maxWidth: 500, width: "100%"}}
      options={AUTOCOMPLETE_OPTIONS}
      getOptionLabel={getOptionLabel}
      renderInput={renderInput}
      renderOption={renderOption}
      isOptionEqualToValue={isOptionEqualToValue}

      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
    />
  )
}