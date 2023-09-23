import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import site from "../data/site.json"
import useFirebaseAuth from "../hooks/useFirebaseAuth"
import { Navigation, ThemeToggler, UserMenu } from "./"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const { user, loading } = useFirebaseAuth()

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: 3,
                }}
              >
                {site.title}
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", sm: "block", flexGrow: 1 },
                }}
              >
                <Navigation
                  handleDrawerToggle={handleDrawerToggle}
                  mobileOpen={mobileOpen}
                />
              </Box>
              <Box
                sx={{
                  display: { xs: "block", sm: "none", flexGrow: 1 },
                }}
              />
              <Box sx={{ display: "flex", gap: "10px" }}>
                <ThemeToggler />
                {!loading ? (
                  <UserMenu user={user} />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </header>
  )
}
