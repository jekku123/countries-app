/* eslint-disable jsx-a11y/iframe-has-title */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { ICountry } from "../redux/services/countriesApi"
import { useGetWeatherQuery } from "../redux/services/weatherApi"
import { formatNeighbourCountries } from "../utils/formatters"

const NOT_SO_SECRET_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY

const StyledHeaderPaper = styled(Paper)(() => ({
  margin: "20px 0px",
  padding: "20px 30px 30px 30px",
  height: "300px",
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "20px 30px 30px 30px",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
}))

const StyledBox = styled(Box)(() => ({
  display: "inline-block",
  padding: "0px 15px",
  borderRadius: "5px",
}))

const googleMapStyle = {
  borderRadius: "5px",
  border: "none",
  marginTop: "20px",
}

export default function CountriesSingle() {
  const navigate = useNavigate()
  const location = useLocation()

  const country: ICountry = location.state.country

  const {
    data: weather,
    isLoading,
    error,
  } = useGetWeatherQuery(country.capital)

  return (
    <Container maxWidth="lg">
      <StyledHeaderPaper
        elevation={3}
        sx={{
          backgroundImage: `url(https://source.unsplash.com/1200x800/?${country.capital})`,
        }}
      >
        <StyledBox sx={{ bgcolor: "background.paper" }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontSize: { xs: "2.5em", sm: "4em" } }}
          >
            {country.name.common}
          </Typography>
        </StyledBox>
        <img
          src={country.flags.png}
          alt={country.name.common}
          height={"70px"}
          style={{ float: "right" }}
        />
      </StyledHeaderPaper>

      <Stack direction={{ sm: "column", md: "row" }} gap="20px">
        <StyledPaper elevation={3}>
          <Typography variant="h4" component="h3" gutterBottom>
            Info:
          </Typography>
          <Typography variant="body1" component="p" paddingBottom={2}>
            Nestled in the heart of{" "}
            {country.subregion ? country.subregion : country.region},{" "}
            {country.name.common} proudly showcases {country.capital[0]} as its
            capital city. This captivating country, with a population of{" "}
            {country.population.toLocaleString()} citizens, is a haven of rich
            cultural diversity and a lively atmosphere.
          </Typography>

          <Typography variant="body1" component="p">
            Embraced by diverse neighbors, {country.name.common} shares its
            borders with {formatNeighbourCountries(country.borders)}. Together,
            these connections form a tapestry of cultural exchange, creating a
            mesmerizing blend of traditions and influences that define the
            unique charm of {country.name.common}.
          </Typography>
        </StyledPaper>
        <StyledPaper elevation={3}>
          <Typography variant="h4" component="h3" gutterBottom>
            More info:
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} gap={3}>
            <Box>
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
                style={googleMapStyle}
                width="100%"
                height={200}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${NOT_SO_SECRET_MAP_API_KEY}&q=${country.name.common}`}
              />
            </Box>
          </Stack>
        </StyledPaper>
      </Stack>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Go back
      </Button>
    </Container>
  )
}
