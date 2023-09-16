import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"
import { Link, NavLink } from "react-router-dom"

interface NavigationProps {
  handleDrawerToggle: () => void
  mobileOpen: boolean
}

const navItems = [
  { label: "Home", to: "/" },
  { label: "Countries", to: "/countries" },
  { label: "Favorites", to: "/favorites" },
]

export default function Navigation({
  handleDrawerToggle,
  mobileOpen,
}: NavigationProps) {
  return (
    <>
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
      <Drawer
        variant="temporary"
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Countries App
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
