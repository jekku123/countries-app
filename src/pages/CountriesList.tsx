import { Box, Button, Container, Grid, styled } from "@mui/material"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLocation, useNavigate } from "react-router-dom"
import { CountryCard, SearchSelect, SkeletonGrid } from "../components"
import { auth } from "../firebase-config"
import useFavorites from "../hooks/useFavorites"
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
      <Box marginBottom={isFavoritesPage ? 2 : 3}>
        <SearchSelect countries={countries} handleSearch={handleSearch} />
      </Box>
      {isFavoritesPage && user && (
        <Button
          onClick={removeFavorites}
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Clear favorites
        </Button>
      )}

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
                    <Grid
                      key={country.name.common}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      xl={3}
                    >
                      <CountryCard
                        {...{
                          country,
                          favorites,
                          handleCardClick,
                          handleFavoriteClick,
                        }}
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
