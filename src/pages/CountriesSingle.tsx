import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { useGetWeatherQuery } from "../services/weatherApi"

export default function CountriesSingle() {
  const navigate = useNavigate()
  const location = useLocation()
  const country = location.state.country

  const {
    data: weather,
    isLoading,
    error,
  } = useGetWeatherQuery(country.capital)

  return (
    <Container maxWidth="md">
      <Grid container paddingTop="20px" justifyContent="center" spacing={3}>
        <Grid item xs={12} sm={6}>
          <img
            src={`https://source.unsplash.com/1200x800/?${country.capital}`}
            alt={country.capital}
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" component="h2">
            {country.name.common}
          </Typography>

          <Typography variant="h4" component="h3">
            {country.capital}
          </Typography>
          {error ? (
            <Typography variant="body1" component="p">
              Sorry, there was an error
            </Typography>
          ) : isLoading ? (
            <CircularProgress />
          ) : (
            <Stack direction="row" alignItems="center">
              <Typography variant="body1" component="p">
                Right now it is <strong>{weather.main.temp}°C</strong> in{" "}
                {country.capital} and {weather.weather[0].description}.
              </Typography>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
      <Button onClick={() => navigate("/")} variant="contained" color="primary">
        Go back
      </Button>
    </Container>
  )
}
