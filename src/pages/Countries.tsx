import { Box, Container, Grid } from "@mui/material"
import { useState } from "react"
import CountryCard from "../components/CountryCard"
import SearchSelect from "../components/SearchSelect"
import { SkeletonGrid } from "../components/SkeletonGrid"
import { ICountry, useGetCountriesQuery } from "../services/countriesApi"

export default function Countries() {
  const { data: countries, isLoading, error } = useGetCountriesQuery()
  const [search, setSearch] = useState("")

  const handleSearch = (
    _e: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    setSearch(value)
  }

  if (error) return <div>There was an error</div>

  return (
    <Container sx={{ marginY: 5 }} maxWidth="lg">
      <Box marginBottom={5} sx={{ display: "flex", justifyContent: "center" }}>
        <SearchSelect countries={countries} handleSearch={handleSearch} />
      </Box>
      {!isLoading ? (
        <Grid container spacing={5} px="20px" justifyContent={"center"}>
          {countries?.reduce(
            (prev: any, country: ICountry) =>
              country.name.common.toLowerCase().includes(search.toLowerCase())
                ? [
                    ...prev,
                    <Grid key={country.name.common} item xs={12} sm={6} md={4}>
                      <CountryCard country={country} />
                    </Grid>,
                  ]
                : prev,
            [],
          )}
        </Grid>
      ) : (
        <SkeletonGrid />
      )}
    </Container>
  )
}
