import { Box, Container, Grid, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { CountryCard, SearchSelect, SkeletonGrid } from "../components"
import { auth } from "../firebase"
import { getUserFavorites } from "../firestore/db"
import { ICountry, useGetCountriesQuery } from "../services/countriesApi"

type Favorite = {
  uid: string
  data: {
    userId: string
    countryName: string
    authProvider: string
  }
}

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

export default function CountriesList() {
  const { data: countries, isLoading, error } = useGetCountriesQuery()
  const [user] = useAuthState(auth)
  const [search, setSearch] = useState("")
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    if (!user) return
    const getFavorites = async () => {
      const data = await getUserFavorites(user)
      setFavorites(data)
    }
    getFavorites()
  }, [user, favorites])

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
      ) : isLoading ? (
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
