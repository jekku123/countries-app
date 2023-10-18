import { Box, Container, Divider, Link, Typography } from "@mui/material"

const links = ["https://restcountries.com/", "https://openweathermap.org/"]

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ padding: "50px" }}>
      <Typography variant="h3" component="h2" mb={3}>
        Countries app is a simple React application made in Business College
        Helsinki lessons.
      </Typography>
      <Divider />
      <Typography variant="subtitle1" component="h3" mt={3} mb={1}>
        App uses:
      </Typography>
      {links.map((url: string) => (
        <Box key={url}>
          <Link href={url} rel="noreferrer" target="_blank">
            {url}
          </Link>
        </Box>
      ))}
    </Container>
  )
}
