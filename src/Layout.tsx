import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header, ScrollTop } from "./components"

export default function Layout() {
  return (
    <>
      <Box minHeight="100vh">
        <Header />
        <main>
          <Outlet />
        </main>
        <ScrollTop />
      </Box>
    </>
  )
}
