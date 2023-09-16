import { Box, Container, Grid, Skeleton } from "@mui/material"
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

  if (error) return <h2>Sorry, there was an error</h2>

  return (
    <Container sx={{ marginY: 5 }} maxWidth="lg">
      <Box marginBottom={5} sx={{ display: "flex", justifyContent: "center" }}>
        <SearchSelect countries={countries} handleSearch={handleSearch} />
      </Box>
      <Grid container spacing={5} px="20px">
        {!isLoading ? (
          <>
            {filteredCountries?.map((country) => (
              <Grid key={country.name.common} item xs={12} sm={6} md={4}>
                <CountryCard country={country} />
              </Grid>
            ))}
          </>
        ) : (
          Array.from(new Array(6)).map((_, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Skeleton
                sx={{ borderRadius: "5px" }}
                variant="rectangular"
                width="100%"
                height={"20rem"}
                animation="wave"
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  )
}
