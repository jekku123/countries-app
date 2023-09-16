import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import MobileMenu from "./MobileMenu"
import ThemeToggler from "./ThemeToggler"

const navItems = [
  { label: "Home", to: "/" },
  { label: "Countries", to: "/countries" },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  return (
    <header id="back-to-top-anchor">
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
                noWrap
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
                  display: { xs: "none", sm: "block", flexGrow: 1 },
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={NavLink}
                    to={item.to}
                    sx={{ color: "#fff" }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              <Box
                sx={{
                  display: { xs: "block", sm: "none", flexGrow: 1 },
                }}
              />
              <ThemeToggler />
            </Toolbar>
          </Container>
        </AppBar>
        <MobileMenu
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          navItems={navItems}
        />
      </Box>
    </header>
  )
}
