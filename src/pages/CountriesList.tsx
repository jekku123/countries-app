import { Box, Button, Container, Stack, styled } from "@mui/material"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLocation, useNavigate } from "react-router-dom"
import { CountryCard, SearchSelect, SkeletonGrid } from "../components"
import { auth } from "../firebase-config"
import useFavorites from "../hooks/useFavorites"
import { FavoriteType } from "../redux/features/favoriteSlice"
import { ICountry, useGetCountriesQuery } from "../redux/services/countriesApi"

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

export default function CountriesList() {
  const [user] = useAuthState(auth)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetCountriesQuery()
  const {
    favorites,
    loading: favLoading,
    handleFavoriteClick,
    removeFavorites,
  } = useFavorites(user)

  const location = useLocation()
  const isFavoritesPage = location.pathname === "/favorites"

  const countries = isFavoritesPage
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
      <Box marginBottom={isFavoritesPage ? 2 : 5}>
        <SearchSelect countries={countries} handleSearch={handleSearch} />
      </Box>
      {isFavoritesPage && favorites.at(0) && (
        <Button onClick={removeFavorites} sx={{ mb: 2 }}>
          Clear favorites
        </Button>
      )}

      {error ? (
        <Box>Sorry, there was an error</Box>
      ) : isLoading || favLoading ? (
        <SkeletonGrid />
      ) : (
        <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={5}>
          {countries?.reduce(
            (prevCountries: JSX.Element[], country: ICountry) =>
              country.name?.common?.toLowerCase().includes(search.toLowerCase())
                ? [
                    ...prevCountries,
                    <CountryCard
                      key={country.name.common}
                      {...{
                        country,
                        favorites,
                        handleCardClick,
                        handleFavoriteClick,
                      }}
                    />,
                  ]
                : prevCountries,
            [],
          )}
        </Stack>
      )}
    </StyledContainer>
  )
}
