import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { ScrollTop } from "./components/ScrollTop"

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollTop />
    </>
  )
}
