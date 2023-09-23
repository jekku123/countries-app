import { Box, Button, Divider, Drawer, Typography } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import site from "../../data/site.json"

interface NavigationProps {
  handleDrawerToggle: () => void
  mobileOpen: boolean
}

function NavItems({ pathname }: { pathname: string }) {
  return (
    <>
      {site.navItems.map((item) => (
        <Button
          key={item.label}
          component={Link}
          to={item.to}
          sx={{
            textDecoration:
              pathname === item.to ? "underline !important" : "none",
            color: "#fff",
            height: { xs: 60, sm: "auto" },
          }}
        >
          {item.label}
        </Button>
      ))}
    </>
  )
}

export default function Navigation({
  handleDrawerToggle,
  mobileOpen,
}: NavigationProps) {
  const { pathname } = useLocation()

  return (
    <>
      <NavItems pathname={pathname} />
      <Drawer
        variant="temporary"
        anchor="left"
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
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <NavItems pathname={pathname} />
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

/* <List>
{site.navItems.map((item) => (
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
</List> */
