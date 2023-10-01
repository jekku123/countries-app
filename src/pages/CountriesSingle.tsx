/* eslint-disable jsx-a11y/iframe-has-title */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  PaperProps,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { useGetWeatherQuery } from "../services/weatherApi"

const NOT_SO_SECRET_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  background: theme.palette.background.default,
  padding: "20px 30px 30px 30px",
  margin: "30px 0",
}))

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
      <StyledPaper elevation={3}>
        <Typography variant="h2" component="h2" gutterBottom>
          {country.name.common}
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} gap={3}>
          <img
            src={`https://source.unsplash.com/1200x800/?${country.capital}`}
            alt={country.capital}
            style={{
              maxHeight: "300px",
              objectFit: "contain",
              borderRadius: "5px",
            }}
          />

          <Box>
            <Typography variant="h4" component="h3" gutterBottom>
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
            <iframe
              style={{ borderRadius: "5px", border: "none", marginTop: "20px" }}
              width="100%"
              height={176}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${NOT_SO_SECRET_MAP_API_KEY}&q=${country.name.common}`}
            />
          </Box>
        </Stack>

        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Go back
        </Button>
      </StyledPaper>
    </Container>
  )
}
