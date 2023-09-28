import {
  CreditCard,
  Favorite,
  FavoriteBorder,
  LocationCity,
  People,
} from "@mui/icons-material"
import { Box, CardActionArea, Checkbox, styled } from "@mui/material"
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

const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.3rem",
}))

const imageStyle = {
  height: "10rem",
  width: "100%",
  objectFit: "fill",
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

  const handleFavoriteClick =
    (name: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      setFavorite(!favorite)
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
              <Checkbox
                icon={<FavoriteBorder fontSize="large" />}
                checkedIcon={<Favorite fontSize="large" color="error" />}
                checked={favorite}
              />
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
