import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout"
import Countries from "../pages/Countries"
import CountriesSingle from "../pages/CountriesSingle"
import Favorites from "../pages/Favorites"
import Home from "../pages/Home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/countries", element: <Countries /> },
      { path: "/countries/:single", element: <CountriesSingle /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
])
