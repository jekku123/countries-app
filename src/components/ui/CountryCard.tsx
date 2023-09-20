import {
  CreditCard,
  Favorite,
  FavoriteBorder,
  LocationCity,
  People,
} from "@mui/icons-material"
import { Box, CardActionArea } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ICountry } from "../../services/countriesApi"

interface CountryCardProps {
  country: ICountry
}

export default function CountryCard({ country }: CountryCardProps) {
  const [favorite, setFavorite] = useState(false)
  const navigate = useNavigate()

  const handleCardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setTimeout(() => {
      navigate(`/countries/${country.name.common}`, { state: { country } })
    }, 500)
  }

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    setFavorite(!favorite)
  }

  return (
    <Card raised>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          sx={{
            height: "10rem",
            width: "100%",
            objectFit: "fill",
          }}
          image={country.flags.png}
          alt={country.name.common}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              {country.name.common}
            </Typography>
            <Box onClick={handleFavoriteClick}>
              {favorite ? (
                <Favorite fontSize="large" color="error" />
              ) : (
                <FavoriteBorder fontSize="large" />
              )}
            </Box>
          </Box>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <People />
            {country.population > 0
              ? country.population.toLocaleString()
              : "No population"}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <LocationCity />
            {country.capital?.[0] ?? "No capital"}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <CreditCard />
            {Object.keys(country.currencies).at(0)
              ? Object.keys(country.currencies)
                  .map((currencyCode) => country.currencies[currencyCode].name)
                  .join(", ")
              : "No currency"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
