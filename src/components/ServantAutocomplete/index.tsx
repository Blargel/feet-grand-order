import { Autocomplete, AutocompleteRenderInputParams, Box, TextField, Typography } from '@mui/material'
import { AUTOCOMPLETE_OPTIONS } from './options'
import { ServantAutocompleteOption } from './types'
import { Dispatch, HTMLAttributes, SetStateAction, useCallback, useState } from 'react'

function getOptionLabel(option: ServantAutocompleteOption) {
  return option.alias ?? option.name
}

function renderInput(props: AutocompleteRenderInputParams) {
  return <TextField {...props} label="Choose a servant" />
}

function renderOption(
  props: HTMLAttributes<HTMLLIElement>,
  option: ServantAutocompleteOption,
) {
  return (
    <Box component="li" {...props}>
      <div>
        <Typography>{option.name}</Typography>
      {
        option.alias != null && 
          <Typography variant='caption'>(aka {option.alias})</Typography>
      }
      </div>
    </Box>
  )
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
      onValueChange({name: newValue.name, alias: null})
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

      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
    />
  )
}