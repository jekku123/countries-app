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
import { NavLink, useLocation } from "react-router-dom"
import site from "../../data/site.json"

interface NavigationProps {
  handleDrawerToggle: () => void
  mobileOpen: boolean
}

export default function Navigation({
  handleDrawerToggle,
  mobileOpen,
}: NavigationProps) {
  const { pathname } = useLocation()

  return (
    <>
      {site.navItems.map((item) => (
        <Button
          key={item.label}
          component={NavLink}
          to={item.to}
          sx={{
            textDecoration:
              pathname === item.to ? "underline !important" : "none",
            color: "#fff",
          }}
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
            {site.title}
          </Typography>
          <Divider />
          <List>
            {site.navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={NavLink}
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
