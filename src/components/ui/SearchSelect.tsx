import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { ICountry } from "../../redux/services/countriesApi"

interface SearchSelectProps {
  readonly countries?: ICountry[]
  readonly handleSearch: (
    _e: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => void
}

export default function SearchSelect({
  countries = [],
  handleSearch,
}: SearchSelectProps) {
  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      clearOnBlur={false}
      onInputChange={handleSearch}
      getOptionLabel={(option) => option.name.common}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={option.flags.svg}
            alt={option.name.common}
          />
          {option.name.common}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
        />
      )}
    />
  )
}
