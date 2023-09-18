import { Box, Container, Divider, Link, Typography } from "@mui/material"

export default function Home() {
  return (
    <Container sx={{ marginY: 5 }} maxWidth="md">
      <Typography variant="h3" component="h2" marginTop={5} marginBottom={3}>
        Countries app is a simple React application made in Business College
        Helsinki lessons.
      </Typography>

      <Divider />
      <Typography
        variant="subtitle1"
        component="h3"
        marginTop={4}
        marginBottom={1}
      >
        App uses:
      </Typography>

      <Box>
        <Link
          href="https://restcountries.com/"
          rel="noreferrer"
          target="_blank"
        >
          https://restcountries.com/
        </Link>
      </Box>

      <Box>
        <Link
          href="https://openweathermap.org/"
          rel="noreferrer"
          target="_blank"
        >
          https://openweathermap.org/
        </Link>
      </Box>
    </Container>
  )
}
