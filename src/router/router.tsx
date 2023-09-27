import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout"
import CountriesList from "../pages/CountriesList"
import CountriesSingle from "../pages/CountriesSingle"
import Home from "../pages/Home"

import { AuthRoute } from "../pages/Auth/AuthRoute"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import { ProtectedRoute } from "../pages/ProtectedRoute"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <AuthRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/countries",
            children: [
              { index: true, element: <CountriesList /> },
              { path: ":single", element: <CountriesSingle /> },
            ],
          },
        ],
      },
    ],
  },
])
