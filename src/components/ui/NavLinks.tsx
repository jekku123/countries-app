import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

const navLinks = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Countries",
    to: "/countries",
  },
]

export default function NavLinks() {
  const { pathname } = useLocation()

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {navLinks.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton
            component={Link}
            to={item.to}
            sx={{
              textAlign: "center",
              textDecoration:
                pathname === item.to ? "underline !important" : "none",
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
