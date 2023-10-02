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
import { ICountry } from "../../services/countriesApi"

interface CountryCardProps {
  country: ICountry
  favorites: any
  handleFavoriteClick: any
  handleCardClick: any
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
  favorites,
  handleCardClick,
  handleFavoriteClick,
}: CountryCardProps) {
  return (
    <Card raised>
      <CardActionArea onClick={handleCardClick(country)}>
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
              {favorites?.includes(country.name.common) ? (
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
