import {
  CreditCard,
  Favorite,
  FavoriteBorder,
  LocationCity,
  People,
} from "@mui/icons-material"
import { Box, CardActionArea, styled } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { User } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { updateUserFavorites } from "../../firestore/db"
import { ICountry } from "../../services/countriesApi"

interface CountryCardProps {
  country: ICountry
  user: User
  favorites: any
}

const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.3rem",
}))

const imageStyle = {
  height: "12rem",
  width: "100%",
  objectFit: "fill",
}

export default function CountryCard({
  country,
  user,
  favorites,
}: CountryCardProps) {
  const navigate = useNavigate()

  const handleCardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setTimeout(() => {
      navigate(`/countries/${country.name.common}`, { state: { country } })
    }, 500)
  }

  const handleFavoriteClick =
    (countryName: string) =>
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      if (!user) return
      await updateUserFavorites(user, countryName)
    }

  return (
    <Card raised>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          sx={imageStyle}
          image={country.flags.png}
          alt={country.name.common}
        />
        <CardContent>
          <StyledBox sx={{ justifyContent: "space-between" }}>
            <Typography variant="h5" component="h2">
              {country.name.common}
            </Typography>
            <Box onClick={handleFavoriteClick(country.name.common)}>
              {favorites.some(
                (el: any) => el.data.countryName === country.name.common,
              ) ? (
                <Favorite fontSize="large" color="error" />
              ) : (
                <FavoriteBorder fontSize="large" />
              )}
            </Box>
          </StyledBox>
          <StyledBox>
            <People />
            <Typography variant="body1" component="p">
              {country.population > 0
                ? country.population.toLocaleString()
                : "No population"}
            </Typography>
          </StyledBox>
          <StyledBox>
            <LocationCity />
            <Typography variant="body1" component="p">
              {country.capital?.[0] ?? "No capital"}
            </Typography>
          </StyledBox>

          <StyledBox>
            <CreditCard />
            <Typography variant="body1" component="p">
              {Object.keys(country.currencies).at(0)
                ? Object.keys(country.currencies)
                    .map(
                      (currencyCode) => country.currencies[currencyCode].name,
                    )
                    .join(", ")
                : "No currency"}
            </Typography>
          </StyledBox>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
