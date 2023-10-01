import { Box, Container, Grid, styled } from "@mui/material"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLocation } from "react-router-dom"
import { CountryCard, SearchSelect, SkeletonGrid } from "../components"
import { auth } from "../firebase"
import { ICountry, useGetCountriesQuery } from "../services/countriesApi"
import { FavoriteType, useGetFavoritesQuery } from "../services/firestoreApi"

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

export default function CountriesList() {
  const [user] = useAuthState(auth)
  const [search, setSearch] = useState("")
  const { data, isLoading, error } = useGetCountriesQuery()
  const { data: favorites, isLoading: favLoading } = useGetFavoritesQuery(
    user?.uid,
  )
  const { pathname } = useLocation()

  const isFavorites = pathname === "/favorites"

  const countries = isFavorites
    ? data?.filter((country: ICountry) =>
        favorites?.some(
          (favorite: FavoriteType) =>
            favorite.countryName === country.name.common,
        ),
      )
    : data

  const handleSearch = (
    _e: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    setSearch(value)
  }

  return (
    <StyledContainer maxWidth="lg" sx={{ pt: 5 }}>
      <Box marginBottom={5}>
        <SearchSelect countries={countries} handleSearch={handleSearch} />
      </Box>
      {error ? (
        <Box>Sorry, there was an error</Box>
      ) : isLoading || favLoading ? (
        <SkeletonGrid />
      ) : (
        <Grid container spacing={5} px="20px" justifyContent={"center"}>
          {user &&
            countries?.reduce(
              (prev: JSX.Element[], country: ICountry) =>
                country.name?.common
                  ?.toLowerCase()
                  .includes(search.toLowerCase())
                  ? [
                      ...prev,
                      <Grid
                        key={country.name.common}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                      >
                        <CountryCard
                          country={country}
                          user={user}
                          favorites={favorites}
                        />
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
