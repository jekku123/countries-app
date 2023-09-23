import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { IconButton, Tooltip, useTheme } from "@mui/material"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"

export default function ThemeToggler() {
  const theme = useTheme()
  const colorMode = useContext(ThemeContext)

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  )
}
