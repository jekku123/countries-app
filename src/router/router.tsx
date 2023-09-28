import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout"
import CountriesList from "../pages/CountriesList"
import CountriesSingle from "../pages/CountriesSingle"
import Home from "../pages/Home"

import { AuthRoute } from "../auth/AuthRoute"
import Login from "../auth/Login"
import { ProtectedRoute } from "../auth/ProtectedRoute"
import Register from "../auth/Register"
import Profile from "../pages/Profile"

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
          { path: "countries", element: <CountriesList /> },
          { path: "countries/:single", element: <CountriesSingle /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
])
