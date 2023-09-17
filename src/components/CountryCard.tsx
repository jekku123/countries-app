import {
  CreditCard,
  FavoriteBorder,
  LocationCity,
  People,
} from "@mui/icons-material"
import { Box, CardActionArea } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import { ICountry } from "../services/countriesApi"

interface CountryCardProps {
  country: ICountry
}

export default function CountryCard({ country }: CountryCardProps) {
  const navigate = useNavigate()

  const population = new Intl.NumberFormat().format(country.population)

  const handleCardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setTimeout(() => {
      navigate(`/countries/${country.name.common}`, { state: { country } })
    }, 500)
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
            <FavoriteBorder fontSize="large" />
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
            <People /> {population}
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
            <LocationCity /> {country.capital?.[0]}
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
            {country.currencies && (
              <>
                {Object.keys(country.currencies).map((currencyCode) => {
                  const currency = country.currencies[currencyCode]
                  return (
                    <Box key={currencyCode} component="span">
                      {currency?.name}
                    </Box>
                  )
                })}
              </>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
