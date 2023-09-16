import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { ICountry } from "../services/countriesApi"

interface SearchSelectProps {
  countries?: ICountry[] | undefined
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchSelect({
  countries = [],
  handleSearch,
}: SearchSelectProps) {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
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
            srcSet={`${option.flags.svg} 2x`}
            alt=""
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
            autoComplete: "new-password",
          }}
          onChange={handleSearch}
        />
      )}
    />
  )
}
