import { Box, Container, Divider, Link, Typography } from "@mui/material"
import site from "../data/site.json"

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box my="25px" px="25px">
        <Typography variant="h3" component="h2" marginBottom={3}>
          {site.description}
        </Typography>
        <Divider />
        <Typography
          variant="subtitle1"
          component="h3"
          marginTop={3}
          marginBottom={1}
        >
          {site.source.title}
        </Typography>
        <Box>
          <Link href={site.source.link_1} rel="noreferrer" target="_blank">
            {site.source.link_1}
          </Link>
        </Box>
        <Box>
          <Link href={site.source.link_1} rel="noreferrer" target="_blank">
            {site.source.link_2}
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
