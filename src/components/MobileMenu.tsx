import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"
import { Link } from "react-router-dom"

interface MobileMenuProps {
  handleDrawerToggle: () => void
  mobileOpen: boolean
  navItems: { label: string; to: string }[]
}

export default function MobileMenu({
  handleDrawerToggle,
  mobileOpen,
  navItems,
}: MobileMenuProps) {
  return (
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
  )
}
