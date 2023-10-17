import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

import { useAuthState } from "react-firebase-hooks/auth"
import { ThemeToggler, UserMenu } from "."
import { auth } from "../firebase-config"
import MobileDrawer from "./ui/MobileDrawer"
import NavLinks from "./ui/NavLinks"

export default function Header() {
  const [user, loading] = useAuthState(auth)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  return (
    <header>
      <AppBar position="static">
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" alignItems="center">
              <IconButton
                size="large"
                color="inherit"
                edge="start"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { xs: "block", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <MobileDrawer
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
              />
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
                Countries App
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                <NavLinks />
              </Box>
            </Stack>

            <Stack direction="row" gap="10px">
              <ThemeToggler />
              {!loading ? <UserMenu user={user} /> : <CircularProgress />}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}
