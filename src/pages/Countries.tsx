import { Box, Container, Grid } from "@mui/material"
import { useState } from "react"
import CountryCard from "../components/CountryCard"
import SearchSelect from "../components/SearchSelect"
import { ICountry, useGetCountriesQuery } from "../services/countriesApi"

export default function Countries() {
  const { data: countries, isLoading, error } = useGetCountriesQuery()
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredCountries = countries
    ? countries.reduce((prev: ICountry[], country: ICountry) => {
        if (country.name.common.toLowerCase().includes(search.toLowerCase())) {
          return [...prev, country]
        }
        return prev
      }, [])
    : []

  if (isLoading) return <div>Loading...</div>
  if (error) return <h2>Sorry, there was an error</h2>

  return (
    <Container sx={{ marginY: 5 }} maxWidth="lg">
      <Box marginBottom={5} sx={{ display: "flex", justifyContent: "center" }}>
        <SearchSelect countries={countries} handleSearch={handleSearch} />
      </Box>
      <Grid container spacing={5} px="20px">
        {filteredCountries?.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </Grid>
    </Container>
  )
}
