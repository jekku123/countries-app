import { DarkMode, LightMode } from "@mui/icons-material"
import { IconButton, Tooltip, useTheme } from "@mui/material"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function ThemeToggler() {
  const theme = useTheme()
  const colorMode = useContext(ThemeContext)

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  )
}
