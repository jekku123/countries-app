import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout"
import CountriesList from "../pages/CountriesList"
import CountriesSingle from "../pages/CountriesSingle"
import Home from "../pages/Home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/countries", element: <CountriesList /> },
      { path: "/countries/:single", element: <CountriesSingle /> },
    ],
  },
])
