import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout"
import ProtectedRoute from "../auth/ProtectedRoute"
import CountriesList from "../pages/CountriesList"
import CountriesSingle from "../pages/CountriesSingle"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/countries", element: <CountriesList /> },
          { path: "/countries/:single", element: <CountriesSingle /> },
        ],
      },
    ],
  },
])
