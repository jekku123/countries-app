import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { createContext, useEffect, useMemo, useState } from "react"

export const ThemeContext = createContext({ toggleColorMode: () => {} })

export default function ThemeContextProvider({
  children,
}: {
  readonly children: React.ReactNode
}) {
  const [mode, setMode] = useState<"light" | "dark">(
    localStorage.getItem("themeMode") === "dark" ? "dark" : "light",
  )

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    [],
  )

  useEffect(() => {
    localStorage.setItem("themeMode", mode)
  }, [mode])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiTypography: {
            variants: [
              {
                props: {
                  variant: "body2",
                },
                style: {
                  fontSize: 11,
                },
              },
            ],
          },
        },
      }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
