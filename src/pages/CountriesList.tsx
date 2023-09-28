import { Box, Container, Grid, styled } from "@mui/material"
import { useState } from "react"
import { CountryCard, SearchSelect, SkeletonGrid } from "../components"
import { ICountry, useGetCountriesQuery } from "../services/countriesApi"

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

export default function CountriesList() {
  const { data: countries, isLoading, error } = useGetCountriesQuery()
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.SyntheticEvent<Element, Event>) => {
    setSearch((e.target as HTMLInputElement).value)
  }

  if (error) return <div>There was an error</div>

  return (
    <StyledContainer maxWidth="lg" sx={{ pt: 5 }}>
      <Box marginBottom={5}>
        <SearchSelect countries={countries} handleSearch={handleSearch} />
      </Box>
      {error ? (
        <Box>Sorry, there was an error</Box>
      ) : isLoading ? (
        <SkeletonGrid />
      ) : (
        <Grid container spacing={5} px="20px" justifyContent={"center"}>
          {countries?.reduce(
            (prev: JSX.Element[], country: ICountry) =>
              country.name?.common?.toLowerCase().includes(search.toLowerCase())
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
      )}
    </StyledContainer>
  )
}
