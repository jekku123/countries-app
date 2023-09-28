import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"
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
    <Box pt={5}>
      <Stack direction="row" gap={3} justifyContent="center">
        <img
          src={`https://source.unsplash.com/1200x800/?${country.capital}`}
          alt={country.capital}
          style={{
            height: "300px",
            objectFit: "contain",
            borderRadius: "5px",
          }}
        />

        <Stack justifyContent="space-between">
          <Typography variant="h2" component="h2">
            {country.name.common}
          </Typography>

          <Typography variant="h4" component="h3">
            {country.capital}
          </Typography>

          {error ? (
            <Typography variant="body1" component="p">
              Sorry, cant get weather data
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
          <Box>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              color="primary"
            >
              Go back
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
