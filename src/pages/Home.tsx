import { Box, Container, Link as MuiLink, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <Container sx={{ marginY: 5 }} maxWidth="md">
      <Typography variant="h4" component="h2" marginTop={5} marginBottom={3}>
        Countries app is a simple React application made in Business College
        Helsinki lessons.
      </Typography>
      <Typography variant="h5" component="h3" marginTop={4} marginBottom={1}>
        App uses:
      </Typography>
      <Box>
        <MuiLink
          component={Link}
          to="https://restcountries.com/"
          underline="hover"
          target="_blank"
        >
          https://restcountries.com/
        </MuiLink>
      </Box>
      <Box>
        <MuiLink
          component={Link}
          to="https://openweathermap.org/"
          underline="hover"
        >
          https://openweathermap.org/
        </MuiLink>
      </Box>
    </Container>
  )
}
