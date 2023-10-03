import { Box, Container, Grid, styled } from "@mui/material"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLocation, useNavigate } from "react-router-dom"
import { CountryCard, SearchSelect, SkeletonGrid } from "../components"
import { auth } from "../firebase-config"
import useFavorites from "../hooks/useFavorites"
import { ICountry, useGetCountriesQuery } from "../services/countriesApi"

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
  const navigate = useNavigate()
  const {
    favorites,
    loading: favLoading,
    handleFavoritesByName,
  } = useFavorites(user)

  const location = useLocation()
  const isFavoritesPage = location.pathname === "/favorites"

  const countries = isFavoritesPage
    ? data?.filter((country: ICountry) =>
        favorites?.some(
          (favorite) => favorite.countryName === country.name.common,
        ),
      )
    : data

  const handleSearch = (
    _e: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    setSearch(value)
  }

  const handleCardClick =
    (country: ICountry) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      setTimeout(() => {
        navigate(`/countries/${country.name.common}`, {
          state: { country },
        })
      }, 500)
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
          {countries?.reduce(
            (prevCountries: JSX.Element[], country: ICountry) =>
              country.name?.common?.toLowerCase().includes(search.toLowerCase())
                ? [
                    ...prevCountries,
                    <Grid key={country.name.common} item xs={12} sm={6} md={4}>
                      <CountryCard
                        country={country}
                        favorites={favorites}
                        handleCardClick={handleCardClick}
                        handleFavoriteClick={handleFavoritesByName}
                      />
                    </Grid>,
                  ]
                : prevCountries,
            [],
          )}
        </Grid>
      )}
    </StyledContainer>
  )
}
